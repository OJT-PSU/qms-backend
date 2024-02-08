/*
  Warnings:

  - Added the required column `transactionType` to the `Queue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionType` to the `Terminal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `queue` ADD COLUMN `transactionType` ENUM('checkReleasing', 'payment', 'inquiry') NOT NULL;

-- AlterTable
ALTER TABLE `terminal` ADD COLUMN `transactionType` ENUM('checkReleasing', 'payment', 'inquiry') NOT NULL;
