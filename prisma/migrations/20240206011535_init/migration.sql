-- CreateTable
CREATE TABLE `Monitor` (
    `monitorId` INTEGER NOT NULL AUTO_INCREMENT,
    `displayMessage` VARCHAR(191) NOT NULL,
    `scrollTime` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`monitorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
