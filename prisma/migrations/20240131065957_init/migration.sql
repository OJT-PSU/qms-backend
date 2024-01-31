/*
  Warnings:

  - The values [InProgress,Finished] on the enum `Queue_queueStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `queue` MODIFY `queueStatus` ENUM('Waiting', 'Accommodated') NOT NULL DEFAULT 'Waiting';
