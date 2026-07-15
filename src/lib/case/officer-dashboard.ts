import { WorkflowState } from "@/generated/prisma/enums";

/**
 * Sprint 03A -- Officer Dashboard.
 *
 * Deterministic classification of the existing `WorkflowState` enum into the
 * 5 dashboard buckets this sprint's stats/filters require. This is a display
 * grouping computed from a real, already-persisted field -- not a new fact,
 * not a fabricated statistic, and not a schema change.
 */

export type CaseBucket = "PENDING" | "IN_REVIEW" | "ESCALATED" | "COMPLETED" | "CLOSED";

export const CASE_BUCKET_LABEL: Record<CaseBucket, string> = {
  PENDING: "Pending",
  IN_REVIEW: "In Review",
  ESCALATED: "Escalated",
  COMPLETED: "Completed",
  CLOSED: "Closed",
};

export function bucketForWorkflowState(state: WorkflowState): CaseBucket {
  switch (state) {
    case WorkflowState.UNDER_REVIEW:
      return "IN_REVIEW";
    case WorkflowState.ESCALATED:
      return "ESCALATED";
    case WorkflowState.COMPLETED:
      return "COMPLETED";
    case WorkflowState.APPROVED:
    case WorkflowState.REJECTED:
    case WorkflowState.ARCHIVED:
      return "CLOSED";
    default:
      // DRAFT, PREPARING, WAITING_CITIZEN, WAITING_DOCUMENTS,
      // READY_TO_SUBMIT, SUBMITTED, NEED_MORE_INFORMATION -- still requires
      // either citizen or officer action before reaching one of the other
      // four buckets.
      return "PENDING";
  }
}

/**
 * Sprint 03D -- Demo Polish. A finer-grained, color-coded row status that
 * subdivides the existing PENDING bucket using the case's own latest
 * persisted conversation state (Sprint 02C/02D's "conversation_state.advanced"
 * AuditEvent) -- no new WorkflowState value, no schema change; this is a
 * display refinement only, layered on top of `bucketForWorkflowState`.
 * IN_REVIEW is intentionally left as its own distinct workflow-driven state,
 * not folded into this list.
 */
export type DemoStatus = "PENDING" | "CLARIFICATION" | "READY" | "IN_REVIEW" | "ESCALATED" | "COMPLETED" | "CLOSED";

export const DEMO_STATUS_LABEL: Record<DemoStatus, string> = {
  PENDING: "Pending",
  CLARIFICATION: "Clarification",
  READY: "Ready",
  IN_REVIEW: "In Review",
  ESCALATED: "Escalated",
  COMPLETED: "Completed",
  CLOSED: "Closed",
};

export function deriveDemoStatus(
  workflowState: WorkflowState,
  latestConversationStatus: "READY" | "AWAITING_CLARIFICATION_REPLY" | null,
  procedureRecognized: boolean,
): DemoStatus {
  const bucket = bucketForWorkflowState(workflowState);
  if (bucket !== "PENDING") return bucket;

  if (latestConversationStatus === "AWAITING_CLARIFICATION_REPLY") return "CLARIFICATION";
  if (latestConversationStatus === "READY" && procedureRecognized) return "READY";
  return "PENDING";
}
