-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_classId_fkey";

-- AlterTable
ALTER TABLE "Announcement" ALTER COLUMN "classId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;
