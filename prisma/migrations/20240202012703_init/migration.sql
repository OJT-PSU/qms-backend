-- AlterTable
ALTER TABLE `queue` MODIFY `queueStatus` ENUM('waiting', 'ongoing', 'accommodated') NOT NULL DEFAULT 'waiting';
