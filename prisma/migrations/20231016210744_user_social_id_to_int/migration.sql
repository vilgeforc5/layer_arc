/*
  Warnings:

  - Changed the type of `social_id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "social_id",
ADD COLUMN     "social_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_social_id_key" ON "User"("social_id");
