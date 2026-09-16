-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('planeada', 'a_decorrer', 'concluida');

-- CreateEnum
CREATE TYPE "TrainingStatus" AS ENUM ('nao_iniciado', 'em_curso', 'concluido', 'reprovado');

-- CreateEnum
CREATE TYPE "CertificateStatus" AS ENUM ('nao_elegivel', 'elegivel', 'emitido');

-- AlterTable
ALTER TABLE "CourseEnrollment" ADD COLUMN     "certificateCode" TEXT,
ADD COLUMN     "certificateIssuedAt" TIMESTAMP(3),
ADD COLUMN     "certificateStatus" "CertificateStatus" NOT NULL DEFAULT 'nao_elegivel',
ADD COLUMN     "clientCompanyId" TEXT,
ADD COLUMN     "grade" DOUBLE PRECISION,
ADD COLUMN     "hoursCompleted" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastActivityAt" TIMESTAMP(3),
ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sessionId" TEXT,
ADD COLUMN     "trainingStatus" "TrainingStatus" NOT NULL DEFAULT 'nao_iniciado';

-- CreateTable
CREATE TABLE "CourseSession" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "instructorName" TEXT,
    "location" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "seats" INTEGER,
    "status" "SessionStatus" NOT NULL DEFAULT 'planeada',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sector" TEXT,
    "contractLabel" TEXT,
    "seatsContracted" INTEGER,
    "accountManager" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffNotification" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "audienceLabel" TEXT NOT NULL,
    "recipientEmails" TEXT[],
    "successCount" INTEGER NOT NULL DEFAULT 0,
    "failureCount" INTEGER NOT NULL DEFAULT 0,
    "createdBy" TEXT,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StaffNotification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseSession_code_key" ON "CourseSession"("code");

-- CreateIndex
CREATE INDEX "CourseSession_courseId_idx" ON "CourseSession"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CourseEnrollment_certificateCode_key" ON "CourseEnrollment"("certificateCode");

-- CreateIndex
CREATE INDEX "CourseEnrollment_sessionId_idx" ON "CourseEnrollment"("sessionId");

-- CreateIndex
CREATE INDEX "CourseEnrollment_clientCompanyId_idx" ON "CourseEnrollment"("clientCompanyId");

-- AddForeignKey
ALTER TABLE "CourseSession" ADD CONSTRAINT "CourseSession_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "CourseSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_clientCompanyId_fkey" FOREIGN KEY ("clientCompanyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

