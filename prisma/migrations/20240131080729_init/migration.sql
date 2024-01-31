/*
  Warnings:

  - You are about to alter the column `queueStatus` on the `queue` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `queue` MODIFY `queueStatus` ENUM('waiting', 'accommodated') NOT NULL DEFAULT 'waiting';
