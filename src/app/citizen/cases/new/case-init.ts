"use server";

import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { writeAuditEvent } from "@/lib/audit/log";
import { ActorType } from "@/generated/prisma/client";
import {
  caseSummaryStageLabel,
  caseSummaryStatusLabel,
  deriveDisplayCaseNumber,
} from "@/lib/case/case-summary";

/**
 * Sprint 01A.1 has no Procedure Recognition yet (Sprint 01B) -- every case
 * created from the conversation defaults to the single pilot procedure.
 *
 * ADR-0012 (Procedure Identity Strategy): resolved by Canonical ID first,
 * with the original Database Code lookup kept as an additive fallback for
 * any environment where the `canonicalId` backfill (`prisma/seed.ts`) has
 * not yet run -- resolves to the exact same Procedure row either way, so
 * this is an internal alignment only, not a behavior change.
 */
const DEFAULT_PROCEDURE_CANONICAL_ID = "CCCD_RENEWAL";
const DEFAULT_PROCEDURE_CODE = "ID_CARD_RENEWAL";

export interface CaseSummary {
  id: string;
  displayNumber: string;
  status: string;
  stage: string;
  createdAt: string;
}

/**
 * Called once, on the citizen's first message. Creates the real Case (or
 * resumes an already-open one, per WORKFLOW_CONSTITUTION.md Ch5's
 * duplicate-case rule) and records the first message on the audit trail as
 * the conversation's reference point -- no new schema, no message table.
 */
export async function initializeCase(firstMessage: string): Promise<CaseSummary> {
  const session = await getSession();
  if (!session) {
    throw new Error("Not authenticated.");
  }

  const citizen = await prisma.citizen.findUnique({
    where: { userId: session.sub },
  });
  if (!citizen) {
    throw new Error("No citizen profile found for this account.");
  }

  const procedure =
    (await prisma.procedure.findUnique({
      where: { canonicalId: DEFAULT_PROCEDURE_CANONICAL_ID },
    })) ??
    (await prisma.procedure.findUnique({
      where: { code: DEFAULT_PROCEDURE_CODE },
    }));
  if (!procedure) {
    throw new Error("The pilot procedure is not configured.");
  }

  const existingCase = await prisma.case.findFirst({
    where: { citizenId: citizen.id, procedureId: procedure.id },
  });

  const caseRecord =
    existingCase ??
    (await prisma.case.create({
      data: {
        citizenId: citizen.id,
        procedureId: procedure.id,
      },
    }));

  if (!existingCase) {
    await writeAuditEvent({
      caseId: caseRecord.id,
      actorType: ActorType.CITIZEN,
      actorId: session.sub,
      action: "conversation.started",
      payload: { firstMessage },
    });
  }

  return {
    id: caseRecord.id,
    displayNumber: deriveDisplayCaseNumber(caseRecord.id, caseRecord.createdAt),
    status: caseSummaryStatusLabel(caseRecord.workflowState),
    stage: caseSummaryStageLabel(caseRecord.stage),
    createdAt: caseRecord.createdAt.toISOString(),
  };
}
