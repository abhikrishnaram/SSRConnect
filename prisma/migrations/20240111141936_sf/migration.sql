/*
  Warnings:

  - Made the column `isAdmin` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isStaff` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isRegistered` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `canLogin` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teamCode_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isAdmin" SET NOT NULL,
ALTER COLUMN "isStaff" SET NOT NULL,
ALTER COLUMN "isRegistered" SET NOT NULL,
ALTER COLUMN "teamCode" DROP NOT NULL,
ALTER COLUMN "canLogin" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamCode_fkey" FOREIGN KEY ("teamCode") REFERENCES "Team"("code") ON DELETE SET NULL ON UPDATE CASCADE;
