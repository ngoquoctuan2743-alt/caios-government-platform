import { CaseStage, WorkflowState } from "@/generated/prisma/enums";
import { CASE_STAGE_LABEL } from "@/lib/case/stages";

/**
 * A temporary, human-readable case number derived deterministically from the
 * real Case.id -- not a persisted field. Sprint 01A.1 has no real case
 * numbering scheme yet (that belongs to a later Specification); this exists
 * only so citizens have something friendlier than a cuid to reference.
 */
export function deriveDisplayCaseNumber(id: string, createdAt: Date): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  const sequence = (hash % 1_000_000).toString().padStart(6, "0");
  return `CA-${createdAt.getFullYear()}-${sequence}`;
}

/**
 * Citizen-facing status text for the Case Summary card. DRAFT reads as
 * "Conversation Started" here specifically because that's the truthful,
 * narratable state of a case that exists only because a citizen just typed
 * their first message -- WORKFLOW_STATE_LABEL's generic "Draft" is correct
 * everywhere else but undersells this specific moment.
 */
export function caseSummaryStatusLabel(state: WorkflowState): string {
  if (state === WorkflowState.DRAFT) return "Conversation Started";
  return state
    .toLowerCase()
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Stage text for the Case Summary card. INTAKE reads as "Initial Intake"
 * here for the same reason DRAFT reads as "Conversation Started" above --
 * everywhere else in the app, CASE_STAGE_LABEL's plain "Intake" is correct.
 */
export function caseSummaryStageLabel(stage: CaseStage): string {
  if (stage === CaseStage.INTAKE) return "Initial Intake";
  return CASE_STAGE_LABEL[stage];
}

export function formatRelativeTime(iso: string, now: number = Date.now()): string {
  const seconds = Math.max(0, Math.floor((now - new Date(iso).getTime()) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}
