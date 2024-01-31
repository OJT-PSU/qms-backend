/*
  Warnings:

  - A unique constraint covering the columns `[name,createdAt]` on the table `Queue` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Queue_name_createdAt_key` ON `Queue`(`name`, `createdAt`);
