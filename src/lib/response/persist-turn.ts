import "server-only";
import { prisma } from "@/lib/prisma";
import { writeAuditEvent } from "@/lib/audit/log";
import { ActorType, DocStatus } from "@/generated/prisma/client";
import { recognizeProcedure } from "@/lib/knowledge/procedure-recognizer";
import { resolveCitationsForProcedure, prepareCitationAuditPayload } from "@/lib/knowledge/legal-citation-resolver";
import { generateChecklist } from "@/lib/checklist/checklist-generator";
import { composeResponse, type ComposedResponse } from "./response-composer";

/**
 * Sprint 01F -- Persistence Integration.
 *
 * Pure integration only: runs the exact same Sprint 01B -> 01C -> 01D -> 01E
 * pipeline Sprint 01E already wired (no business rule, no wording, no
 * confidence, and no response content changes of any kind), then persists
 * every intermediate result the pipeline already produced. Nothing here
 * recomputes, summarizes, merges, or infers anything the earlier sprints did
 * not already determine.
 *
 * "Persistence must not change any visible behavior": `response.message`
 * returned here is byte-for-byte what `generateTurnResponse()` (Sprint 01E)
 * would have returned for the same input -- this function only adds
 * persistence around that unchanged computation.
 */

export interface PersistedTurnResult {
  response: ComposedResponse;
  turnNumber: number;
  persisted: {
    conversationTurnId: string;
    procedureResolutionId: string | null;
    citationResolutionIds: string[];
    checklistItemIds: string[];
    auditEventId: string;
  };
}

export async function generateAndPersistTurn(caseId: string, citizenMessage: string): Promise<PersistedTurnResult> {
  const startedAt = Date.now();

  // Exactly Sprint 01E's pipeline -- unchanged.
  const recognition = recognizeProcedure(citizenMessage);
  const citations =
    recognition.status === "RECOGNIZED" && recognition.procedureId
      ? resolveCitationsForProcedure(recognition.procedureId)
      : null;
  const checklist =
    recognition.status === "RECOGNIZED" && recognition.procedureId
      ? generateChecklist(recognition.procedureId, { status: "ELIGIBLE" })
      : null;
  const response = composeResponse({ recognition, citations, checklist });

  const responseTimeMs = Date.now() - startedAt;

  const turnNumber = (await prisma.conversationTurn.count({ where: { caseId } })) + 1;

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
  if (recognition.status === "RECOGNIZED" && recognition.procedureId && recognition.confidence && recognition.matchedSource) {
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
            procedureId: citations.procedureId,
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
            procedureId: checklist.procedureId,
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

  // Reuses Sprint 01C's own prepareCitationAuditPayload() rather than
  // reimplementing citation-specific audit shaping.
  const citationAuditPayload = citations ? prepareCitationAuditPayload(citations) : null;

  // ADR-0012 alignment check (no structural change): every procedureId
  // embedded below -- top-level, inside recognitionResult, citationResult,
  // and checklistResult -- is already the Canonical ID (Sprint 01B's own
  // Knowledge Library procedureId). Nothing here references Procedure.code
  // or Procedure.id, so this payload already satisfies ADR-0012 as written.
  const auditEvent = await writeAuditEvent({
    caseId,
    actorType: ActorType.SYSTEM,
    action: "turn.persisted",
    payload: JSON.parse(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        conversationTurnId: conversationTurn.id,
        caseId,
        procedureId: recognition.procedureId,
        recognitionResult: recognition,
        citationResult: citationAuditPayload,
        checklistResult: checklist,
        responseGenerated: true,
      }),
    ),
  });

  return {
    response,
    turnNumber,
    persisted: {
      conversationTurnId: conversationTurn.id,
      procedureResolutionId,
      citationResolutionIds,
      checklistItemIds,
      auditEventId: auditEvent.id,
    },
  };
}
