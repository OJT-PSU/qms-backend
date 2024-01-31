/*
  Warnings:

  - Made the column `name` on table `queue` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `queue` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `contactNumber` VARCHAR(191) NULL;
