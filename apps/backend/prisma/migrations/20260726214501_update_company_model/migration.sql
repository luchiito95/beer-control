-- CreateEnum
CREATE TYPE "CompanyStatus" AS ENUM ('TRIAL', 'ACTIVE', 'SUSPENDED', 'INACTIVE');

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "currencyCode" TEXT NOT NULL DEFAULT 'COP',
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "email" TEXT,
ADD COLUMN     "legalName" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "status" "CompanyStatus" NOT NULL DEFAULT 'TRIAL',
ADD COLUMN     "taxId" TEXT,
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'America/Bogota';

-- CreateIndex
CREATE INDEX "Company_status_idx" ON "Company"("status");
