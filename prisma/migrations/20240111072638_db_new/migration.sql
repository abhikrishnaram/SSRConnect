/*
  Warnings:

  - You are about to drop the column `mentorId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `teamCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `teamMembers` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `teamName` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_mentorId_fkey";

-- AlterTable
ALTER TABLE "Proposal" ADD COLUMN     "teamCode" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "mentorId",
DROP COLUMN "teamCode",
DROP COLUMN "teamMembers",
DROP COLUMN "teamName",
ADD COLUMN     "teamId" TEXT;

-- CreateTable
CREATE TABLE "Team" (
    "code" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_code_key" ON "Team"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Team_userId_key" ON "Team"("userId");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_teamCode_fkey" FOREIGN KEY ("teamCode") REFERENCES "Team"("code") ON DELETE SET NULL ON UPDATE CASCADE;
