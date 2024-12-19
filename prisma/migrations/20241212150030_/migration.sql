-- CreateTable
CREATE TABLE `GeneralSection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `slug` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `GeneralSection_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImageRef` (
    `etag` VARCHAR(191) NOT NULL,
    `public_id` VARCHAR(191) NULL,
    `mediaType` ENUM('IMAGE', 'VIDEO', 'THREE_D') NOT NULL DEFAULT 'IMAGE',
    `cld_url` VARCHAR(191) NULL,
    `path` VARCHAR(191) NULL,
    `filename` VARCHAR(191) NULL,
    `format` VARCHAR(191) NULL,
    `bytes` INTEGER NULL,
    `description` VARCHAR(191) NULL,
    `width` INTEGER NULL,
    `height` INTEGER NULL,
    `isBright` BOOLEAN NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `ImageRef_etag_key`(`etag`),
    UNIQUE INDEX `ImageRef_public_id_key`(`public_id`),
    UNIQUE INDEX `ImageRef_cld_url_key`(`cld_url`),
    UNIQUE INDEX `ImageRef_path_key`(`path`),
    UNIQUE INDEX `ImageRef_filename_key`(`filename`),
    PRIMARY KEY (`etag`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VideoRef` (
    `etag` VARCHAR(191) NOT NULL,
    `mediaType` ENUM('IMAGE', 'VIDEO', 'THREE_D') NOT NULL DEFAULT 'VIDEO',
    `id` VARCHAR(191) NULL,
    `vimeo_url` VARCHAR(191) NULL,
    `sc_url` VARCHAR(191) NULL,
    `yt_url` VARCHAR(191) NULL,
    `title` VARCHAR(191) NULL DEFAULT 'Untitled',
    `duration` VARCHAR(191) NULL,
    `definition` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `thumbnail` VARCHAR(191) NULL,
    `player_loop` BOOLEAN NOT NULL DEFAULT true,
    `player_muted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `VideoRef_etag_key`(`etag`),
    UNIQUE INDEX `VideoRef_vimeo_url_key`(`vimeo_url`),
    UNIQUE INDEX `VideoRef_sc_url_key`(`sc_url`),
    UNIQUE INDEX `VideoRef_yt_url_key`(`yt_url`),
    PRIMARY KEY (`etag`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` JSON NULL,
    `generalId` INTEGER NOT NULL,
    `authorEmail` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Post_generalId_key`(`generalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Preferences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `artists_name` VARCHAR(191) NOT NULL DEFAULT 'Artist''s Name',
    `homepage_heading` VARCHAR(191) NULL DEFAULT 'Homepage',
    `homepage_subheading` VARCHAR(191) NULL DEFAULT 'Sub-Heading',
    `homepage_media` JSON NULL,
    `homepage_urls` JSON NULL,
    `enable_dashboard_darkmode` BOOLEAN NOT NULL DEFAULT false,
    `enable_portfolio_pdf` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subtitle` TEXT NULL,
    `start_date` JSON NULL,
    `end_date` JSON NULL,
    `text` TEXT NULL,
    `venue` VARCHAR(191) NULL,
    `urls` JSON NULL,
    `media` JSON NULL,
    `generalId` INTEGER NOT NULL,

    UNIQUE INDEX `Project_generalId_key`(`generalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectsOnWorks` (
    `projectId` INTEGER NOT NULL,
    `workId` INTEGER NOT NULL,
    `fIndex` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`projectId`, `workId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tag_title_key`(`title`),
    INDEX `Tag_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialMedia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `platform` VARCHAR(191) NULL,
    `profileUrl` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `contactId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `profileId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `picture` JSON NULL,
    `statement` TEXT NULL,
    `additional` JSON NULL,
    `portfolio_pdf_url` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `salt` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Work` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` LONGTEXT NULL,
    `medium` VARCHAR(191) NULL,
    `dimensions` VARCHAR(191) NULL,
    `year` INTEGER NULL,
    `urls` JSON NULL,
    `media` JSON NULL,
    `generalId` INTEGER NOT NULL,

    UNIQUE INDEX `Work_generalId_key`(`generalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GeneralSectionToTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GeneralSectionToTag_AB_unique`(`A`, `B`),
    INDEX `_GeneralSectionToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ImageRefToTag` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ImageRefToTag_AB_unique`(`A`, `B`),
    INDEX `_ImageRefToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TagToVideoRef` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_TagToVideoRef_AB_unique`(`A`, `B`),
    INDEX `_TagToVideoRef_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_generalId_fkey` FOREIGN KEY (`generalId`) REFERENCES `GeneralSection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorEmail_fkey` FOREIGN KEY (`authorEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_generalId_fkey` FOREIGN KEY (`generalId`) REFERENCES `GeneralSection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectsOnWorks` ADD CONSTRAINT `ProjectsOnWorks_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectsOnWorks` ADD CONSTRAINT `ProjectsOnWorks_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `Work`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialMedia` ADD CONSTRAINT `SocialMedia_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contact`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contact` ADD CONSTRAINT `Contact_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Work` ADD CONSTRAINT `Work_generalId_fkey` FOREIGN KEY (`generalId`) REFERENCES `GeneralSection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GeneralSectionToTag` ADD CONSTRAINT `_GeneralSectionToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `GeneralSection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GeneralSectionToTag` ADD CONSTRAINT `_GeneralSectionToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImageRefToTag` ADD CONSTRAINT `_ImageRefToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `ImageRef`(`etag`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImageRefToTag` ADD CONSTRAINT `_ImageRefToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TagToVideoRef` ADD CONSTRAINT `_TagToVideoRef_A_fkey` FOREIGN KEY (`A`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TagToVideoRef` ADD CONSTRAINT `_TagToVideoRef_B_fkey` FOREIGN KEY (`B`) REFERENCES `VideoRef`(`etag`) ON DELETE CASCADE ON UPDATE CASCADE;
