/*
  Warnings:

  - A unique constraint covering the columns `[video_id]` on the table `Video` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `video_id` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "video_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Video_video_id_key" ON "Video"("video_id");
