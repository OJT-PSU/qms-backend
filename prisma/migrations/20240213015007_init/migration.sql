/*
  Warnings:

  - You are about to alter the column `terminal` on the `queue` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `queue` MODIFY `terminal` VARCHAR(191) NULL;
