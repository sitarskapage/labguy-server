-- AlterTable
ALTER TABLE `Preferences` ADD COLUMN `enable_3D` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `ThreedRef` ADD COLUMN `description` VARCHAR(191) NULL;
