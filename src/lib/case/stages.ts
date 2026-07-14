import { CaseStage } from "@/generated/prisma/enums";

/** Canonical order of the 7-stage lifecycle (PRD §1). */
export const CASE_STAGE_ORDER: CaseStage[] = [
  CaseStage.INTAKE,
  CaseStage.ELIGIBILITY,
  CaseStage.CHECKLIST,
  CaseStage.VERIFICATION,
  CaseStage.GAP_DETECTION,
  CaseStage.SUBMISSION,
  CaseStage.TRACKING,
];

export const CASE_STAGE_LABEL: Record<CaseStage, string> = {
  [CaseStage.INTAKE]: "Intake",
  [CaseStage.ELIGIBILITY]: "Eligibility",
  [CaseStage.CHECKLIST]: "Checklist",
  [CaseStage.VERIFICATION]: "Verification",
  [CaseStage.GAP_DETECTION]: "Gap Detection",
  [CaseStage.SUBMISSION]: "Submission",
  [CaseStage.TRACKING]: "Tracking",
};

export function stageIndex(stage: CaseStage): number {
  return CASE_STAGE_ORDER.indexOf(stage);
}
