import { DOCUMENTS, PROCEDURE_CHECKLISTS } from "./checklist-data";

/**
 * Sprint 01D -- Checklist Generation.
 *
 * Deterministic generation only. No LLM, no fuzzy inference, no per-citizen
 * circumstance reasoning (that is Document Gap Analysis / Rule Engine
 * territory, out of this sprint's scope per `SPRINT_BREAKDOWN.md`). Input is
 * a Procedure ID (Sprint 01B's output) and an already-computed eligibility
 * result -- this module never itself evaluates eligibility, and has no
 * database dependency (see `persist-checklist.ts` for the persistence half).
 *
 * Per `ENGINEERING_SPRINT_01_SPECIFICATION.md` §12: "Checklist Generator --
 * deterministic, derived from the procedure's requirement set and the
 * eligibility result." A generated checklist is exactly the procedure's own
 * `requiredDocuments` plus `optionalDocuments` (`knowledge/procedures/`
 * frontmatter) -- for the pilot procedure (`CCCD_RENEWAL`: 2 required + 1
 * optional) this produces the three-item checklist `SPRINT_BREAKDOWN.md`'s
 * Sprint 01D Definition of Done describes.
 *
 * Per that same Definition of Done: "given an ineligible or incomplete
 * eligibility result, the generator does not silently produce a checklist it
 * shouldn't" -- a checklist is only ever generated when eligibility is
 * confirmed `ELIGIBLE`.
 */

export type EligibilityStatus = "ELIGIBLE" | "INELIGIBLE" | "INCOMPLETE";

export interface EligibilityResult {
  status: EligibilityStatus;
  /** Why eligibility is not (yet) confirmed -- required whenever status isn't ELIGIBLE, so a citizen is never left with a silent "no checklist" and no explanation. */
  reason?: string;
}

export interface ChecklistDraftItem {
  documentId: string;
  /** Verbatim `name` field from `knowledge/documents/*.md`. */
  documentType: string;
  /** Whether this document came from the procedure's optionalDocuments list rather than requiredDocuments -- informational only; `DocStatus` has no "optional" tier, so every persisted row starts at the same REQUIRED status regardless (see Known Issues in the sprint report). */
  optional: boolean;
}

export type ChecklistGenerationStatus =
  | "GENERATED"
  | "BLOCKED_INELIGIBLE"
  | "BLOCKED_INCOMPLETE"
  | "PROCEDURE_NOT_FOUND";

export interface ChecklistGenerationResult {
  procedureId: string;
  status: ChecklistGenerationStatus;
  items: ChecklistDraftItem[];
}

/**
 * Pure, deterministic checklist derivation -- no database access. Given an
 * eligibility result that is not `ELIGIBLE`, returns an empty item list
 * rather than fabricating a checklist the citizen may not actually qualify
 * for.
 */
export function generateChecklist(procedureId: string, eligibility: EligibilityResult): ChecklistGenerationResult {
  const procedureEntry = PROCEDURE_CHECKLISTS[procedureId];

  if (!procedureEntry) {
    return { procedureId, status: "PROCEDURE_NOT_FOUND", items: [] };
  }

  if (eligibility.status === "INELIGIBLE") {
    return { procedureId, status: "BLOCKED_INELIGIBLE", items: [] };
  }

  if (eligibility.status === "INCOMPLETE") {
    return { procedureId, status: "BLOCKED_INCOMPLETE", items: [] };
  }

  const requiredItems: ChecklistDraftItem[] = procedureEntry.requiredDocumentIds.map((documentId) => ({
    documentId,
    documentType: DOCUMENTS[documentId]?.name ?? documentId,
    optional: false,
  }));

  const optionalItems: ChecklistDraftItem[] = procedureEntry.optionalDocumentIds.map((documentId) => ({
    documentId,
    documentType: DOCUMENTS[documentId]?.name ?? documentId,
    optional: true,
  }));

  return {
    procedureId,
    status: "GENERATED",
    items: [...requiredItems, ...optionalItems],
  };
}
