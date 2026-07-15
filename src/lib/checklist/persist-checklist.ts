import "server-only";
import { prisma } from "@/lib/prisma";
import { writeAuditEvent } from "@/lib/audit/log";
import { ActorType, DocStatus } from "@/generated/prisma/client";
import {
  generateChecklist,
  type ChecklistGenerationResult,
  type EligibilityResult,
} from "./checklist-generator";

/**
 * Sprint 01D -- Checklist Generation (persistence half).
 *
 * The "and persisted" half of this sprint's Definition of Done
 * (`SPRINT_BREAKDOWN.md`): creates `ChecklistItem` rows for an existing
 * `Case` from a deterministically generated checklist, and writes the
 * corresponding audit event -- through the existing Prisma schema and audit
 * service only, per `ENGINEERING_SPRINT_01_SPECIFICATION.md` §12 ("no new
 * data-access pattern introduced"). Writes nothing whenever generation did
 * not produce a checklist (procedure not found / ineligible / incomplete) --
 * never persists a checklist that was never generated.
 */

export interface PersistedChecklistResult extends ChecklistGenerationResult {
  persistedItemIds: string[];
}

export async function persistGeneratedChecklist(
  caseId: string,
  procedureId: string,
  eligibility: EligibilityResult,
): Promise<PersistedChecklistResult> {
  const generation = generateChecklist(procedureId, eligibility);

  if (generation.status !== "GENERATED" || generation.items.length === 0) {
    return { ...generation, persistedItemIds: [] };
  }

  const created = await prisma.$transaction(
    generation.items.map((item) =>
      prisma.checklistItem.create({
        data: {
          caseId,
          documentType: item.documentType,
          status: DocStatus.REQUIRED,
        },
      }),
    ),
  );

  await writeAuditEvent({
    caseId,
    actorType: ActorType.SYSTEM,
    action: "checklist.generated",
    payload: {
      procedureId,
      documentIds: generation.items.map((item) => item.documentId),
    },
  });

  return { ...generation, persistedItemIds: created.map((row) => row.id) };
}
