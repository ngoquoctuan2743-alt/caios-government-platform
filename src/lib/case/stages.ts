import { CaseStage, WorkflowState } from "@/generated/prisma/enums";

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

/** Citizen-readable labels for the 13-state machine (WORKFLOW_CONSTITUTION.md Ch4). */
export const WORKFLOW_STATE_LABEL: Record<WorkflowState, string> = {
  [WorkflowState.DRAFT]: "Draft",
  [WorkflowState.PREPARING]: "Preparing",
  [WorkflowState.WAITING_CITIZEN]: "Waiting on you",
  [WorkflowState.WAITING_DOCUMENTS]: "Waiting on documents",
  [WorkflowState.READY_TO_SUBMIT]: "Ready to submit",
  [WorkflowState.SUBMITTED]: "Submitted",
  [WorkflowState.UNDER_REVIEW]: "Under review",
  [WorkflowState.NEED_MORE_INFORMATION]: "More information needed",
  [WorkflowState.ESCALATED]: "With a case officer",
  [WorkflowState.APPROVED]: "Approved",
  [WorkflowState.REJECTED]: "Rejected",
  [WorkflowState.COMPLETED]: "Completed",
  [WorkflowState.ARCHIVED]: "Archived",
};
