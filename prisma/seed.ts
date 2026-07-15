import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  PrismaClient,
  Role,
  CaseStage,
  DocStatus,
  WorkflowState,
  ActorType,
} from "../src/generated/prisma/client";
import {
  transitionCase,
  WorkflowTransitionError,
} from "../src/lib/orchestration/workflow-state-machine";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const [citizenUser, officerUser, adminUser] = await Promise.all([
    prisma.user.upsert({
      where: { email: "citizen@example.com" },
      update: { jurisdiction: "HANOI" },
      create: { email: "citizen@example.com", passwordHash, role: Role.CITIZEN, jurisdiction: "HANOI" },
    }),
    prisma.user.upsert({
      where: { email: "officer@example.com" },
      update: {},
      create: {
        email: "officer@example.com",
        passwordHash,
        role: Role.OFFICER,
        jurisdiction: "HANOI",
      },
    }),
    prisma.user.upsert({
      where: { email: "admin@example.com" },
      update: {},
      create: { email: "admin@example.com", passwordHash, role: Role.ADMIN },
    }),
  ]);

  const legalSource = await prisma.legalSource.upsert({
    where: { vectorDocId: "vdb://id-card-renewal/decree-59-2021" },
    update: {},
    create: {
      lawName: "Decree 59/2021/ND-CP on citizen identification",
      article: "Article 12",
      effectiveDate: new Date("2021-07-01"),
      lastUpdated: new Date("2024-01-01"),
      vectorDocId: "vdb://id-card-renewal/decree-59-2021",
    },
  });

  // ADR-0012 (Procedure Identity Strategy) §7 reconciliation: this seeded
  // Phase-0 procedure and the Knowledge Library's `CCCD_RENEWAL` have been
  // treated as the same real-world procedure throughout Sprints 01B/01D/01F
  // (case-init.ts's own pilot-procedure framing); canonicalId records that
  // decision explicitly rather than leaving it implicit.
  //
  // ADR-0012 Phase 2: resolved by Canonical ID first -- the legacy `code`
  // upsert only runs as a fallback, for a database that has never been
  // seeded under this strategy before. Once canonicalId is set, every later
  // run finds the row via canonicalId directly and never touches `code`
  // again, mirroring case-init.ts's own canonical-first, code-fallback order.
  const procedure =
    (await prisma.procedure.findUnique({ where: { canonicalId: "CCCD_RENEWAL" } })) ??
    (await prisma.procedure.upsert({
      where: { code: "ID_CARD_RENEWAL" },
      update: { canonicalId: "CCCD_RENEWAL" },
      create: {
        code: "ID_CARD_RENEWAL",
        name: "ID Card Renewal",
        ruleSetVersion: "2026.01",
        canonicalId: "CCCD_RENEWAL",
        legalSources: { connect: [{ id: legalSource.id }] },
      },
    }));

  const citizen = await prisma.citizen.upsert({
    where: { userId: citizenUser.id },
    update: {},
    create: {
      userId: citizenUser.id,
      nationalIdHash: "hash:demo-citizen-001",
    },
  });

  const existingCase = await prisma.case.findFirst({
    where: { citizenId: citizen.id, procedureId: procedure.id },
  });

  const citizenCase =
    existingCase ??
    (await prisma.case.create({
      data: {
        citizenId: citizen.id,
        procedureId: procedure.id,
        stage: CaseStage.CHECKLIST,
        workflowState: WorkflowState.WAITING_DOCUMENTS,
        eligibility: { ageOver14: true, residencyVerified: true },
        checklist: {
          create: [
            { documentType: "Current ID card", status: DocStatus.VERIFIED },
            { documentType: "Household registration", status: DocStatus.UPLOADED },
            { documentType: "Recent photo (4x6)", status: DocStatus.REQUIRED },
          ],
        },
      },
    }));

  // Demonstrate the Orchestration Subsystem's state machine (Epic A, Milestone
  // M1) only on first seed -- re-running the seed against an existing case
  // shouldn't replay transitions that already happened.
  if (!existingCase) {
    try {
      await transitionCase(citizenCase.id, WorkflowState.APPROVED, {
        actorType: ActorType.SYSTEM,
      });
      console.error("Expected an illegal transition to be rejected, but it succeeded.");
    } catch (err) {
      if (err instanceof WorkflowTransitionError) {
        console.log(`Correctly rejected illegal transition: ${err.message}`);
      } else {
        throw err;
      }
    }

    await transitionCase(citizenCase.id, WorkflowState.WAITING_CITIZEN, {
      actorType: ActorType.SYSTEM,
    });
    console.log("Correctly applied legal transition: WAITING_DOCUMENTS -> WAITING_CITIZEN");
  }

  await prisma.escalation.upsert({
    where: { id: "seed-escalation-1" },
    update: {},
    create: {
      id: "seed-escalation-1",
      caseId: citizenCase.id,
      reason: "RAG returned conflicting legal sources for photo requirements",
      confidence: 0.42,
      contextPackage: {
        // ADR-0012 Phase 2: Canonical ID first, legacy code only as a
        // fallback for a Procedure row that predates the canonicalId
        // backfill -- never the reverse.
        known: { procedure: procedure.canonicalId ?? procedure.code, stage: "CHECKLIST" },
        uncertain: ["photo background color requirement changed in 2024"],
        sources: [legalSource.vectorDocId],
      },
      status: "OPEN",
    },
  });

  console.log("Seeded:", {
    users: [citizenUser.email, officerUser.email, adminUser.email],
    // ADR-0012 Phase 2: report the Canonical ID, falling back to the legacy
    // Database Code only if canonicalId was somehow never backfilled.
    procedure: procedure.canonicalId ?? procedure.code,
    case: citizenCase.id,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
