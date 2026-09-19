-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "syllabus" TEXT[] DEFAULT ARRAY[]::TEXT[];
