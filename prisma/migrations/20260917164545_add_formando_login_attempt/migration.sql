-- CreateTable
CREATE TABLE "FormandoLoginAttempt" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormandoLoginAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FormandoLoginAttempt_email_createdAt_idx" ON "FormandoLoginAttempt"("email", "createdAt");
