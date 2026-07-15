-- AlterTable
ALTER TABLE "ChecklistItem" ADD COLUMN     "procedureId" TEXT,
ADD COLUMN     "documentId" TEXT,
ADD COLUMN     "optional" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "source" TEXT;

-- CreateTable
CREATE TABLE "ConversationTurn" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "citizenMessage" TEXT NOT NULL,
    "assistantResponse" TEXT NOT NULL,
    "turnNumber" INTEGER NOT NULL,
    "responseTimeMs" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConversationTurn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcedureResolution" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "conversationTurnId" TEXT NOT NULL,
    "procedureId" TEXT NOT NULL,
    "confidence" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "matchedPhrase" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProcedureResolution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CitationResolution" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "conversationTurnId" TEXT NOT NULL,
    "procedureId" TEXT NOT NULL,
    "citationId" TEXT NOT NULL,
    "citationLevel" TEXT NOT NULL,
    "verificationStatus" TEXT NOT NULL,
    "confidence" TEXT NOT NULL,
    "traceability" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CitationResolution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ConversationTurn_caseId_idx" ON "ConversationTurn"("caseId");

-- CreateIndex
CREATE INDEX "ConversationTurn_caseId_turnNumber_idx" ON "ConversationTurn"("caseId", "turnNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ProcedureResolution_conversationTurnId_key" ON "ProcedureResolution"("conversationTurnId");

-- CreateIndex
CREATE INDEX "ProcedureResolution_caseId_idx" ON "ProcedureResolution"("caseId");

-- CreateIndex
CREATE INDEX "ProcedureResolution_procedureId_idx" ON "ProcedureResolution"("procedureId");

-- CreateIndex
CREATE INDEX "CitationResolution_caseId_idx" ON "CitationResolution"("caseId");

-- CreateIndex
CREATE INDEX "CitationResolution_conversationTurnId_idx" ON "CitationResolution"("conversationTurnId");

-- CreateIndex
CREATE INDEX "CitationResolution_citationId_idx" ON "CitationResolution"("citationId");

-- AddForeignKey
ALTER TABLE "ConversationTurn" ADD CONSTRAINT "ConversationTurn_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcedureResolution" ADD CONSTRAINT "ProcedureResolution_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcedureResolution" ADD CONSTRAINT "ProcedureResolution_conversationTurnId_fkey" FOREIGN KEY ("conversationTurnId") REFERENCES "ConversationTurn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CitationResolution" ADD CONSTRAINT "CitationResolution_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CitationResolution" ADD CONSTRAINT "CitationResolution_conversationTurnId_fkey" FOREIGN KEY ("conversationTurnId") REFERENCES "ConversationTurn"("id") ON DELETE CASCADE ON UPDATE CASCADE;
