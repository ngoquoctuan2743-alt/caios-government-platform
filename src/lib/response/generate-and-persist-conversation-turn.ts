import "server-only";
import { prisma } from "@/lib/prisma";
import { writeAuditEvent } from "@/lib/audit/log";
import { ActorType, DocStatus } from "@/generated/prisma/client";
import { recognizeProcedure, type ProcedureRecognitionResult } from "@/lib/knowledge/procedure-recognizer";
import { resolveCitationsForProcedure, prepareCitationAuditPayload } from "@/lib/knowledge/legal-citation-resolver";
import { generateChecklist } from "@/lib/checklist/checklist-generator";
import { composeResponse, type ComposedResponse } from "./response-composer";
import {
  evaluateEligibility,
  prepareEligibilityAuditPayload,
  type EligibilityEvaluationResult,
} from "@/lib/eligibility/eligibility-engine";
import { PROCEDURE_CLARIFICATION_RULES } from "@/lib/clarification/clarification-data";
import {
  advanceConversationState,
  createInitialConversationState,
  prepareConversationStateAuditPayload,
  toCitizenFacts,
  type ConversationState,
} from "@/lib/conversation/conversation-state";

/**
 * Sprint 02D -- End-to-End Conversation Integration.
 *
 * Pure orchestration only. Every reasoning step below is an unmodified call
 * into an already-existing, already-verified engine (Sprints 01B-01F,
 * 02A-02C); nothing here recomputes, infers, or fabricates a fact, a
 * confidence value, or a legal claim. This file's only job is deciding, per
 * the Conversation Rules, which of the already-built engines to call next
 * and what to persist -- through the exact Prisma models and audit payload
 * builders Sprint 01F already established, with no new columns, tables, or
 * audit action shapes.
 *
 * Conversation Flow:
 *   Citizen Message -> Procedure Recognition -> Conversation State ->
 *   Clarification -> Eligibility -> Checklist -> Citation ->
 *   Response Composer -> Persistence -> Return Response
 */

const CONVERSATION_STATE_AUDIT_ACTION = "conversation_state.advanced";

/** Reloads the most recent Conversation State for this Case from its own audit trail (Sprint 02C never persisted a state column of its own; AuditEvent.payload -- already a generic Json field -- is the only existing place this can be reconstructed from without a schema change). */
async function loadConversationState(caseId: string): Promise<ConversationState> {
  const latest = await prisma.auditEvent.findFirst({
    where: { caseId, action: CONVERSATION_STATE_AUDIT_ACTION },
    orderBy: { createdAt: "desc" },
  });

  if (!latest) {
    return createInitialConversationState();
  }

  const payload = latest.payload as Record<string, unknown>;
  return {
    currentProcedureId: (payload.currentProcedureId as string | null) ?? null,
    knownFacts: (payload.knownFacts as ConversationState["knownFacts"]) ?? [],
    missingFacts: (payload.missingFacts as string[]) ?? [],
    pendingQuestion: (payload.pendingQuestion as ConversationState["pendingQuestion"]) ?? null,
    currentStage: (payload.currentStage as ConversationState["currentStage"]) ?? "READY",
    conversationStatus: (payload.conversationStatus as ConversationState["conversationStatus"]) ?? "READY",
    transitionLog: [],
  };
}

/**
 * Deterministically phrases a BLOCKED explanation from Eligibility's own
 * already-computed `reason` strings (Sprint 02A) -- assembly only, never a
 * new eligibility claim of its own.
 */
function composeBlockedExplanation(eligibility: EligibilityEvaluationResult): string {
  const blockingReasons = eligibility.triggeredRules
    .filter((rule) => rule.outcome === "FAILED" || rule.outcome === "ESCALATE")
    .map((rule) => `- ${rule.reason}`);

  return [
    "I'm not able to continue with this request as described.",
    "",
    ...blockingReasons,
    "",
    "A human officer will need to review this before we can proceed.",
  ].join("\n");
}

export interface ConversationTurnResult {
  response: ComposedResponse;
  conversationState: ConversationState;
  turnNumber: number;
  persisted: {
    conversationTurnId: string;
    procedureResolutionId: string | null;
    citationResolutionIds: string[];
    checklistItemIds: string[];
    auditEventIds: string[];
  };
}

export async function generateAndPersistConversationTurn(
  caseId: string,
  citizenMessage: string,
): Promise<ConversationTurnResult> {
  const startedAt = Date.now();

  const priorState = await loadConversationState(caseId);
  const turnNumber = (await prisma.conversationTurn.count({ where: { caseId } })) + 1;

  // Per the Conversation Rules: with a pending clarification, this message is
  // an answer, never a new request -- Procedure Recognition is only re-run
  // when the prior turn was READY (a genuinely new request).
  const recognition: ProcedureRecognitionResult | null =
    priorState.currentStage === "READY" ? recognizeProcedure(citizenMessage) : null;

  const newState = advanceConversationState(priorState, { citizenMessage, turnNumber });

  let response: ComposedResponse;
  let citations: ReturnType<typeof resolveCitationsForProcedure> | null = null;
  let checklist: ReturnType<typeof generateChecklist> | null = null;
  let eligibility: EligibilityEvaluationResult | null = null;
  let finalState: ConversationState = newState;

  if (newState.conversationStatus === "AWAITING_CLARIFICATION_REPLY") {
    // Clarification required (freshly asked this turn, or the prior reply
    // could not satisfy it) -- return ONLY the question. Do not generate a
    // checklist, resolve citations, or continue the pipeline.
    response = {
      message: newState.pendingQuestion!.question,
      status: "CLARIFYING_QUESTION",
      groundedProcedureId: newState.currentProcedureId,
      groundedCitationIds: [],
      groundedChecklistDocumentIds: [],
    };
  } else if (!newState.currentProcedureId) {
    // Procedure unknown -- the existing Sprint 01E clarifying fallback.
    response = composeResponse({
      recognition: recognition ?? recognizeProcedure(citizenMessage),
      citations: null,
      checklist: null,
    });
  } else {
    // Procedure known, no pending clarification -- run Eligibility (02A).
    const facts = toCitizenFacts(newState.knownFacts);
    eligibility = evaluateEligibility(newState.currentProcedureId, facts);

    if (eligibility.status === "BLOCKED") {
      response = {
        message: composeBlockedExplanation(eligibility),
        status: "ANSWERED",
        groundedProcedureId: newState.currentProcedureId,
        groundedCitationIds: [],
        groundedChecklistDocumentIds: [],
      };
    } else {
      // "Ask only the next missing fact" -- limited to a fact Sprint 02B
      // already knows how to ask about for this procedure, AND only when
      // that fact is genuinely still missing (never re-ask a fact already
      // in `facts` merely because its rule's own outcome is UNKNOWN for a
      // different reason -- e.g. EXCEPTION_RENEWAL_EARLY_WINDOW stays
      // UNKNOWN even with `cardExpiryDate` known, when the card is not yet
      // expired, because the Rule Pack itself discloses the early-renewal
      // window length as unverified). No new question is ever fabricated;
      // if none of the remaining Unknown rules has an authored clarification
      // question for a still-missing fact, this sprint cannot invent one
      // (see Known Issues) and the pipeline proceeds instead of stalling
      // indefinitely.
      const clarificationRules =
        eligibility.status === "UNKNOWN" ? (PROCEDURE_CLARIFICATION_RULES[newState.currentProcedureId] ?? []) : [];
      const nextAskableRule =
        eligibility.status === "UNKNOWN"
          ? eligibility.triggeredRules.find(
              (rule) =>
                rule.outcome === "UNKNOWN" &&
                clarificationRules.some((cr) => cr.ruleId === rule.ruleId && facts[cr.factName] === undefined),
            )
          : undefined;
      const clarificationRule = nextAskableRule
        ? clarificationRules.find((cr) => cr.ruleId === nextAskableRule.ruleId)
        : undefined;

      if (clarificationRule) {
        finalState = {
          ...newState,
          pendingQuestion: {
            question: clarificationRule.question,
            missingFact: clarificationRule.factName,
            ruleId: clarificationRule.ruleId,
            traceability: ["RULE_PACK_CCCD_PILOT.md", clarificationRule.ruleId],
          },
          missingFacts: [clarificationRule.factName],
          currentStage: "WAITING_FOR_REPLY",
          conversationStatus: "AWAITING_CLARIFICATION_REPLY",
          transitionLog: [...newState.transitionLog, "ASKING_CLARIFICATION", "WAITING_FOR_REPLY"],
        };
        response = {
          message: clarificationRule.question,
          status: "CLARIFYING_QUESTION",
          groundedProcedureId: newState.currentProcedureId,
          groundedCitationIds: [],
          groundedChecklistDocumentIds: [],
        };
      } else {
        // ELIGIBLE, or UNKNOWN with no askable next fact available -- continue:
        // Checklist -> Citation -> Response Composer, exactly as Sprint 01F wired.
        citations = resolveCitationsForProcedure(newState.currentProcedureId);
        checklist = generateChecklist(newState.currentProcedureId, { status: "ELIGIBLE" });
        response = composeResponse({
          recognition:
            recognition ??
            ({
              status: "RECOGNIZED",
              procedureId: newState.currentProcedureId,
              confidence: null,
              matchedSource: null,
              matchedGoalId: null,
              matchedLifeEventId: null,
              matchedAssetId: null,
              matchedPhrase: null,
            } satisfies ProcedureRecognitionResult),
          citations,
          checklist,
        });
      }
    }
  }

  const responseTimeMs = Date.now() - startedAt;

  const conversationTurn = await prisma.conversationTurn.create({
    data: {
      caseId,
      citizenMessage,
      assistantResponse: response.message,
      turnNumber,
      responseTimeMs,
    },
  });

  let procedureResolutionId: string | null = null;
  if (recognition && recognition.status === "RECOGNIZED" && recognition.procedureId && recognition.confidence && recognition.matchedSource) {
    const created = await prisma.procedureResolution.create({
      data: {
        caseId,
        conversationTurnId: conversationTurn.id,
        procedureId: recognition.procedureId,
        confidence: recognition.confidence,
        source: recognition.matchedSource,
        matchedPhrase: recognition.matchedPhrase ?? "",
      },
    });
    procedureResolutionId = created.id;
  }

  let citationResolutionIds: string[] = [];
  if (citations && citations.citations.length > 0) {
    const createdCitations = await prisma.$transaction(
      citations.citations.map((citation) =>
        prisma.citationResolution.create({
          data: {
            caseId,
            conversationTurnId: conversationTurn.id,
            procedureId: citations!.procedureId,
            citationId: citation.citationId,
            citationLevel: citation.citationLevel,
            verificationStatus: citation.verificationStatus,
            confidence: citation.confidence,
            traceability: citation.traceabilityReference ? [citation.traceabilityReference] : [],
          },
        }),
      ),
    );
    citationResolutionIds = createdCitations.map((row) => row.id);
  }

  let checklistItemIds: string[] = [];
  if (checklist && checklist.status === "GENERATED" && checklist.items.length > 0) {
    const createdItems = await prisma.$transaction(
      checklist.items.map((item) =>
        prisma.checklistItem.create({
          data: {
            caseId,
            procedureId: checklist!.procedureId,
            documentId: item.documentId,
            documentType: item.documentType,
            optional: item.optional,
            status: DocStatus.REQUIRED,
            source: "SPRINT_01D_DETERMINISTIC_GENERATOR",
          },
        }),
      ),
    );
    checklistItemIds = createdItems.map((row) => row.id);
  }

  const auditEventIds: string[] = [];

  // Always persist Conversation State (Sprint 02C) so the next turn can
  // reload it -- reused verbatim via prepareConversationStateAuditPayload().
  const stateAuditEvent = await writeAuditEvent({
    caseId,
    actorType: ActorType.SYSTEM,
    action: CONVERSATION_STATE_AUDIT_ACTION,
    payload: JSON.parse(JSON.stringify(prepareConversationStateAuditPayload(finalState))),
  });
  auditEventIds.push(stateAuditEvent.id);

  if (eligibility) {
    const eligibilityAuditEvent = await writeAuditEvent({
      caseId,
      actorType: ActorType.SYSTEM,
      action: "eligibility.evaluated",
      payload: JSON.parse(JSON.stringify(prepareEligibilityAuditPayload(eligibility))),
    });
    auditEventIds.push(eligibilityAuditEvent.id);
  }

  const citationAuditPayload = citations ? prepareCitationAuditPayload(citations) : null;

  const turnAuditEvent = await writeAuditEvent({
    caseId,
    actorType: ActorType.SYSTEM,
    action: "turn.persisted",
    payload: JSON.parse(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        conversationTurnId: conversationTurn.id,
        caseId,
        procedureId: finalState.currentProcedureId,
        recognitionResult: recognition,
        eligibilityResult: eligibility,
        citationResult: citationAuditPayload,
        checklistResult: checklist,
        responseGenerated: true,
      }),
    ),
  });
  auditEventIds.push(turnAuditEvent.id);

  return {
    response,
    conversationState: finalState,
    turnNumber,
    persisted: {
      conversationTurnId: conversationTurn.id,
      procedureResolutionId,
      citationResolutionIds,
      checklistItemIds,
      auditEventIds,
    },
  };
}
