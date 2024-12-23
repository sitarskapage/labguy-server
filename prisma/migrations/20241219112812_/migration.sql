-- CreateTable
CREATE TABLE `ThreedRef` (
    `etag` VARCHAR(191) NOT NULL,
    `mediaType` ENUM('IMAGE', 'VIDEO', 'THREE_D') NOT NULL DEFAULT 'THREE_D',
    `path` VARCHAR(191) NULL,
    `filename` VARCHAR(191) NULL,

    UNIQUE INDEX `ThreedRef_etag_key`(`etag`),
    UNIQUE INDEX `ThreedRef_path_key`(`path`),
    UNIQUE INDEX `ThreedRef_filename_key`(`filename`),
    PRIMARY KEY (`etag`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
