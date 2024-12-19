/*
  Warnings:

  - You are about to drop the column `id` on the `VideoRef` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[public_id]` on the table `ThreedRef` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[public_id]` on the table `VideoRef` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `ThreedRef` ADD COLUMN `public_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `VideoRef` DROP COLUMN `id`,
    ADD COLUMN `public_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ThreedRef_public_id_key` ON `ThreedRef`(`public_id`);

-- CreateIndex
CREATE UNIQUE INDEX `VideoRef_public_id_key` ON `VideoRef`(`public_id`);
