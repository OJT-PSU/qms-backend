/*
  Warnings:

  - You are about to alter the column `themeType` on the `display` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Int`.

*/
-- AlterTable
ALTER TABLE `display` MODIFY `themeType` INTEGER NOT NULL;
