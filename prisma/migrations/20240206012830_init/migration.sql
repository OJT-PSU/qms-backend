/*
  Warnings:

  - You are about to drop the `monitor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `monitor`;

-- CreateTable
CREATE TABLE `Display` (
    `displayId` INTEGER NOT NULL AUTO_INCREMENT,
    `dispMsg` VARCHAR(10000) NOT NULL,
    `scrollTime` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`displayId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
