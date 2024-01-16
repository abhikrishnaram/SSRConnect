/*
  Warnings:

  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone",
ALTER COLUMN "isAdmin" DROP NOT NULL,
ALTER COLUMN "isStaff" DROP NOT NULL,
ALTER COLUMN "isRegistered" DROP NOT NULL;
