-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_authorId_fkey";

-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "authorId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("social_id") ON DELETE RESTRICT ON UPDATE CASCADE;
