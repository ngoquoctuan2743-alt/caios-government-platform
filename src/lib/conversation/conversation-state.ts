import {
  evaluateClarification,
  type ClarificationQuestion,
} from "@/lib/clarification/clarification-engine";
import type { CitizenFacts, ConfidenceLevel } from "@/lib/eligibility/eligibility-engine";
import { ELIGIBILITY_RULES } from "@/lib/eligibility/eligibility-data";

/**
 * Sprint 02C -- Conversation State Manager.
 *
 * Pure, deterministic state management only. No LLM, no OCR, no RAG, no
 * Checklist Generation, no Legal Citation, no Eligibility Logic, no
 * Procedure Recognition Logic of its own (it reuses Sprint 02B's
 * `evaluateClarification()`, which itself reuses Sprint 01B -- this module
 * never re-derives recognition), no Notification, no Escalation, no Memory
 * redesign, no Case Management.
 *
 * Governs exactly one behavior, per this sprint's own Conversation Rules:
 * with no pending clarification, the conversation is READY and the next
 * citizen message is a new request; with a pending clarification, the next
 * citizen message MUST be interpreted as an answer to that question, never
 * as a new request.
 */

export type ConversationStage =
  | "READY"
  | "ASKING_CLARIFICATION"
  | "WAITING_FOR_REPLY"
  | "FACT_CAPTURED"
  | "RECHECK_ELIGIBILITY";

export type ConversationStatus = "READY" | "AWAITING_CLARIFICATION_REPLY";

export interface CapturedFact {
  factName: keyof CitizenFacts;
  value: CitizenFacts[keyof CitizenFacts];
  sourceTurnNumber: number;
  capturedAt: string; // ISO timestamp
  confidence: ConfidenceLevel;
}

export interface ConversationState {
  currentProcedureId: string | null;
  knownFacts: CapturedFact[];
  missingFacts: string[];
  pendingQuestion: ClarificationQuestion | null;
  currentStage: ConversationStage;
  conversationStatus: ConversationStatus;
  /** Every stage this call passed through, in order -- for traceability/audit only, never re-read as input. */
  transitionLog: ConversationStage[];
}

export function createInitialConversationState(): ConversationState {
  return {
    currentProcedureId: null,
    knownFacts: [],
    missingFacts: [],
    pendingQuestion: null,
    currentStage: "READY",
    conversationStatus: "READY",
    transitionLog: ["READY"],
  };
}

/** Reconstructs a CitizenFacts object from every fact already captured -- read-only, never mutates knownFacts. Exported for reuse by Sprint 02D's orchestrator, which needs the identical conversion when handing facts to the Eligibility Engine. */
export function toCitizenFacts(knownFacts: CapturedFact[]): CitizenFacts {
  const facts: CitizenFacts = {};
  for (const captured of knownFacts) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (facts as any)[captured.factName] = captured.value;
  }
  return facts;
}

/** Deterministic, fixed-format date parsing only -- ISO (YYYY-MM-DD) or D/M/YYYY. No natural-language parsing. Returns null (extraction fails) for anything else, including a syntactically-matching but calendrically-invalid date. */
function extractDate(reply: string): string | null {
  const trimmed = reply.trim();

  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (isoMatch) {
    const iso = trimmed;
    const parsed = new Date(iso);
    return Number.isNaN(parsed.getTime()) ? null : iso;
  }

  const slashMatch = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(trimmed);
  if (slashMatch) {
    const [, dayStr, monthStr, yearStr] = slashMatch;
    const day = Number(dayStr);
    const month = Number(monthStr);
    const year = Number(yearStr);
    const iso = `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    const parsed = new Date(iso);
    if (Number.isNaN(parsed.getTime()) || parsed.getUTCDate() !== day || parsed.getUTCMonth() + 1 !== month) {
      return null;
    }
    return iso;
  }

  return null;
}

/**
 * Attempts to extract the value the pending question's `missingFact` needs
 * from the citizen's reply. Supports only the fact types Sprint 02A's
 * CitizenFacts already defines that this sprint's fact extractors cover
 * (dateOfBirth, cardExpiryDate) -- returns null (extraction fails, reply
 * cannot satisfy the pending question) for anything else, including the
 * procedure-disambiguation "procedureSelection" pseudo-fact, which requires
 * Procedure Recognition Logic this sprint does not implement.
 */
function extractFact(missingFact: string, reply: string): CitizenFacts[keyof CitizenFacts] | null {
  switch (missingFact) {
    case "dateOfBirth":
    case "cardExpiryDate":
      return extractDate(reply);
    default:
      return null;
  }
}

export interface AdvanceConversationInput {
  citizenMessage: string;
  turnNumber: number;
  asOf?: Date;
}

/**
 * Advances the conversation by exactly one citizen message. Never overwrites
 * or deletes an existing captured fact, never asks again for a fact already
 * known (delegated to Sprint 02B's own already-known filter), and keeps the
 * state at WAITING_FOR_REPLY whenever a reply cannot satisfy the pending
 * question, rather than guessing or advancing regardless.
 */
export function advanceConversationState(
  state: ConversationState,
  input: AdvanceConversationInput,
): ConversationState {
  const asOf = input.asOf ?? new Date();

  // No pending clarification: this message is a new request, per the
  // Conversation Rules. Re-evaluate via Sprint 02B, carrying forward every
  // fact already known so far so it is never re-asked.
  if (state.currentStage === "READY") {
    const clarification = evaluateClarification(input.citizenMessage, toCitizenFacts(state.knownFacts));

    if (clarification.status === "NEEDS_CLARIFICATION") {
      return {
        currentProcedureId: clarification.procedureId,
        knownFacts: state.knownFacts,
        missingFacts: clarification.missingFacts,
        pendingQuestion: clarification.clarificationQuestions[0] ?? null,
        currentStage: "WAITING_FOR_REPLY",
        conversationStatus: "AWAITING_CLARIFICATION_REPLY",
        transitionLog: ["READY", "ASKING_CLARIFICATION", "WAITING_FOR_REPLY"],
      };
    }

    // READY or UNKNOWN -- no pending clarification either way; conversation
    // remains READY per the Conversation Rules ("no pending clarification ->
    // READY"), with currentProcedureId updated only when one was recognized.
    return {
      currentProcedureId: clarification.procedureId,
      knownFacts: state.knownFacts,
      missingFacts: [],
      pendingQuestion: null,
      currentStage: "READY",
      conversationStatus: "READY",
      transitionLog: ["READY"],
    };
  }

  // A clarification is pending: this message MUST be interpreted as an
  // answer to it, never as a new request -- Procedure Recognition and
  // Clarification are not re-invoked here.
  const pendingQuestion = state.pendingQuestion;
  if (!pendingQuestion) {
    // Defensive: a non-READY stage without a pending question is an
    // inconsistent state this sprint did not create; treat conservatively
    // as still awaiting a reply rather than guessing.
    return { ...state, transitionLog: [state.currentStage] };
  }

  const extractedValue = extractFact(pendingQuestion.missingFact, input.citizenMessage);

  if (extractedValue === null) {
    // Unknown Reply: keep state WAITING_FOR_REPLY exactly as specified.
    return {
      ...state,
      currentStage: "WAITING_FOR_REPLY",
      conversationStatus: "AWAITING_CLARIFICATION_REPLY",
      transitionLog: ["WAITING_FOR_REPLY"],
    };
  }

  const alreadyCaptured = state.knownFacts.some(
    (fact) => fact.factName === pendingQuestion.missingFact,
  );

  const newFact: CapturedFact = {
    factName: pendingQuestion.missingFact as keyof CitizenFacts,
    value: extractedValue,
    sourceTurnNumber: input.turnNumber,
    capturedAt: asOf.toISOString(),
    confidence: ELIGIBILITY_RULES[pendingQuestion.ruleId]?.confidence ?? "Low",
  };

  // Never overwrite or delete an existing fact -- append only, and only if
  // this fact was not already captured by an earlier turn.
  const updatedKnownFacts = alreadyCaptured ? state.knownFacts : [...state.knownFacts, newFact];

  return {
    currentProcedureId: state.currentProcedureId,
    knownFacts: updatedKnownFacts,
    missingFacts: state.missingFacts.filter((fact) => fact !== pendingQuestion.missingFact),
    pendingQuestion: null,
    currentStage: "READY",
    conversationStatus: "READY",
    transitionLog: ["WAITING_FOR_REPLY", "FACT_CAPTURED", "RECHECK_ELIGIBILITY", "READY"],
  };
}

/**
 * Prepares a plain, serializable payload shaped for a future Conversation
 * State Audit Event, without writing one -- this sprint does not implement
 * Notification, Escalation, or Memory sync.
 */
export function prepareConversationStateAuditPayload(state: ConversationState): Record<string, unknown> {
  return {
    action: "conversation_state.advanced",
    currentProcedureId: state.currentProcedureId,
    knownFacts: state.knownFacts,
    missingFacts: state.missingFacts,
    pendingQuestion: state.pendingQuestion,
    currentStage: state.currentStage,
    conversationStatus: state.conversationStatus,
    transitionLog: state.transitionLog,
  };
}
