import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role, CaseStage, DocStatus } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const [citizenUser, officerUser, adminUser] = await Promise.all([
    prisma.user.upsert({
      where: { email: "citizen@example.com" },
      update: {},
      create: { email: "citizen@example.com", passwordHash, role: Role.CITIZEN },
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

  const procedure = await prisma.procedure.upsert({
    where: { code: "ID_CARD_RENEWAL" },
    update: {},
    create: {
      code: "ID_CARD_RENEWAL",
      name: "ID Card Renewal",
      ruleSetVersion: "2026.01",
      legalSources: { connect: [{ id: legalSource.id }] },
    },
  });

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

  await prisma.escalation.upsert({
    where: { id: "seed-escalation-1" },
    update: {},
    create: {
      id: "seed-escalation-1",
      caseId: citizenCase.id,
      reason: "RAG returned conflicting legal sources for photo requirements",
      confidence: 0.42,
      contextPackage: {
        known: { procedure: "ID_CARD_RENEWAL", stage: "CHECKLIST" },
        uncertain: ["photo background color requirement changed in 2024"],
        sources: [legalSource.vectorDocId],
      },
      status: "OPEN",
    },
  });

  console.log("Seeded:", {
    users: [citizenUser.email, officerUser.email, adminUser.email],
    procedure: procedure.code,
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
