import "server-only";
import { prisma } from "@/lib/prisma";
import { ActorType, Prisma } from "@/generated/prisma/client";

export interface AuditEventInput {
  caseId?: string;
  actorType: ActorType;
  actorId?: string;
  action: string;
  payload: Prisma.InputJsonValue;
}

/**
 * The only write path onto AuditEvent. There is deliberately no
 * update/delete counterpart (PRD §6.2) -- callers that need to correct the
 * record append a new event referencing the old one in `payload`.
 */
export async function writeAuditEvent(input: AuditEventInput) {
  return prisma.auditEvent.create({
    data: {
      caseId: input.caseId,
      actorType: input.actorType,
      actorId: input.actorId,
      action: input.action,
      payload: input.payload,
    },
  });
}

export interface AuditQuery {
  caseId?: string;
  actorType?: ActorType;
  action?: string;
  from?: Date;
  to?: Date;
  take?: number;
  cursor?: string;
}

/**
 * Read path used by the compliance/officer console. Independent of Case
 * Management reads so audit review can't be skewed by case-table state.
 */
export async function queryAuditEvents(query: AuditQuery) {
  return prisma.auditEvent.findMany({
    where: {
      caseId: query.caseId,
      actorType: query.actorType,
      action: query.action ? { equals: query.action } : undefined,
      createdAt:
        query.from || query.to
          ? { gte: query.from, lte: query.to }
          : undefined,
    },
    orderBy: { createdAt: "desc" },
    take: query.take ?? 50,
    ...(query.cursor
      ? { cursor: { id: query.cursor }, skip: 1 }
      : {}),
  });
}
