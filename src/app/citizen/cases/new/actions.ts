"use server";

import { prisma } from "@/lib/prisma";
import { generateAndPersistConversationTurn } from "@/lib/response/generate-and-persist-conversation-turn";

/**
 * Sprint 02D -- wires the full deterministic conversation pipeline
 * (Procedure Recognition -> Conversation State -> Clarification ->
 * Eligibility -> Checklist -> Citation -> Response Composer -> Persistence)
 * into this existing UI action.
 *
 * Sprint 03D -- presentation only: surfaces more of what this pipeline
 * already computes/returns (and one single, targeted extra read of the
 * ProcedureResolution row this same turn just persisted, for its own
 * confidence value) so the conversation UI can show a post-turn summary.
 * No pipeline file is changed; nothing here is a new computation.
 */

const THINKING_DELAY_MS = 2600;

export interface SendMessageResult {
  content: string;
  procedureId: string | null;
  aiConfidence: string | null;
  citationCount: number;
  checklistGenerated: boolean;
  conversationStatus: "READY" | "AWAITING_CLARIFICATION_REPLY";
}

/**
 * Typing "test error" (case-insensitive) deliberately throws, so the UI's
 * error state can be exercised without a real backend to fail. Thrown before
 * any persistence occurs, so no turn is recorded for this test path.
 */
export async function sendMessage(caseId: string, message: string): Promise<SendMessageResult> {
  await new Promise((resolve) => setTimeout(resolve, THINKING_DELAY_MS));

  if (message.trim().toLowerCase() === "test error") {
    throw new Error("Simulated failure (error-state test path).");
  }

  const result = await generateAndPersistConversationTurn(caseId, message);

  let aiConfidence: string | null = null;
  if (result.persisted.procedureResolutionId) {
    const resolution = await prisma.procedureResolution.findUnique({
      where: { id: result.persisted.procedureResolutionId },
    });
    aiConfidence = resolution?.confidence ?? null;
  }

  return {
    content: result.response.message,
    procedureId: result.response.groundedProcedureId,
    aiConfidence,
    citationCount: result.response.groundedCitationIds.length,
    checklistGenerated: result.response.groundedChecklistDocumentIds.length > 0,
    conversationStatus: result.conversationState.conversationStatus,
  };
}
