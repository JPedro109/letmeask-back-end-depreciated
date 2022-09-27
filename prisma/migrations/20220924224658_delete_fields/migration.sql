/*
  Warnings:

  - You are about to drop the column `user_id` on the `response` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `response` DROP FOREIGN KEY `response_user_id_fkey`;

-- AlterTable
ALTER TABLE `response` DROP COLUMN `user_id`;
