-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "category" TEXT,
ADD COLUMN     "contentFormat" TEXT NOT NULL DEFAULT 'markdown',
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
