/*
  Warnings:

  - Added the required column `video` to the `Display` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `display` ADD COLUMN `video` VARCHAR(191) NOT NULL;
