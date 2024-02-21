-- AlterTable
ALTER TABLE `display` ADD COLUMN `themeType` ENUM('oneColumn', 'threeColumn') NOT NULL DEFAULT 'oneColumn';
