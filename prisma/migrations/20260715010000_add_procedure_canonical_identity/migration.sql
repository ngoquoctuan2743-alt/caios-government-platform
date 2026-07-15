-- AlterTable
-- ADR-0012 (Procedure Identity Strategy): purely additive, nullable columns.
-- No existing column is renamed or dropped; every existing row remains
-- valid with these two new fields NULL until explicitly backfilled.
ALTER TABLE "Procedure" ADD COLUMN     "canonicalId" TEXT,
ADD COLUMN     "governmentProcedureCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Procedure_canonicalId_key" ON "Procedure"("canonicalId");
