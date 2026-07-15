import { WorkflowState, ActorType, Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { writeAuditEvent } from "@/lib/audit/log";

/**
 * The 13-state machine from WORKFLOW_CONSTITUTION.md Chapter 4, encoded as
 * the Orchestration Subsystem's only source of truth for what transition is
 * legal. Nothing outside this module may write Case.workflowState directly.
 */
const ALLOWED_TRANSITIONS: Record<WorkflowState, WorkflowState[]> = {
  [WorkflowState.DRAFT]: [WorkflowState.PREPARING, WorkflowState.ARCHIVED],
  [WorkflowState.PREPARING]: [
    WorkflowState.WAITING_DOCUMENTS,
    WorkflowState.WAITING_CITIZEN,
    WorkflowState.ARCHIVED,
  ],
  [WorkflowState.WAITING_CITIZEN]: [
    WorkflowState.PREPARING,
    WorkflowState.WAITING_DOCUMENTS,
    WorkflowState.ARCHIVED,
  ],
  [WorkflowState.WAITING_DOCUMENTS]: [
    WorkflowState.READY_TO_SUBMIT,
    WorkflowState.PREPARING,
    WorkflowState.WAITING_CITIZEN,
  ],
  [WorkflowState.READY_TO_SUBMIT]: [
    WorkflowState.SUBMITTED,
    WorkflowState.PREPARING,
    WorkflowState.WAITING_DOCUMENTS,
  ],
  [WorkflowState.SUBMITTED]: [WorkflowState.UNDER_REVIEW],
  [WorkflowState.UNDER_REVIEW]: [
    WorkflowState.NEED_MORE_INFORMATION,
    WorkflowState.ESCALATED,
    WorkflowState.APPROVED,
    WorkflowState.REJECTED,
  ],
  [WorkflowState.NEED_MORE_INFORMATION]: [
    WorkflowState.UNDER_REVIEW,
    WorkflowState.ESCALATED,
  ],
  [WorkflowState.ESCALATED]: [
    WorkflowState.UNDER_REVIEW,
    WorkflowState.NEED_MORE_INFORMATION,
    WorkflowState.APPROVED,
    WorkflowState.REJECTED,
  ],
  [WorkflowState.APPROVED]: [WorkflowState.COMPLETED],
  [WorkflowState.REJECTED]: [WorkflowState.COMPLETED],
  [WorkflowState.COMPLETED]: [WorkflowState.ARCHIVED],
  [WorkflowState.ARCHIVED]: [],
};

export class WorkflowTransitionError extends Error {
  constructor(
    public readonly from: WorkflowState,
    public readonly to: WorkflowState
  ) {
    super(`Illegal workflow transition: ${from} -> ${to}`);
    this.name = "WorkflowTransitionError";
  }
}

export function canTransition(from: WorkflowState, to: WorkflowState): boolean {
  return ALLOWED_TRANSITIONS[from].includes(to);
}

export function allowedNextStates(from: WorkflowState): WorkflowState[] {
  return ALLOWED_TRANSITIONS[from];
}

export interface TransitionActor {
  actorType: ActorType;
  actorId?: string;
}

/**
 * The only sanctioned write path onto Case.workflowState. Enforces the
 * ALLOWED_TRANSITIONS table and records the transition on the audit trail --
 * no subsystem is permitted to update workflowState through any other path.
 */
export async function transitionCase(
  caseId: string,
  to: WorkflowState,
  actor: TransitionActor,
  payload?: Prisma.InputJsonValue
) {
  const current = await prisma.case.findUniqueOrThrow({
    where: { id: caseId },
    select: { workflowState: true },
  });

  if (!canTransition(current.workflowState, to)) {
    throw new WorkflowTransitionError(current.workflowState, to);
  }

  const updated = await prisma.case.update({
    where: { id: caseId },
    data: { workflowState: to },
  });

  await writeAuditEvent({
    caseId,
    actorType: actor.actorType,
    actorId: actor.actorId,
    action: "workflow.transition",
    payload: { from: current.workflowState, to, ...((payload as object) ?? {}) },
  });

  return updated;
}
