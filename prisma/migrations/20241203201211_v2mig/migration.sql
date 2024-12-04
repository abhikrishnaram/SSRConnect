/*
  Warnings:

  - You are about to drop the column `authorId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Project` table. All the data in the column will be lost.
  - Added the required column `presentation` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `report` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `poster` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `video` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_authorId_fkey";

-- DropIndex
DROP INDEX "Project_slug_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "authorId",
DROP COLUMN "content",
DROP COLUMN "isPublished",
DROP COLUMN "slug",
ADD COLUMN     "gallery" TEXT[],
ADD COLUMN     "isAccepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "presentation" TEXT NOT NULL,
ADD COLUMN     "report" TEXT NOT NULL,
ALTER COLUMN "poster" SET NOT NULL,
ALTER COLUMN "video" SET NOT NULL;
