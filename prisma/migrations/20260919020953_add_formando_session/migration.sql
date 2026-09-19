-- CreateTable
CREATE TABLE "FormandoSession" (
    "id" TEXT NOT NULL,
    "formandoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormandoSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FormandoSession_formandoId_idx" ON "FormandoSession"("formandoId");

-- AddForeignKey
ALTER TABLE "FormandoSession" ADD CONSTRAINT "FormandoSession_formandoId_fkey" FOREIGN KEY ("formandoId") REFERENCES "FormandoAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
