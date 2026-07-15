import "server-only";
import { prisma } from "@/lib/prisma";

/**
 * The Memory Subsystem's mediator for the Case Management context
 * (AI_OPERATING_SYSTEM.md Chapter 3, Memory Agent). This is the sole read
 * path onto case data for citizen-facing surfaces -- no other module queries
 * Case directly on a citizen's behalf, so cross-citizen isolation is
 * enforced in exactly one place rather than needing to be re-derived
 * correctly everywhere a case is read.
 */

export async function listCasesForCitizen(citizenUserId: string) {
  const citizen = await prisma.citizen.findUnique({
    where: { userId: citizenUserId },
    include: {
      cases: { include: { procedure: true }, orderBy: { updatedAt: "desc" } },
    },
  });

  return citizen?.cases ?? [];
}

/**
 * Returns the case only if it belongs to the requesting citizen -- a case
 * that exists but belongs to someone else is indistinguishable from a case
 * that doesn't exist at all, from this function's caller's point of view.
 */
export async function getCaseForCitizen(caseId: string, citizenUserId: string) {
  return prisma.case.findFirst({
    where: { id: caseId, citizen: { userId: citizenUserId } },
    include: {
      procedure: true,
      checklist: true,
      escalations: { orderBy: { createdAt: "desc" } },
    },
  });
}

/**
 * Officer-facing read: officers are not scoped to a single citizen's case,
 * but every read still flows through this one mediator rather than a
 * page-local query, so a future jurisdiction/assignment restriction has
 * exactly one place to be added.
 *
 * Sprint 03B extends this include to every already-persisted relation the
 * Officer Case Detail page needs (Conversation History, Procedure
 * Resolution, Legal Citations, and the full Audit trail) -- all existing
 * Sprint 01F relations on `Case`, no new tables, no schema change.
 */
export async function getCaseForOfficer(caseId: string) {
  return prisma.case.findUnique({
    where: { id: caseId },
    include: {
      procedure: true,
      citizen: { include: { user: true } },
      checklist: true,
      escalations: { orderBy: { createdAt: "desc" } },
      conversationTurns: { orderBy: { turnNumber: "asc" } },
      procedureResolutions: { orderBy: { createdAt: "asc" } },
      citationResolutions: { orderBy: { createdAt: "asc" } },
      auditEvents: { orderBy: { createdAt: "asc" } },
    },
  });
}

/**
 * Sprint 03A -- Officer Dashboard. Lists every Case for the officer
 * workspace (optionally scoped to a jurisdiction, mirroring the existing
 * escalation queue's own scoping rule) -- read only, no write path, no
 * schema change. The citizen's `user` relation is included so the dashboard
 * can display an identifying value (email) for a Citizen record that has no
 * name field of its own.
 */
export async function listCasesForOfficer(jurisdiction?: string) {
  return prisma.case.findMany({
    where: jurisdiction ? { citizen: { user: { jurisdiction } } } : undefined,
    include: {
      procedure: true,
      citizen: { include: { user: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}
