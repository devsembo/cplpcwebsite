-- CreateEnum
CREATE TYPE "FormandoAuthPurpose" AS ENUM ('setup', 'reset');

-- CreateTable
CREATE TABLE "FormandoAccount" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "FormandoAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormandoAuthToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "purpose" "FormandoAuthPurpose" NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormandoAuthToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminLoginAttempt" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminLoginAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormandoAccount_email_key" ON "FormandoAccount"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FormandoAuthToken_token_key" ON "FormandoAuthToken"("token");

-- CreateIndex
CREATE INDEX "FormandoAuthToken_email_idx" ON "FormandoAuthToken"("email");

-- CreateIndex
CREATE INDEX "AdminLoginAttempt_email_createdAt_idx" ON "AdminLoginAttempt"("email", "createdAt");
