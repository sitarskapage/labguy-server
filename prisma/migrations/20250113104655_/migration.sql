-- AlterTable
ALTER TABLE `Preferences` ADD COLUMN `enable_images` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `enable_sc` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `enable_vimeo` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `enable_yt` BOOLEAN NOT NULL DEFAULT false;
