/*
  Warnings:

  - You are about to drop the column `teamCode` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[leadId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `members` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teamCode_fkey";

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "leadId" TEXT,
ADD COLUMN     "members" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "teamCode";

-- CreateIndex
CREATE UNIQUE INDEX "Team_leadId_key" ON "Team"("leadId");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
