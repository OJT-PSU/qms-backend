/*
  Warnings:

  - Added the required column `priorityType` to the `Queue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `queue` ADD COLUMN `priorityType` ENUM('normal', 'senior', 'pwd', 'pregnant') NOT NULL;
