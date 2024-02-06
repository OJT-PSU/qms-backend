-- CreateTable
CREATE TABLE `Terminal` (
    `terminalId` INTEGER NOT NULL AUTO_INCREMENT,
    `terminalName` VARCHAR(191) NOT NULL,
    `remarks` VARCHAR(191) NOT NULL,
    `status` ENUM('active', 'inactive') NOT NULL,

    PRIMARY KEY (`terminalId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
