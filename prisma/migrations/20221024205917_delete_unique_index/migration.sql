/*
  Warnings:

  - Added the required column `room_code` to the `question` table without a default value. This is not possible if the table is not empty.

*/

-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `question_room_code_fkey`;

-- AlterTable
ALTER TABLE `question` DROP COLUMN `room_code`;

-- AlterTable
ALTER TABLE `question` ADD COLUMN `room_code` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_room_code_fkey` FOREIGN KEY (`room_code`) REFERENCES `room`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;
