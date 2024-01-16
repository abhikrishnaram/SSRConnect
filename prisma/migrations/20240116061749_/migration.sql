/*
  Warnings:

  - You are about to drop the column `projectId` on the `Team` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_projectId_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "projectId";

-- CreateIndex
CREATE UNIQUE INDEX "Project_code_key" ON "Project"("code");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_code_fkey" FOREIGN KEY ("code") REFERENCES "Team"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
