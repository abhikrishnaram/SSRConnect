-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mID" TEXT;
