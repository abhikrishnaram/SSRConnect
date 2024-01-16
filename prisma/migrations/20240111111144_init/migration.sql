/*
  Warnings:

  - You are about to drop the column `teamId` on the `User` table. All the data in the column will be lost.
  - Added the required column `teamCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_mentorId_fkey";

-- DropIndex
DROP INDEX "Team_mentorId_key";

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "mentorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "teamId",
ADD COLUMN     "teamCode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamCode_fkey" FOREIGN KEY ("teamCode") REFERENCES "Team"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
