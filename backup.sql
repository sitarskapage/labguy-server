-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: host797681.xce.pl    Database: host797681_test
-- ------------------------------------------------------
-- Server version	5.5.5-10.6.18-MariaDB-cll-lve

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Contact`
--

DROP TABLE IF EXISTS `Contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `profileId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Contact_profileId_fkey` (`profileId`),
  CONSTRAINT `Contact_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contact`
--

LOCK TABLES `Contact` WRITE;
/*!40000 ALTER TABLE `Contact` DISABLE KEYS */;
INSERT INTO `Contact` VALUES (1,'Jakub Kanna','info@jakubkanna.com',1);
/*!40000 ALTER TABLE `Contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GeneralSection`
--

DROP TABLE IF EXISTS `GeneralSection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GeneralSection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `published` tinyint(1) NOT NULL DEFAULT 0,
  `slug` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `GeneralSection_slug_key` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GeneralSection`
--

LOCK TABLES `GeneralSection` WRITE;
/*!40000 ALTER TABLE `GeneralSection` DISABLE KEYS */;
INSERT INTO `GeneralSection` VALUES (17,'Exodus Project',NULL,1,'exodus','2024-11-21 13:26:28.020','2024-11-21 13:26:28.020'),(18,'First project','Description of a new project.',0,'first-project','2024-12-12 10:45:37.183','2024-12-12 10:45:37.183'),(20,'Oasis',NULL,1,'oasis','2024-12-12 12:11:47.140','2024-12-12 12:11:47.140'),(21,'Flames of S16',NULL,1,'flames-of-s16','2024-12-12 12:21:01.854','2024-12-12 12:21:01.854'),(22,'Too Fast to Last',NULL,1,'too-fast-to-last','2024-12-12 12:39:24.628','2024-12-12 12:39:24.628');
/*!40000 ALTER TABLE `GeneralSection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ImageRef`
--

DROP TABLE IF EXISTS `ImageRef`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ImageRef` (
  `etag` varchar(191) NOT NULL,
  `public_id` varchar(191) DEFAULT NULL,
  `mediaType` enum('IMAGE','VIDEO','THREE_D') NOT NULL DEFAULT 'IMAGE',
  `cld_url` varchar(191) DEFAULT NULL,
  `path` varchar(191) DEFAULT NULL,
  `filename` varchar(191) DEFAULT NULL,
  `format` varchar(191) DEFAULT NULL,
  `bytes` int(11) DEFAULT NULL,
  `description` varchar(191),
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) DEFAULT NULL,
  `isBright` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`etag`),
  UNIQUE KEY `ImageRef_etag_key` (`etag`),
  UNIQUE KEY `ImageRef_public_id_key` (`public_id`),
  UNIQUE KEY `ImageRef_cld_url_key` (`cld_url`),
  UNIQUE KEY `ImageRef_path_key` (`path`),
  UNIQUE KEY `ImageRef_filename_key` (`filename`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ImageRef`
--

LOCK TABLES `ImageRef` WRITE;
/*!40000 ALTER TABLE `ImageRef` DISABLE KEYS */;
INSERT INTO `ImageRef` VALUES ('017e721cca1e1b6f8aa987574c726c09','Screenshot-2023-07-02-at-14.02.27-1536x864','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/Screenshot-2023-07-02-at-14.02.27-1536x864.jpg','/home/host797681/labguy-server/public/uploads/images/Screenshot-2023-07-02-at-14.02.27-1536x864.jpeg','Screenshot-2023-07-02-at-14.02.27-1536x864','jpg',425631,'',2160,1215,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.342',NULL),('03bf779fab1a3b2c68b48f7c68627b4a','DSF8958','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734004866/DSF8958.jpg','/home/host797681/labguy-server/public/uploads/images/DSF8958.jpeg','DSF8958','jpg',217655,'',2160,1440,'2024-12-12 12:01:06.000','2024-12-12 12:01:07.451',1),('03e49972ec43f45c55aacd9223bd8877','mediator-jakubtrz-2048x1536','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733999133/mediator-jakubtrz-2048x1536.jpg','/home/host797681/labguy-server/public/uploads/images/mediator-jakubtrz-2048x1536.jpeg','mediator-jakubtrz-2048x1536','jpg',300844,'',2160,1620,'2024-12-12 10:25:33.000','2024-12-12 10:25:34.202',NULL),('0552c4e052378e925830afe24cec5cd5','luka5g-green-light-jakubtrz','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734004764/luka5g-green-light-jakubtrz.jpg','/home/host797681/labguy-server/public/uploads/images/luka5g-green-light-jakubtrz.jpeg','luka5g-green-light-jakubtrz','jpg',160308,'',1727,2160,'2024-12-12 11:59:24.000','2024-12-12 11:59:25.226',0),('09fcc14c85800bfd0d4e75d3b820213e','IMG-7591-1152x1536_(1)','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/IMG-7591-1152x1536_%281%29.jpg','/home/host797681/labguy-server/public/uploads/images/IMG-7591-1152x1536_(1).jpeg','IMG-7591-1152x1536_(1)','jpg',234868,'',1620,2160,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.200',NULL),('0be5b08ad2c850c7335bf14a05d8be04','2213_DSF6775_jakubkanna-1024x683','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2213_DSF6775_jakubkanna-1024x683.jpg','/home/host797681/labguy-server/public/uploads/images/2213_DSF6775_jakubkanna-1024x683.jpeg','2213_DSF6775_jakubkanna-1024x683','jpg',289045,'',2160,1441,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.197',NULL),('0db53c8135c3edb1c644d311f9ef3a81','luka_zielone_swiatlo_0017_Warstwa-8_0008_Bez-nazwy-1_0001_Warstwa-1-500x250-1','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734004764/luka_zielone_swiatlo_0017_Warstwa-8_0008_Bez-nazwy-1_0001_Warstwa-1-500x250-1.jpg','/home/host797681/labguy-server/public/uploads/images/luka_zielone_swiatlo_0017_Warstwa-8_0008_Bez-nazwy-1_0001_Warstwa-1-500x250-1.jpeg','luka_zielone_swiatlo_0017_Warstwa-8_0008_Bez-nazwy-1_0001_Warstwa-1-500x250-1','jpg',107990,'',2160,1080,'2024-12-12 11:59:24.000','2024-12-12 11:59:25.290',0),('1196f1f29af15d77e5f1b5398ed46530','2175_DSF6472_jakubkanna-1536x1024','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2175_DSF6472_jakubkanna-1536x1024.jpg','/home/host797681/labguy-server/public/uploads/images/2175_DSF6472_jakubkanna-1536x1024.jpeg','2175_DSF6472_jakubkanna-1536x1024','jpg',182653,'',2160,1440,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.225',NULL),('17f3f0327ea508439f9c702115ba529b','luka_zielone_swiatlo_0017_Warstwa-8_0013_Bez-nazwy-1-â-Odzyskano_0011_Warstwa-31-1080x540-1','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734004764/luka_zielone_swiatlo_0017_Warstwa-8_0013_Bez-nazwy-1-%C3%A2-Odzyskano_0011_Warstwa-31-1080x540-1.jpg','/home/host797681/labguy-server/public/uploads/images/luka_zielone_swiatlo_0017_Warstwa-8_0013_Bez-nazwy-1-â-Odzyskano_0011_Warstwa-31-1080x540-1.jpeg',NULL,'jpg',75176,'',2160,1080,'2024-12-12 11:59:24.000','2024-12-12 11:59:25.223',0),('183629cd307c4b730ba14d30dc1031b4','20230622_155017-1152x1536','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/20230622_155017-1152x1536.jpg','/home/host797681/labguy-server/public/uploads/images/20230622_155017-1152x1536.jpeg','20230622_155017-1152x1536','jpg',421085,'',1620,2160,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.376',NULL),('19f197c30cb2c9d86f991bf6c1d73d7d','2184_DSF6550_jakubkanna','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2184_DSF6550_jakubkanna.jpg','/home/host797681/labguy-server/public/uploads/images/2184_DSF6550_jakubkanna.jpeg','2184_DSF6550_jakubkanna','jpg',278964,'',2160,1215,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.315',NULL),('1c0a9346f17495ada657df5893b6daa8','2219_DSF6801_jakubkanna-1536x1024','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2219_DSF6801_jakubkanna-1536x1024.jpg','/home/host797681/labguy-server/public/uploads/images/2219_DSF6801_jakubkanna-1536x1024.jpeg','2219_DSF6801_jakubkanna-1536x1024','jpg',274469,'',2160,1440,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.059',NULL),('25856d24d9f2b5f647b8d099400c0fb0','2093_DSF6443_jakubkanna-1536x864','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2093_DSF6443_jakubkanna-1536x864.jpg','/home/host797681/labguy-server/public/uploads/images/2093_DSF6443_jakubkanna-1536x864.jpeg','2093_DSF6443_jakubkanna-1536x864','jpg',191871,'',2160,1215,'2024-12-12 10:13:54.000','2024-12-12 10:13:54.897',NULL),('2753abe4cb0eceb601beac9b52f88a51','2194_DSF6616_jakubkanna-2048x1152','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2194_DSF6616_jakubkanna-2048x1152.jpg','/home/host797681/labguy-server/public/uploads/images/2194_DSF6616_jakubkanna-2048x1152.jpeg','2194_DSF6616_jakubkanna-2048x1152','jpg',228101,'',2160,1215,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.297',NULL),('275874150de0e5fd33ba45afc158b607','2239_DSF6902_jakubkanna-2048x1152','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2239_DSF6902_jakubkanna-2048x1152.jpg','/home/host797681/labguy-server/public/uploads/images/2239_DSF6902_jakubkanna-2048x1152.jpeg','2239_DSF6902_jakubkanna-2048x1152','jpg',183902,'',2160,1215,'2024-12-12 10:13:54.000','2024-12-12 10:13:54.922',NULL),('2989b6dabfe0ee18b9580e5303407a52','luka_zielone_swiatlo_0017_Warstwa-8_0002_Bez-nazwy-1-â-Odzyskano_0005_Warstwa-37-1080x540-1','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734004764/luka_zielone_swiatlo_0017_Warstwa-8_0002_Bez-nazwy-1-%C3%A2-Odzyskano_0005_Warstwa-37-1080x540-1.jpg','/home/host797681/labguy-server/public/uploads/images/luka_zielone_swiatlo_0017_Warstwa-8_0002_Bez-nazwy-1-â-Odzyskano_0005_Warstwa-37-1080x540-1.jpeg',NULL,'jpg',218601,'',2160,1080,'2024-12-12 11:59:24.000','2024-12-12 11:59:25.409',0),('29a942cccd0ab22010e80b05663e299d','2227_DSF6402_jakubkanna-1536x864','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2227_DSF6402_jakubkanna-1536x864.jpg','/home/host797681/labguy-server/public/uploads/images/2227_DSF6402_jakubkanna-1536x864.jpeg','2227_DSF6402_jakubkanna-1536x864','jpg',303617,'',2160,1215,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.407',NULL),('2b6c88c78731e137f871da9706bbbc30','2187_DSF6579_jakubkanna-1536x864','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2187_DSF6579_jakubkanna-1536x864.jpg','/home/host797681/labguy-server/public/uploads/images/2187_DSF6579_jakubkanna-1536x864.jpeg','2187_DSF6579_jakubkanna-1536x864','jpg',293973,'',2160,1215,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.245',NULL),('2d52495b58bc4d197342fc8dc09732e9','2206_DSF6690_jakubkanna-1-1536x1024','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2206_DSF6690_jakubkanna-1-1536x1024.jpg','/home/host797681/labguy-server/public/uploads/images/2206_DSF6690_jakubkanna-1-1536x1024.jpeg','2206_DSF6690_jakubkanna-1-1536x1024','jpg',249747,'',2160,1440,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.265',NULL),('332308647c57fd5f5db8d5de04c1d787','2178_DSF6482_jakubkanna-2-1536x864','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2178_DSF6482_jakubkanna-2-1536x864.jpg','/home/host797681/labguy-server/public/uploads/images/2178_DSF6482_jakubkanna-2-1536x864.jpeg','2178_DSF6482_jakubkanna-2-1536x864','jpg',246044,'',2160,1215,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.206',NULL),('34097939302bfa1c0ceffb88a50fa565','2211_DSF6771_jakubkanna-1024x683','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734006341/2211_DSF6771_jakubkanna-1024x683.jpg','/home/host797681/labguy-server/public/uploads/images/2211_DSF6771_jakubkanna-1024x683.jpeg','2211_DSF6771_jakubkanna-1024x683','jpg',52398,'',1024,683,'2024-12-12 10:13:54.000','2024-12-12 12:25:41.945',0),('349eaa4e26fa574ebc3d332b0a4f1f2a','2221_DSF6817_jakubkanna-1536x864','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2221_DSF6817_jakubkanna-1536x864.jpg','/home/host797681/labguy-server/public/uploads/images/2221_DSF6817_jakubkanna-1536x864.jpeg','2221_DSF6817_jakubkanna-1536x864','jpg',223599,'',2160,1215,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.333',NULL),('379f2fded422b58495e16df09b8c5d02','luka_zielone_swiatlo_0017_Warstwa-8_0012_Bez-nazwy-1-â-Odzyskano_0013_Warstwa-29-1080x540-1','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734004764/luka_zielone_swiatlo_0017_Warstwa-8_0012_Bez-nazwy-1-%C3%A2-Odzyskano_0013_Warstwa-29-1080x540-1.jpg','/home/host797681/labguy-server/public/uploads/images/luka_zielone_swiatlo_0017_Warstwa-8_0012_Bez-nazwy-1-â-Odzyskano_0013_Warstwa-29-1080x540-1.jpeg',NULL,'jpg',147852,'',2160,1080,'2024-12-12 11:59:24.000','2024-12-12 11:59:25.379',0),('3e7b733d96b186795c9f1af296ae196a','ARENA-2048x1365','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733999134/ARENA-2048x1365.jpg','/home/host797681/labguy-server/public/uploads/images/ARENA-2048x1365.jpeg','ARENA-2048x1365','jpg',468395,'',2160,1440,'2024-12-12 10:25:34.000','2024-12-12 10:25:34.562',NULL),('44a49294427e9ec1c173afc49cac774d','DSF8666-1','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734004866/DSF8666-1.jpg','/home/host797681/labguy-server/public/uploads/images/DSF8666-1.jpeg','DSF8666-1','jpg',214345,'',2160,1215,'2024-12-12 12:01:06.000','2024-12-12 12:01:07.148',1),('451e4cebef653f4d57ae853eae16f5e2','IMG-7593-1152x1536_(1)','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/IMG-7593-1152x1536_%281%29.jpg','/home/host797681/labguy-server/public/uploads/images/IMG-7593-1152x1536_(1).jpeg','IMG-7593-1152x1536_(1)','jpg',411553,'',1620,2160,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.250',NULL),('47b4d2db9b59653f2f982c535b79d725','2200_DSF6660_jakubkanna-1536x1024','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2200_DSF6660_jakubkanna-1536x1024.jpg','/home/host797681/labguy-server/public/uploads/images/2200_DSF6660_jakubkanna-1536x1024.jpeg','2200_DSF6660_jakubkanna-1536x1024','jpg',278316,'',2160,1440,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.306',NULL),('4c4bbd89fa547d9eb017cdd8d719d380','luka_zielone_swiatlo_0017_Warstwa-8_0003_Bez-nazwy-1-â-Odzyskano_0003_Warstwa-39-1080x540-1','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734004764/luka_zielone_swiatlo_0017_Warstwa-8_0003_Bez-nazwy-1-%C3%A2-Odzyskano_0003_Warstwa-39-1080x540-1.jpg','/home/host797681/labguy-server/public/uploads/images/luka_zielone_swiatlo_0017_Warstwa-8_0003_Bez-nazwy-1-â-Odzyskano_0003_Warstwa-39-1080x540-1.jpeg',NULL,'jpg',59794,'',2160,1080,'2024-12-12 11:59:24.000','2024-12-12 11:59:25.077',0),('58c668573c76fd0432ff97162fdd2289','2176_DSF6475_jakubkanna-1536x1024','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2176_DSF6475_jakubkanna-1536x1024.jpg','/home/host797681/labguy-server/public/uploads/images/2176_DSF6475_jakubkanna-1536x1024.jpeg','2176_DSF6475_jakubkanna-1536x1024','jpg',270090,'',2160,1440,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.050',NULL),('5a0af3dc8aa629427074c87b46249fd3','2105_DSF6538_jakubkanna-1-1536x1024','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2105_DSF6538_jakubkanna-1-1536x1024.jpg','/home/host797681/labguy-server/public/uploads/images/2105_DSF6538_jakubkanna-1-1536x1024.jpeg','2105_DSF6538_jakubkanna-1-1536x1024','jpg',187119,'',2160,1440,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.136',NULL),('5f0986bbe28d0ff5a14f2e1c37326733','bikepaintandme-2048x1152','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733999133/bikepaintandme-2048x1152.jpg','/home/host797681/labguy-server/public/uploads/images/bikepaintandme-2048x1152.jpeg','bikepaintandme-2048x1152','jpg',228202,'',2160,1215,'2024-12-12 10:25:33.000','2024-12-12 10:25:34.210',NULL),('6053a8ac6594bdfc0ad8a5bf23ffc54e','2218_DSF6798_jakubkanna-1365x2048','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2218_DSF6798_jakubkanna-1365x2048.jpg','/home/host797681/labguy-server/public/uploads/images/2218_DSF6798_jakubkanna-1365x2048.jpeg','2218_DSF6798_jakubkanna-1365x2048','jpg',347944,'',1440,2160,'2024-12-12 10:13:54.000','2024-12-12 10:13:56.067',NULL),('60e3c0cfb8cf8a794000b4db66a0ed84','stacked_16x9-1-1536x864','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/stacked_16x9-1-1536x864.jpg','/home/host797681/labguy-server/public/uploads/images/stacked_16x9-1-1536x864.jpeg','stacked_16x9-1-1536x864','jpg',190553,'',2160,1215,'2024-12-12 10:13:54.000','2024-12-12 10:13:54.908',NULL),('6311ede8f48e313249b255e91c76e3ca','2185_DSF6567_jakubkanna-2048x1152','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2185_DSF6567_jakubkanna-2048x1152.jpg','/home/host797681/labguy-server/public/uploads/images/2185_DSF6567_jakubkanna-2048x1152.jpeg','2185_DSF6567_jakubkanna-2048x1152','jpg',232079,'',2160,1215,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.322',NULL),('6335ed4d31267736ced7125b269b2eea','DSF8855-e1627670050672','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734004866/DSF8855-e1627670050672.jpg','/home/host797681/labguy-server/public/uploads/images/DSF8855-e1627670050672.jpeg','DSF8855-e1627670050672','jpg',181316,'',2160,1215,'2024-12-12 12:01:06.000','2024-12-12 12:01:07.049',0),('63b884c4bd09ecf55908440fc849e619','luka_zielone_swiatlo_0017_Warstwa-8_0010_Bez-nazwy-1-â-Odzyskano_0026_Warstwa-16-500x250-1','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734004764/luka_zielone_swiatlo_0017_Warstwa-8_0010_Bez-nazwy-1-%C3%A2-Odzyskano_0026_Warstwa-16-500x250-1.jpg','/home/host797681/labguy-server/public/uploads/images/luka_zielone_swiatlo_0017_Warstwa-8_0010_Bez-nazwy-1-â-Odzyskano_0026_Warstwa-16-500x250-1.jpeg',NULL,'jpg',186393,'',2160,1080,'2024-12-12 11:59:24.000','2024-12-12 11:59:25.486',0),('6579bfd31bce3b2f032ae98546d8862e','20230622_152014-1152x1536','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/20230622_152014-1152x1536.jpg','/home/host797681/labguy-server/public/uploads/images/20230622_152014-1152x1536.jpeg','20230622_152014-1152x1536','jpg',391199,'',1620,2160,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.193',NULL),('66771590eb013cba15f518cd7d79abea','Screenshot_from_2024-12-12_13-02-01','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734005420/Screenshot_from_2024-12-12_13-02-01.jpg','/home/host797681/labguy-server/public/uploads/images/Screenshot_from_2024-12-12_13-02-01.jpeg','Screenshot_from_2024-12-12_13-02-01','jpg',141307,'',1834,1324,'2024-12-12 12:02:35.000','2024-12-12 12:10:41.441',1),('66f864f4955d122a8624a0ae77ac2e1c','w788-jakubtrz-scaled','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734004866/w788-jakubtrz-scaled.jpg','/home/host797681/labguy-server/public/uploads/images/w788-jakubtrz-scaled.jpeg','w788-jakubtrz-scaled','jpg',311216,'',1728,2160,'2024-12-12 12:01:06.000','2024-12-12 12:01:07.226',0),('6fe064d5900fbd19604831eb27cbe3bf','2170_DSF6428_jakubkanna-1-1536x1024','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2170_DSF6428_jakubkanna-1-1536x1024.jpg','/home/host797681/labguy-server/public/uploads/images/2170_DSF6428_jakubkanna-1-1536x1024.jpeg','2170_DSF6428_jakubkanna-1-1536x1024','jpg',138800,'',2160,1440,'2024-12-12 10:13:54.000','2024-12-12 10:13:54.996',NULL),('721c03ecac59669b7ad85b0bc3690691','luka_zielone_swiatlo_0017_Warstwa-8_0006_Bez-nazwy-1-â-Odzyskano_0000_Warstwa-42-1080x540-1','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734004764/luka_zielone_swiatlo_0017_Warstwa-8_0006_Bez-nazwy-1-%C3%A2-Odzyskano_0000_Warstwa-42-1080x540-1.jpg','/home/host797681/labguy-server/public/uploads/images/luka_zielone_swiatlo_0017_Warstwa-8_0006_Bez-nazwy-1-â-Odzyskano_0000_Warstwa-42-1080x540-1.jpeg',NULL,'jpg',127095,'',2160,1080,'2024-12-12 11:59:24.000','2024-12-12 11:59:25.315',0),('7ea1b0997ef069b251f35515e2391c14','2189_DSF6590_jakubkanna-1536x1024','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2189_DSF6590_jakubkanna-1536x1024.jpg','/home/host797681/labguy-server/public/uploads/images/2189_DSF6590_jakubkanna-1536x1024.jpeg','2189_DSF6590_jakubkanna-1536x1024','jpg',152081,'',2160,1440,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.477',NULL),('80228e46e6ea733a89bc77a3a5910a45','2196_DSF6625_jakubkanna-1536x864','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2196_DSF6625_jakubkanna-1536x864.jpg','/home/host797681/labguy-server/public/uploads/images/2196_DSF6625_jakubkanna-1536x864.jpeg','2196_DSF6625_jakubkanna-1536x864','jpg',192129,'',2160,1215,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.073',NULL),('843eb01eee5f76bcb2ae2171b61185b0','2223_DSF6781_jakubkanna-819x1024','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2223_DSF6781_jakubkanna-819x1024.jpg','/home/host797681/labguy-server/public/uploads/images/2223_DSF6781_jakubkanna-819x1024.jpeg','2223_DSF6781_jakubkanna-819x1024','jpg',213017,'',1728,2160,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.104',NULL),('881e7797c4c93b90e28c08ec5eb0ff4b','2209_DSF6765_jakubkanna-1536x1024','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2209_DSF6765_jakubkanna-1536x1024.jpg','/home/host797681/labguy-server/public/uploads/images/2209_DSF6765_jakubkanna-1536x1024.jpeg','2209_DSF6765_jakubkanna-1536x1024','jpg',220865,'',2160,1440,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.176',NULL),('8930a8af68b7b0ed9ec82a12adb0a171','2197_DSF6633_jakubkanna-1-1536x1024','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2197_DSF6633_jakubkanna-1-1536x1024.jpg','/home/host797681/labguy-server/public/uploads/images/2197_DSF6633_jakubkanna-1-1536x1024.jpeg','2197_DSF6633_jakubkanna-1-1536x1024','jpg',271773,'',2160,1440,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.236',NULL),('8931919a47f26edc0996c0f2915e5c88','2224_DSF6476_jakubkanna-2048x1152','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2224_DSF6476_jakubkanna-2048x1152.jpg','/home/host797681/labguy-server/public/uploads/images/2224_DSF6476_jakubkanna-2048x1152.jpeg','2224_DSF6476_jakubkanna-2048x1152','jpg',129600,'',2160,1215,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.201',NULL),('89691312c7e2d42020a388aa4f54b04e','DSF8713','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734004867/DSF8713.jpg','/home/host797681/labguy-server/public/uploads/images/DSF8713.jpeg','DSF8713','jpg',575877,'',2160,1440,'2024-12-12 12:01:07.000','2024-12-12 12:01:09.114',0),('8aeb073010501b475f672c2858c794a1','luka_zielone_swiatlo_0017_Warstwa-8_0001_Bez-nazwy-1-â-Odzyskano_0007_Warstwa-35-1080x540-1','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734004764/luka_zielone_swiatlo_0017_Warstwa-8_0001_Bez-nazwy-1-%C3%A2-Odzyskano_0007_Warstwa-35-1080x540-1.jpg','/home/host797681/labguy-server/public/uploads/images/luka_zielone_swiatlo_0017_Warstwa-8_0001_Bez-nazwy-1-â-Odzyskano_0007_Warstwa-35-1080x540-1.jpeg',NULL,'jpg',30807,'',2160,1080,'2024-12-12 11:59:24.000','2024-12-12 11:59:25.300',0),('8c355f4077b237f25a55e16fdc897e69','toofasttolast_16x9','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/toofasttolast_16x9.jpg','/home/host797681/labguy-server/public/uploads/images/toofasttolast_16x9.jpeg','toofasttolast_16x9','jpg',132207,'',2160,1215,'2024-12-12 10:13:54.000','2024-12-12 10:13:54.823',NULL),('921c222657e9275e815a521b5afe64ce','2212_DSF6774_jakubkanna-2048x1365','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734006341/2212_DSF6774_jakubkanna-2048x1365.jpg','/home/host797681/labguy-server/public/uploads/images/2212_DSF6774_jakubkanna-2048x1365.jpeg','2212_DSF6774_jakubkanna-2048x1365','jpg',175502,'',2048,1365,'2024-12-12 10:13:54.000','2024-12-12 12:35:37.320',0),('9496ca5cd836b36c668d66923e4d3738','Screenshot-2023-05-31-at-13.01.53','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/Screenshot-2023-05-31-at-13.01.53.jpg','/home/host797681/labguy-server/public/uploads/images/Screenshot-2023-05-31-at-13.01.53.jpeg','Screenshot-2023-05-31-at-13.01.53','jpg',212030,'',2160,1197,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.189',NULL),('9571830ee28bd2e8a4f8882b5942a2c4','2188_DSF6582_jakubkanna-1536x1024','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2188_DSF6582_jakubkanna-1536x1024.jpg','/home/host797681/labguy-server/public/uploads/images/2188_DSF6582_jakubkanna-1536x1024.jpeg','2188_DSF6582_jakubkanna-1536x1024','jpg',204592,'',2160,1440,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.372',NULL),('95d738b3544a6d67ddf70c3999ab5004','DSF4080_JAKUBTRZ-2048x1365','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733999133/DSF4080_JAKUBTRZ-2048x1365.jpg','/home/host797681/labguy-server/public/uploads/images/DSF4080_JAKUBTRZ-2048x1365.jpeg','DSF4080_JAKUBTRZ-2048x1365','jpg',285931,'',2160,1440,'2024-12-12 10:25:33.000','2024-12-12 10:25:34.564',NULL),('99c126fba8f12a5cebb779a4f1e4a4ad','Screenshot-2023-07-02-at-14.08.58','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/Screenshot-2023-07-02-at-14.08.58.jpg','/home/host797681/labguy-server/public/uploads/images/Screenshot-2023-07-02-at-14.08.58.jpeg','Screenshot-2023-07-02-at-14.08.58','jpg',203890,'',2160,1216,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.209',NULL),('aa30bfa6e8363664c49b09305aa39e8d','2207_DSF6746_jakubkanna-1536x1024','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2207_DSF6746_jakubkanna-1536x1024.jpg','/home/host797681/labguy-server/public/uploads/images/2207_DSF6746_jakubkanna-1536x1024.jpeg','2207_DSF6746_jakubkanna-1536x1024','jpg',203805,'',2160,1440,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.197',NULL),('aec99661256aba0a65dc493a2c6a023d','luka_zielone_swiatlo_0017_Warstwa-8_0011_Bez-nazwy-1-â-Odzyskano_0025_Warstwa-17-500x250-1','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734004764/luka_zielone_swiatlo_0017_Warstwa-8_0011_Bez-nazwy-1-%C3%A2-Odzyskano_0025_Warstwa-17-500x250-1.jpg','/home/host797681/labguy-server/public/uploads/images/luka_zielone_swiatlo_0017_Warstwa-8_0011_Bez-nazwy-1-â-Odzyskano_0025_Warstwa-17-500x250-1.jpeg',NULL,'jpg',95584,'',2160,1080,'2024-12-12 11:59:24.000','2024-12-12 11:59:25.165',0),('aed9210d70dbc15da5c77a5640aa28fc','luka_zielone_swiatlo_0017_Warstwa-8_0004_Bez-nazwy-1-â-Odzyskano_0002_Warstwa-40-1080x540-1','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734004764/luka_zielone_swiatlo_0017_Warstwa-8_0004_Bez-nazwy-1-%C3%A2-Odzyskano_0002_Warstwa-40-1080x540-1.jpg','/home/host797681/labguy-server/public/uploads/images/luka_zielone_swiatlo_0017_Warstwa-8_0004_Bez-nazwy-1-â-Odzyskano_0002_Warstwa-40-1080x540-1.jpeg',NULL,'jpg',72091,'',2160,1080,'2024-12-12 11:59:24.000','2024-12-12 11:59:25.062',1),('af1ac644daab7d9db73959161549925a','2210_DSF6770_jakubkanna-1536x1024','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734006341/2210_DSF6770_jakubkanna-1536x1024.jpg','/home/host797681/labguy-server/public/uploads/images/2210_DSF6770_jakubkanna-1536x1024.jpeg','2210_DSF6770_jakubkanna-1536x1024','jpg',121352,'',1536,1024,'2024-12-12 10:13:54.000','2024-12-12 12:25:42.262',0),('b0639d85931b4039bbc3f0b0073f55ce','luka_zielone_swiatlo_0017_Warstwa-8_0007_luka_zielone_swiatlo_0017_Warstwa-8-1080x540-1','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734004764/luka_zielone_swiatlo_0017_Warstwa-8_0007_luka_zielone_swiatlo_0017_Warstwa-8-1080x540-1.jpg','/home/host797681/labguy-server/public/uploads/images/luka_zielone_swiatlo_0017_Warstwa-8_0007_luka_zielone_swiatlo_0017_Warstwa-8-1080x540-1.jpeg','luka_zielone_swiatlo_0017_Warstwa-8_0007_luka_zielone_swiatlo_0017_Warstwa-8-1080x540-1','jpg',41985,'',2160,1080,'2024-12-12 11:59:24.000','2024-12-12 11:59:25.045',0),('b1ca0665f1c45c2fe145b9e0a30c6d80','2116_DSF6611_jakubkanna-1536x1024','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2116_DSF6611_jakubkanna-1536x1024.jpg','/home/host797681/labguy-server/public/uploads/images/2116_DSF6611_jakubkanna-1536x1024.jpeg','2116_DSF6611_jakubkanna-1536x1024','jpg',238924,'',2160,1440,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.399',NULL),('b4d8fac752293a63262cea265346c2ba','IMG_8134-scaled_(1)','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/IMG_8134-scaled_%281%29.jpg','/home/host797681/labguy-server/public/uploads/images/IMG_8134-scaled_(1).jpeg','IMG_8134-scaled_(1)','jpg',408144,'',1620,2160,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.140',NULL),('b75394f21cd39bea7a1360c8124d128b','DSF4041_JAKUBTRZ','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733999133/DSF4041_JAKUBTRZ.jpg','/home/host797681/labguy-server/public/uploads/images/DSF4041_JAKUBTRZ.jpeg','DSF4041_JAKUBTRZ','jpg',284931,'',1728,2160,'2024-12-12 10:25:33.000','2024-12-12 10:25:34.280',NULL),('c41cf281a2245013023ff2cce311b6ea','DSC1034-scaled','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733999133/DSC1034-scaled.jpg','/home/host797681/labguy-server/public/uploads/images/DSC1034-scaled.jpeg','DSC1034-scaled','jpg',263413,'',1440,2160,'2024-12-12 10:25:33.000','2024-12-12 10:25:34.281',NULL),('c4cb7cbc723e9ae4933226365ed4177e','2190_DSF6592_jakubkanna-1536x1024','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2190_DSF6592_jakubkanna-1536x1024.jpg','/home/host797681/labguy-server/public/uploads/images/2190_DSF6592_jakubkanna-1536x1024.jpeg','2190_DSF6592_jakubkanna-1536x1024','jpg',183740,'',2160,1440,'2024-12-12 10:13:54.000','2024-12-12 10:13:54.960',NULL),('c7be087d3ba4e17641597f85d76cb39f','20230622_154901-scaled','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/20230622_154901-scaled.jpg','/home/host797681/labguy-server/public/uploads/images/20230622_154901-scaled.jpeg','20230622_154901-scaled','jpg',464007,'',1620,2160,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.370',NULL),('ca4ae2132d2ceda06c1810f3c2a546b5','luka_zielone_swiatlo_0017_Warstwa-8_0009_Bez-nazwy-1_0000_Warstwa-2-500x250-1','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1734004764/luka_zielone_swiatlo_0017_Warstwa-8_0009_Bez-nazwy-1_0000_Warstwa-2-500x250-1.jpg','/home/host797681/labguy-server/public/uploads/images/luka_zielone_swiatlo_0017_Warstwa-8_0009_Bez-nazwy-1_0000_Warstwa-2-500x250-1.jpeg','luka_zielone_swiatlo_0017_Warstwa-8_0009_Bez-nazwy-1_0000_Warstwa-2-500x250-1','jpg',69753,'',2160,1080,'2024-12-12 11:59:24.000','2024-12-12 11:59:25.241',0),('d2ed4e725bac2ba85819a13c1ac300cb','2104_DSF6529_jakubkanna-1536x1024','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2104_DSF6529_jakubkanna-1536x1024.jpg','/home/host797681/labguy-server/public/uploads/images/2104_DSF6529_jakubkanna-1536x1024.jpeg','2104_DSF6529_jakubkanna-1536x1024','jpg',209526,'',2160,1440,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.067',NULL),('dd1c0979a8015e2955641cc2717f3e7c','G4A7766_krzeslo-scaled','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733999133/G4A7766_krzeslo-scaled.jpg','/home/host797681/labguy-server/public/uploads/images/G4A7766_krzeslo-scaled.jpeg','G4A7766_krzeslo-scaled','jpg',229011,'',1620,2160,'2024-12-12 10:25:33.000','2024-12-12 10:25:34.244',NULL),('ddee6872d534be70499bd2e4af186c01','2191_DSF6595_jakubkanna-2048x1365','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2191_DSF6595_jakubkanna-2048x1365.jpg','/home/host797681/labguy-server/public/uploads/images/2191_DSF6595_jakubkanna-2048x1365.jpeg','2191_DSF6595_jakubkanna-2048x1365','jpg',151146,'',2160,1440,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.031',NULL),('e417b1a8de2c9cbde497370c5c1ae99a','w788-2048x1152','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733999133/w788-2048x1152.jpg','/home/host797681/labguy-server/public/uploads/images/w788-2048x1152.jpeg','w788-2048x1152','jpg',651454,'',2160,1215,'2024-12-12 10:25:33.000','2024-12-12 12:01:07.423',1),('efac9b3cceaf375dc3a76718a21ebe1b','20230622_152742-scaled_(1)','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/20230622_152742-scaled_%281%29.jpg','/home/host797681/labguy-server/public/uploads/images/20230622_152742-scaled_(1).jpeg','20230622_152742-scaled_(1)','jpg',291911,'',1620,2160,'2024-12-12 10:13:54.000','2024-12-12 10:13:55.308',NULL),('fe89634152586fa36ef0ecd3dcbe4e37','autostrada_insta-scaled','IMAGE','https://res.cloudinary.com/dzsehmvrr/image/upload/v1733999133/autostrada_insta-scaled.jpg','/home/host797681/labguy-server/public/uploads/images/autostrada_insta-scaled.jpeg','autostrada_insta-scaled','jpg',512436,'',1440,2160,'2024-12-12 10:25:33.000','2024-12-12 10:25:34.424',NULL);
/*!40000 ALTER TABLE `ImageRef` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`content`)),
  `generalId` int(11) NOT NULL,
  `authorEmail` varchar(191) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Post_generalId_key` (`generalId`),
  KEY `Post_authorEmail_fkey` (`authorEmail`),
  CONSTRAINT `Post_authorEmail_fkey` FOREIGN KEY (`authorEmail`) REFERENCES `User` (`email`) ON UPDATE CASCADE,
  CONSTRAINT `Post_generalId_fkey` FOREIGN KEY (`generalId`) REFERENCES `GeneralSection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
INSERT INTO `Post` VALUES (1,'[{\"text\":\"<div id=\\\"lipsum\\\">\\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget rutrum enim. Vestibulum ut risus lacus. Duis elementum consequat magna, ut venenatis ante aliquam quis. Pellentesque at ante pretium ex commodo accumsan ut sed risus. Nullam et lacus rutrum, maximus mi eget, suscipit leo. Fusce eleifend consectetur suscipit. Curabitur pharetra imperdiet diam sit amet rhoncus. In posuere ante eget nisi mollis, vel feugiat ex semper. Donec vestibulum justo nec nulla luctus, sit amet dapibus nunc condimentum. Cras mollis arcu auctor, facilisis dolor non, efficitur mauris. Proin molestie diam vitae sapien malesuada tempus. Aliquam fringilla consequat accumsan. Sed ut aliquam mauris, finibus tempor velit.</p>\\n<p>Nulla vel suscipit purus, vitae rhoncus neque. Duis sed porta eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nulla ex, eleifend et ornare eget, suscipit eget ante. Etiam quis iaculis mauris. Aenean urna orci, varius non nulla ac, sodales blandit nunc. Aliquam sit amet libero blandit, viverra elit aliquet, hendrerit est. Sed posuere mi sed nisi ullamcorper, at suscipit leo vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi suscipit elementum sem ultricies efficitur. Aenean laoreet cursus tortor id placerat.</p>\\n<p>Vestibulum tincidunt ante at lacinia blandit. Donec posuere sapien quam, vel eleifend nulla porta et. Ut vel enim ipsum. In eget ligula a nisi iaculis pretium. Nunc vitae tempus ante. Donec elementum, felis ac porta condimentum, neque augue egestas lacus, at ultricies nisi tortor vel mauris. Nulla gravida mauris velit, eu auctor dolor facilisis nec. Aenean posuere nec ante eget ultrices. Cras a maximus ipsum. Vivamus mattis, ante non elementum tincidunt, diam risus facilisis leo, quis convallis justo est quis diam. Phasellus imperdiet enim elit, quis viverra ante aliquet et. Ut tincidunt, ipsum ut faucibus facilisis, sem nibh euismod diam, nec lacinia dui lacus vitae velit. Nullam porta mauris id gravida tincidunt.</p>\\n<p>Integer quis est neque. Aliquam venenatis odio quis augue porta, nec aliquet elit mollis. Mauris dignissim lorem quam. Nam dignissim enim vitae nisl viverra, at dictum turpis eleifend. Nulla eu nisi id lacus dignissim fermentum a at lectus. Nam eleifend eu magna a sodales. Nulla facilisi. Curabitur ut blandit arcu. Nam scelerisque vel magna nec varius. Ut scelerisque odio lobortis neque laoreet, sit amet posuere odio interdum. Suspendisse rutrum augue vel lacus cursus accumsan.</p>\\n<p>In in metus vitae dolor pretium aliquam a quis sapien. Nunc quis est ut leo interdum consequat eget eget justo. Nam enim lacus, suscipit in venenatis eu, ultricies sed ante. Donec gravida cursus metus in volutpat. Aenean eu nunc id mi feugiat hendrerit vel et dui. Vivamus rutrum sit amet dolor eu placerat. Aenean ante justo, pellentesque ut consequat eget, dignissim sed lectus. In eleifend neque ligula, sit amet euismod sapien egestas eget. Curabitur id dapibus sapien. Phasellus tempor tortor vel nulla tempor mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sodales viverra arcu, et aliquet justo. Sed ac lorem ligula. Donec sed enim ac nisi varius consectetur. Nullam porttitor ligula diam, in cursus diam consectetur at. Vivamus eu nisi augue.</p>\\n<p>Nunc tincidunt, lacus sit amet dictum suscipit, tortor nisi feugiat magna, vel egestas nisl lorem non lorem. Nulla interdum arcu id erat efficitur imperdiet. Cras finibus nisl quis mi vestibulum, eleifend volutpat est commodo. Cras pretium est nisl, imperdiet varius dui ornare eget. Phasellus tincidunt velit quam, vitae pellentesque mi consectetur sit amet. Donec sit amet congue ex. Fusce finibus ornare ultrices. Fusce commodo ullamcorper quam vitae scelerisque. Nunc vel arcu augue.</p>\\n<p>Cras accumsan ac justo sit amet vulputate. Praesent bibendum in arcu vitae volutpat. Proin facilisis erat neque, eget semper risus finibus ac. Pellentesque imperdiet, elit congue mollis semper, magna mi sagittis turpis, in commodo magna lorem vitae felis. Donec aliquam ante in odio blandit venenatis. Nam iaculis sed sem id faucibus. Proin et consequat erat, in semper felis. Sed sed nisl purus. Sed ut magna risus. Mauris a efficitur nulla. Morbi posuere diam lectus, sed tincidunt mauris pretium eu. Phasellus volutpat semper dui nec dignissim. Nulla facilisi. Aenean vel dolor nisi. Suspendisse vel lectus varius felis finibus cursus ac eu odio. In hac habitasse platea dictumst.</p>\\n<p>Vestibulum sed leo sed augue efficitur aliquet. Praesent magna quam, elementum at placerat nec, varius sit amet metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum a bibendum ex. Pellentesque finibus ullamcorper felis consectetur lobortis. Ut eu ligula ac lacus egestas euismod. Aenean lacus metus, aliquam sit amet suscipit sed, molestie sit amet risus. Nullam odio magna, faucibus nec dui at, semper posuere ligula.</p>\\n<p>Nunc vitae ante orci. Morbi dictum, nunc eu egestas elementum, mauris arcu semper nulla, sed vehicula mauris felis a massa. Sed tortor elit, interdum sit amet consectetur nec, lobortis vel libero. Aliquam suscipit neque est, in ullamcorper ex sagittis vel. Sed non ex mauris. Nunc dictum vulputate sem ac accumsan. Maecenas rutrum porta tortor, a posuere odio hendrerit vitae. Sed tempor tellus enim, a bibendum lacus luctus nec. Sed id sem quam. Vivamus sed lorem tincidunt tellus volutpat malesuada eget a tellus.</p>\\n<p>Curabitur sed tellus vestibulum, viverra tellus eget, malesuada lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer venenatis malesuada volutpat. Praesent vestibulum ipsum et mi ultrices rhoncus. Vivamus tempus justo nisi, at sagittis odio viverra et. Integer tincidunt facilisis nisl et faucibus. Fusce eget sapien mauris. Curabitur vel commodo libero. Sed accumsan ac lorem sollicitudin porttitor. Etiam ac erat quis tortor commodo aliquam. Nullam maximus sodales magna, nec egestas sem laoreet sit amet. Cras ultricies molestie porta. Pellentesque ac est ante. Donec mollis erat quis ipsum aliquam tincidunt.</p>\\n<p>Proin tempor magna ligula, in mattis odio sagittis id. Aliquam lectus turpis, convallis ac arcu ut, interdum rutrum odio. Suspendisse tristique odio in metus mattis, ut eleifend odio egestas. Ut congue nec ante ut mollis. Proin in turpis nec metus porttitor vehicula. Pellentesque fringilla velit sed volutpat commodo. Vivamus pulvinar nulla enim, eu tincidunt dolor scelerisque in. Praesent nibh diam, sagittis id ex non, volutpat commodo metus. Curabitur mollis, erat quis tempor placerat, augue nunc sagittis metus, ut auctor enim ex egestas eros. Donec purus ligula, pulvinar non purus ac, venenatis fermentum sapien.</p>\\n<p>Aliquam quis porttitor dui, nec volutpat neque. Maecenas eu nulla id lectus imperdiet elementum id at mi. Sed vel urna ullamcorper massa luctus iaculis. Aliquam sollicitudin lectus cursus urna faucibus dapibus. Nulla sit amet feugiat nibh. Aenean lacinia turpis porta odio tincidunt, a consequat eros placerat. Proin fermentum, sapien ac volutpat congue, diam risus rhoncus lacus, eu maximus est leo ut dolor. Nullam a justo est. Fusce ultrices tempor varius. Integer velit nulla, tempor at ligula et, facilisis eleifend tellus. Aenean dictum tortor est, eu imperdiet ex fermentum sed. Pellentesque in ultricies urna. Suspendisse ultrices neque ac euismod aliquam.</p>\\n<p>Donec porttitor vulputate sapien eget iaculis. Nunc eget velit consequat purus iaculis vestibulum. Nunc tempus nunc vitae mauris imperdiet, id elementum nulla tincidunt. Aenean condimentum mattis gravida. Aliquam mollis nisl vel ultrices feugiat. Donec rutrum, quam sit amet suscipit lacinia, ligula purus eleifend ante, eget accumsan libero est in nulla. Sed gravida, arcu eget semper vestibulum, nibh neque laoreet sapien, eget tempor augue justo id eros. Cras eu lobortis diam.</p>\\n<p>Pellentesque a elit sapien. Sed commodo odio cursus sapien fermentum, sed luctus eros viverra. Integer nunc mauris, pellentesque a ultricies nec, aliquet in lacus. In in elementum eros, ut condimentum sem. Mauris orci augue, efficitur vel turpis vitae, finibus sodales magna. Ut scelerisque tincidunt ultricies. Maecenas placerat, ante ut facilisis dapibus, libero nibh feugiat ipsum, sed hendrerit odio nisi eget augue. Aenean aliquet posuere tortor. Aenean hendrerit, est quis ornare malesuada, sem arcu semper libero, et vestibulum nunc quam ut tortor. Nullam arcu neque, tempor nec porta id, efficitur nec risus.</p>\\n<p>Nullam laoreet arcu velit, eu porta nunc suscipit ut. Donec eget rhoncus lacus. In eu facilisis lorem, eu lobortis justo. Vivamus bibendum augue ipsum, ac imperdiet augue aliquam quis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse pulvinar turpis ac facilisis vehicula. Aenean interdum mauris nisl, non venenatis felis varius in. Integer euismod semper velit, vitae pharetra urna. Nulla at sodales magna. Nulla eget convallis nunc. In elementum sem vitae mauris sodales, sit amet volutpat erat porttitor. Morbi vitae pharetra eros, eu condimentum turpis. Donec at ex ac felis laoreet efficitur. Pellentesque pellentesque ipsum in sodales vestibulum.</p>\\n<p>Quisque vitae ipsum vitae mauris feugiat consectetur id ac nunc. Proin ac urna eleifend, consectetur urna at, consequat leo. Donec accumsan ex ac mauris scelerisque, a vehicula augue viverra. Pellentesque et accumsan urna, a tristique dui. Quisque lectus massa, porttitor non sodales ut, feugiat non nunc. Nam fermentum odio et felis posuere aliquet. Curabitur semper pharetra hendrerit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin in orci eleifend, volutpat mi vel, aliquet sem. Etiam eu tempus dolor, sit amet placerat felis. Curabitur eu lacus mauris.</p>\\n<p>Praesent semper mi vitae consequat pellentesque. Cras rutrum magna vestibulum, rhoncus lectus quis, finibus lorem. Mauris at tortor a massa commodo fringilla. Nullam eleifend convallis quam in vulputate. Sed eu vulputate risus. Proin sed fermentum lacus, at luctus neque. Donec sollicitudin dolor metus, sed luctus nisi venenatis eu. Curabitur efficitur velit risus, vitae aliquet diam convallis vel. Fusce a fringilla ligula, ac consectetur libero. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam et nulla vel eros pretium eleifend. In laoreet nisl et eleifend imperdiet. Aenean lobortis lectus urna, quis dictum eros molestie cursus.</p>\\n<p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras aliquam, ipsum a tristique elementum, nisi tellus facilisis nisi, et faucibus neque ex quis risus. Vestibulum finibus nibh vitae auctor feugiat. Ut justo justo, lobortis et diam vel, placerat venenatis sapien. Etiam scelerisque mauris non lectus congue aliquet. Maecenas sit amet placerat mi. Aenean faucibus elit et mauris pharetra tristique. Sed in nunc vitae ipsum fringilla pretium. Morbi venenatis sem dolor, id tempus lacus pellentesque at. Morbi eros turpis, varius vitae diam nec, auctor tincidunt quam. Vestibulum laoreet leo metus. Vestibulum in commodo nibh, sed imperdiet velit. Vivamus bibendum felis ac leo bibendum, ac dictum felis cursus.</p>\\n<p>Pellentesque magna nisi, volutpat quis finibus sed, venenatis eu purus. Nulla varius vel enim non tristique. Vestibulum leo nisi, fermentum vitae dui id, elementum porttitor nibh. Cras ullamcorper cursus pretium. Nam in libero vitae ex ultrices dapibus. Donec in velit a risus rutrum lobortis eu in leo. Fusce nec erat ultrices, consectetur orci non, aliquam dolor. Nam tristique vel eros sit amet aliquam. Etiam scelerisque metus sit amet volutpat rhoncus. Duis accumsan fringilla lorem quis bibendum. Nunc tempor vestibulum nisl scelerisque mattis. Integer malesuada, ipsum id accumsan blandit, magna augue semper massa, at finibus felis risus in sem. Sed tincidunt laoreet urna, tempus blandit purus dapibus in.</p>\\n<p>Morbi nec porta felis. Aliquam finibus arcu vitae posuere pretium. Suspendisse maximus maximus gravida. Phasellus turpis justo, rhoncus vitae felis id, lacinia maximus ex. Nunc nisl lacus, sollicitudin at aliquam vel, laoreet vitae nibh. Ut efficitur varius purus ut vestibulum. Quisque vulputate ante quis ultrices volutpat. Etiam rhoncus augue vel quam ultricies, non eleifend arcu euismod. Aliquam volutpat blandit posuere. Proin sed tincidunt nisl. Nunc ac ante tempus, pretium dui semper, hendrerit leo. Sed eget nisi felis. Suspendisse interdum odio non bibendum eleifend.</p>\\n<p>Nam a consectetur neque. Phasellus id nulla tempus, feugiat ante at, tincidunt ligula. Curabitur vestibulum ex at enim interdum, nec ultricies ex tempor. Nunc feugiat ornare convallis. Phasellus rhoncus mauris erat, a fermentum lectus lobortis id. Nunc semper lorem eu felis feugiat, eu finibus felis ullamcorper. Donec lacus est, laoreet et cursus nec, mattis id nisl. Donec id pretium nisl, sit amet maximus massa.</p>\\n<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam hendrerit posuere purus. Nullam mi ipsum, auctor a vestibulum ac, lobortis ac velit. Cras nunc nunc, faucibus sed porttitor eu, consectetur eget ante. Etiam ut ligula quam. Etiam sollicitudin placerat magna sit amet porta. Phasellus id nulla a turpis malesuada egestas eget eu sem.</p>\\n</div>\\n<div id=\\\"generated\\\">Generated 22 paragraphs, 1978 words, 13194 bytes of&nbsp;<a title=\\\"Lorem Ipsum\\\" href=\\\"https://www.lipsum.com/\\\">Lorem Ipsum</a></div>\"},{\"images\":[{\"etag\":\"b56c2b37f0e3b6172757972a330402ed\",\"public_id\":\"great-mountains_jakubkanna\",\"mediaType\":\"IMAGE\",\"cld_url\":\"https://res.cloudinary.com/dzsehmvrr/image/upload/v1724922413/great-mountains_jakubkanna.jpg\",\"path\":\"/home/j/Sites/labguy-server/prisma/assets/great-mountains_jakubkanna.jpg\",\"filename\":\"great-mountains_jakubkanna\",\"format\":\"jpg\",\"bytes\":3396023,\"description\":\"\",\"width\":6000,\"height\":3375,\"createdAt\":\"2024-08-29T09:06:53.000Z\",\"updatedAt\":\"2024-10-30T12:18:33.081Z\"}]},{\"images\":[{\"etag\":\"ffb1208f933e1d459693e91a6c909376\",\"public_id\":\"rsz_h801_93_747\",\"mediaType\":\"IMAGE\",\"cld_url\":\"https://res.cloudinary.com/dzsehmvrr/image/upload/v1731015859/rsz_h801_93_747.jpg\",\"path\":\"/home/host797681/labguy-server/public/uploads/images/rsz_h801_93_747.jpeg\",\"filename\":\"rsz_h801_93_747\",\"format\":\"jpg\",\"bytes\":479096,\"description\":\"\",\"width\":2160,\"height\":1441,\"createdAt\":\"2024-11-07T21:44:19.000Z\",\"updatedAt\":\"2024-11-07T21:44:19.788Z\"}]}]',17,'hello.jakubkanna@gmail.com');
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Preferences`
--

DROP TABLE IF EXISTS `Preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Preferences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `artists_name` varchar(191) NOT NULL DEFAULT 'Artist''s Name',
  `homepage_heading` varchar(191) DEFAULT 'Homepage',
  `homepage_subheading` varchar(191) DEFAULT 'Sub-Heading',
  `homepage_media` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`homepage_media`)),
  `homepage_urls` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`homepage_urls`)),
  `enable_dashboard_darkmode` tinyint(1) NOT NULL DEFAULT 0,
  `enable_portfolio_pdf` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Preferences`
--

LOCK TABLES `Preferences` WRITE;
/*!40000 ALTER TABLE `Preferences` DISABLE KEYS */;
INSERT INTO `Preferences` VALUES (1,'JAKUB KANNA','Homepage','Sub-Heading','{\"etag\":\"ffb1208f933e1d459693e91a6c909376\",\"public_id\":\"rsz_h801_93_747\",\"mediaType\":\"IMAGE\",\"cld_url\":\"https://res.cloudinary.com/dzsehmvrr/image/upload/v1731015859/rsz_h801_93_747.jpg\",\"path\":\"/home/host797681/labguy-server/public/uploads/images/rsz_h801_93_747.jpeg\",\"filename\":\"rsz_h801_93_747\",\"format\":\"jpg\",\"bytes\":479096,\"description\":\"\",\"width\":2160,\"height\":1441,\"createdAt\":\"2024-11-07T21:44:19.000Z\",\"updatedAt\":\"2024-11-07T21:44:19.788Z\"}','[{\"url\":\"http://localhost:5173/\",\"title\":\"First one\"},{\"url\":\"http://localhost:5173/\",\"title\":\"aaa\"}]',1,1,'2024-10-30 12:18:33.238','2024-10-30 12:18:33.238');
/*!40000 ALTER TABLE `Preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Profile`
--

DROP TABLE IF EXISTS `Profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Profile` (
  `picture` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`picture`)),
  `statement` text DEFAULT NULL,
  `additional` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`additional`)),
  `portfolio_pdf_url` varchar(191) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `Profile_userId_key` (`userId`),
  CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Profile`
--

LOCK TABLES `Profile` WRITE;
/*!40000 ALTER TABLE `Profile` DISABLE KEYS */;
INSERT INTO `Profile` VALUES ('null','<h1><em>With dedication for all of those who are brave enough to do things that most see as meaningless.</em></h1>','[{\"html\":\"<h3>Biogram</h3>\\n<p>&ndash; Jakub Kanna; formally Jakub Trzciński.</p>\\n<p>&ndash; Born in 1996 in Mrągowo (North-East of Poland).</p>\\n<p>&ndash; Childhood filled with sport education.</p>\\n<p>&ndash; In 2022 studied at&nbsp;<a href=\\\"https://avu.cz/en\\\" target=\\\"_blank\\\" rel=\\\"noreferrer noopener\\\">Academy of Fine Arts in Prague.</a></p>\\n<p>&ndash; Holds BA in printmaking and continues MA in Intermedia at&nbsp;<a href=\\\"https://uap.edu.pl/\\\" target=\\\"_blank\\\" rel=\\\"noreferrer noopener\\\">University of Arts in Poznan</a></p>\\n<p>&ndash; The most important realisations:&nbsp;<a href=\\\"https://jakubkanna.com/velo-art/\\\" target=\\\"_blank\\\" rel=\\\"noreferrer noopener\\\">Velo-art</a>, Fight or Flight (incoming)</p>\"},{\"html\":\"<h3>Selected Exhibitions</h3>\\n<table style=\\\"border-collapse: collapse; width: 100.039%; height: 108.324px;\\\" border=\\\"1\\\"><colgroup><col style=\\\"width: 33.3673%;\\\"><col style=\\\"width: 33.3673%;\\\"><col style=\\\"width: 16.6279%;\\\"><col style=\\\"width: 16.6279%;\\\"></colgroup>\\n<tbody>\\n<tr style=\\\"height: 36.108px;\\\">\\n<td>\\n<pre>Title</pre>\\n</td>\\n<td>\\n<pre>Venue</pre>\\n</td>\\n<td>\\n<pre>Year</pre>\\n</td>\\n<td>\\n<pre>image_publicid</pre>\\n</td>\\n</tr>\\n<tr style=\\\"height: 36.108px;\\\">\\n<td>aaaa</td>\\n<td>bbb</td>\\n<td>1996</td>\\n<td>construction-team-pose-stockcake</td>\\n</tr>\\n<tr>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n</tr>\\n<tr>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n</tr>\\n<tr>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n</tr>\\n<tr>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n</tr>\\n<tr>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n</tr>\\n<tr>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n</tr>\\n<tr>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n</tr>\\n<tr>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n</tr>\\n<tr>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n</tr>\\n<tr>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n</tr>\\n<tr style=\\\"height: 36.108px;\\\">\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n</tr>\\n</tbody>\\n</table>\\n<h3>Selected Workshops &amp; Residencies</h3>\\n<table style=\\\"border-collapse: collapse; width: 100.039%;\\\" border=\\\"1\\\"><colgroup><col style=\\\"width: 33.3803%;\\\"><col style=\\\"width: 33.3803%;\\\"><col style=\\\"width: 16.6343%;\\\"><col style=\\\"width: 16.6343%;\\\"></colgroup>\\n<tbody>\\n<tr>\\n<td>\\n<pre>Title</pre>\\n</td>\\n<td>\\n<pre>Venue</pre>\\n</td>\\n<td>\\n<pre>Year</pre>\\n</td>\\n<td>\\n<pre>image_publicid</pre>\\n</td>\\n</tr>\\n<tr>\\n<td>aaaa</td>\\n<td>bbb</td>\\n<td>1996</td>\\n<td>\\n<p class=\\\"MuiTypography-root MuiTypography-caption MuiTypography-alignCenter MuiTypography-noWrap MuiTypography-paragraph css-byyvvn\\\" aria-label=\\\"1423-vfttfj-ijncd\\\">1423-vfttfj-ijncd</p>\\n</td>\\n</tr>\\n<tr>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n</tr>\\n</tbody>\\n</table>\\n<h3>Others</h3>\\n<table style=\\\"border-collapse: collapse; width: 100.039%; height: 108.324px;\\\" border=\\\"1\\\"><colgroup><col style=\\\"width: 33.3673%;\\\"><col style=\\\"width: 33.3673%;\\\"><col style=\\\"width: 16.7395%;\\\"><col style=\\\"width: 16.5163%;\\\"></colgroup>\\n<tbody>\\n<tr style=\\\"height: 36.108px;\\\">\\n<td>\\n<pre>Title</pre>\\n</td>\\n<td>\\n<pre>Venue</pre>\\n</td>\\n<td>\\n<pre>Year</pre>\\n</td>\\n<td>\\n<pre>image_publicid</pre>\\n</td>\\n</tr>\\n<tr style=\\\"height: 36.108px;\\\">\\n<td>aaaa</td>\\n<td>bbb</td>\\n<td>1996</td>\\n<td>\\n<p class=\\\"MuiTypography-root MuiTypography-caption MuiTypography-alignCenter MuiTypography-noWrap MuiTypography-paragraph css-byyvvn\\\" aria-label=\\\"rsz_h801_93_747\\\">rsz_h801_93_747</p>\\n</td>\\n</tr>\\n<tr style=\\\"height: 36.108px;\\\">\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n<td>&nbsp;</td>\\n</tr>\\n</tbody>\\n</table>\"}]','https://archive.org/download/jakubkanna_PORTFOLIO_2024/jakubkanna_PORTFOLIO_2024.pdf',1);
/*!40000 ALTER TABLE `Profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Project`
--

DROP TABLE IF EXISTS `Project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subtitle` text DEFAULT NULL,
  `start_date` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`start_date`)),
  `end_date` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`end_date`)),
  `text` text DEFAULT NULL,
  `venue` varchar(191) DEFAULT NULL,
  `urls` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`urls`)),
  `media` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`media`)),
  `generalId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Project_generalId_key` (`generalId`),
  CONSTRAINT `Project_generalId_fkey` FOREIGN KEY (`generalId`) REFERENCES `GeneralSection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Project`
--

LOCK TABLES `Project` WRITE;
/*!40000 ALTER TABLE `Project` DISABLE KEYS */;
INSERT INTO `Project` VALUES (12,'First Project Subtitle','{}','null','<p>This is the first project description.</p>','Art Gallery, City Name','null','[]',18);
/*!40000 ALTER TABLE `Project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProjectsOnWorks`
--

DROP TABLE IF EXISTS `ProjectsOnWorks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProjectsOnWorks` (
  `projectId` int(11) NOT NULL,
  `workId` int(11) NOT NULL,
  `fIndex` varchar(191) NOT NULL,
  PRIMARY KEY (`projectId`,`workId`),
  KEY `ProjectsOnWorks_workId_fkey` (`workId`),
  CONSTRAINT `ProjectsOnWorks_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ProjectsOnWorks_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `Work` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProjectsOnWorks`
--

LOCK TABLES `ProjectsOnWorks` WRITE;
/*!40000 ALTER TABLE `ProjectsOnWorks` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProjectsOnWorks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SocialMedia`
--

DROP TABLE IF EXISTS `SocialMedia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SocialMedia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `platform` varchar(191) DEFAULT NULL,
  `profileUrl` varchar(191) DEFAULT NULL,
  `username` varchar(191) DEFAULT NULL,
  `contactId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `SocialMedia_contactId_fkey` (`contactId`),
  CONSTRAINT `SocialMedia_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contact` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SocialMedia`
--

LOCK TABLES `SocialMedia` WRITE;
/*!40000 ALTER TABLE `SocialMedia` DISABLE KEYS */;
INSERT INTO `SocialMedia` VALUES (2,'Instagram','https://www.instagram.com/jakubkanna','jakubkanna',1);
/*!40000 ALTER TABLE `SocialMedia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tag`
--

DROP TABLE IF EXISTS `Tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(191) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Tag_title_key` (`title`),
  KEY `Tag_title_idx` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tag`
--

LOCK TABLES `Tag` WRITE;
/*!40000 ALTER TABLE `Tag` DISABLE KEYS */;
INSERT INTO `Tag` VALUES (2,'default'),(5,'exodus'),(7,'Fight or Flight'),(3,'fightorflight'),(1,'GROUP'),(6,'Looking for funding'),(4,'velo-art');
/*!40000 ALTER TABLE `Tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(191) NOT NULL,
  `hash` varchar(191) NOT NULL,
  `salt` varchar(191) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'hello.jakubkanna@gmail.com','62265e5c352454c85036a67922ed0e443eb17e20accb1e513365fa0ac878c495f9b511101696ffe6e042177524955aee23ca7100c8c592b209152a88fceee60b','9daa173cce2e2f5cbe14e6421fb049fa68025ecf77763f97c17d2d8d4e059798');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VideoRef`
--

DROP TABLE IF EXISTS `VideoRef`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VideoRef` (
  `etag` varchar(191) NOT NULL,
  `mediaType` enum('IMAGE','VIDEO','THREE_D') NOT NULL DEFAULT 'VIDEO',
  `id` varchar(191) DEFAULT NULL,
  `vimeo_url` varchar(191) DEFAULT NULL,
  `sc_url` varchar(191) DEFAULT NULL,
  `yt_url` varchar(191) DEFAULT NULL,
  `title` varchar(191) DEFAULT 'Untitled',
  `duration` varchar(191) DEFAULT NULL,
  `definition` varchar(191) DEFAULT NULL,
  `description` varchar(191),
  `thumbnail` varchar(191) DEFAULT NULL,
  `player_loop` tinyint(1) NOT NULL DEFAULT 1,
  `player_muted` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`etag`),
  UNIQUE KEY `VideoRef_etag_key` (`etag`),
  UNIQUE KEY `VideoRef_vimeo_url_key` (`vimeo_url`),
  UNIQUE KEY `VideoRef_sc_url_key` (`sc_url`),
  UNIQUE KEY `VideoRef_yt_url_key` (`yt_url`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VideoRef`
--

LOCK TABLES `VideoRef` WRITE;
/*!40000 ALTER TABLE `VideoRef` DISABLE KEYS */;
/*!40000 ALTER TABLE `VideoRef` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Work`
--

DROP TABLE IF EXISTS `Work`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Work` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `medium` varchar(191) DEFAULT NULL,
  `dimensions` varchar(191) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `media` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`media`)),
  `generalId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Work_generalId_key` (`generalId`),
  CONSTRAINT `Work_generalId_fkey` FOREIGN KEY (`generalId`) REFERENCES `GeneralSection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Work`
--

LOCK TABLES `Work` WRITE;
/*!40000 ALTER TABLE `Work` DISABLE KEYS */;
INSERT INTO `Work` VALUES (7,'climbing holds made of cherry, 3-axis milling, generative design',NULL,2023,'[{\"etag\":\"275874150de0e5fd33ba45afc158b607\",\"public_id\":\"2239_DSF6902_jakubkanna-2048x1152\",\"mediaType\":\"IMAGE\",\"cld_url\":\"https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2239_DSF6902_jakubkanna-2048x1152.jpg\",\"path\":\"/home/host797681/labguy-server/public/uploads/images/2239_DSF6902_jakubkanna-2048x1152.jpeg\",\"filename\":\"2239_DSF6902_jakubkanna-2048x1152\",\"format\":\"jpg\",\"bytes\":183902,\"description\":\"\",\"width\":2160,\"height\":1215,\"isBright\":null,\"createdAt\":\"2024-12-12T10:13:54.000Z\",\"updatedAt\":\"2024-12-12T10:13:54.922Z\"},{\"etag\":\"80228e46e6ea733a89bc77a3a5910a45\",\"public_id\":\"2196_DSF6625_jakubkanna-1536x864\",\"mediaType\":\"IMAGE\",\"cld_url\":\"https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2196_DSF6625_jakubkanna-1536x864.jpg\",\"path\":\"/home/host797681/labguy-server/public/uploads/images/2196_DSF6625_jakubkanna-1536x864.jpeg\",\"filename\":\"2196_DSF6625_jakubkanna-1536x864\",\"format\":\"jpg\",\"bytes\":192129,\"description\":\"\",\"width\":2160,\"height\":1215,\"isBright\":null,\"createdAt\":\"2024-12-12T10:13:54.000Z\",\"updatedAt\":\"2024-12-12T10:13:55.073Z\"},{\"etag\":\"8930a8af68b7b0ed9ec82a12adb0a171\",\"public_id\":\"2197_DSF6633_jakubkanna-1-1536x1024\",\"mediaType\":\"IMAGE\",\"cld_url\":\"https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2197_DSF6633_jakubkanna-1-1536x1024.jpg\",\"path\":\"/home/host797681/labguy-server/public/uploads/images/2197_DSF6633_jakubkanna-1-1536x1024.jpeg\",\"filename\":\"2197_DSF6633_jakubkanna-1-1536x1024\",\"format\":\"jpg\",\"bytes\":271773,\"description\":\"\",\"width\":2160,\"height\":1440,\"isBright\":null,\"createdAt\":\"2024-12-12T10:13:54.000Z\",\"updatedAt\":\"2024-12-12T10:13:55.236Z\"},{\"etag\":\"47b4d2db9b59653f2f982c535b79d725\",\"public_id\":\"2200_DSF6660_jakubkanna-1536x1024\",\"mediaType\":\"IMAGE\",\"cld_url\":\"https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2200_DSF6660_jakubkanna-1536x1024.jpg\",\"path\":\"/home/host797681/labguy-server/public/uploads/images/2200_DSF6660_jakubkanna-1536x1024.jpeg\",\"filename\":\"2200_DSF6660_jakubkanna-1536x1024\",\"format\":\"jpg\",\"bytes\":278316,\"description\":\"\",\"width\":2160,\"height\":1440,\"isBright\":null,\"createdAt\":\"2024-12-12T10:13:54.000Z\",\"updatedAt\":\"2024-12-12T10:13:55.306Z\"},{\"etag\":\"6053a8ac6594bdfc0ad8a5bf23ffc54e\",\"public_id\":\"2218_DSF6798_jakubkanna-1365x2048\",\"mediaType\":\"IMAGE\",\"cld_url\":\"https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2218_DSF6798_jakubkanna-1365x2048.jpg\",\"path\":\"/home/host797681/labguy-server/public/uploads/images/2218_DSF6798_jakubkanna-1365x2048.jpeg\",\"filename\":\"2218_DSF6798_jakubkanna-1365x2048\",\"format\":\"jpg\",\"bytes\":347944,\"description\":\"\",\"width\":1440,\"height\":2160,\"isBright\":null,\"createdAt\":\"2024-12-12T10:13:54.000Z\",\"updatedAt\":\"2024-12-12T10:13:56.067Z\"}]',20),(8,'truck tire found on a highway, NFC tag containing a journal',NULL,2023,'[{\"etag\":\"921c222657e9275e815a521b5afe64ce\",\"public_id\":\"2212_DSF6774_jakubkanna-2048x1365\",\"mediaType\":\"IMAGE\",\"cld_url\":\"https://res.cloudinary.com/dzsehmvrr/image/upload/v1734006341/2212_DSF6774_jakubkanna-2048x1365.jpg\",\"path\":\"/home/host797681/labguy-server/public/uploads/images/2212_DSF6774_jakubkanna-2048x1365.jpeg\",\"filename\":\"2212_DSF6774_jakubkanna-2048x1365\",\"format\":\"jpg\",\"bytes\":175502,\"description\":\"\",\"width\":2048,\"height\":1365,\"isBright\":false,\"createdAt\":\"2024-12-12T10:13:54.000Z\",\"updatedAt\":\"2024-12-12T12:25:42.178Z\"},{\"etag\":\"af1ac644daab7d9db73959161549925a\",\"public_id\":\"2210_DSF6770_jakubkanna-1536x1024\",\"mediaType\":\"IMAGE\",\"cld_url\":\"https://res.cloudinary.com/dzsehmvrr/image/upload/v1734006341/2210_DSF6770_jakubkanna-1536x1024.jpg\",\"path\":\"/home/host797681/labguy-server/public/uploads/images/2210_DSF6770_jakubkanna-1536x1024.jpeg\",\"filename\":\"2210_DSF6770_jakubkanna-1536x1024\",\"format\":\"jpg\",\"bytes\":121352,\"description\":\"\",\"width\":1536,\"height\":1024,\"isBright\":false,\"createdAt\":\"2024-12-12T10:13:54.000Z\",\"updatedAt\":\"2024-12-12T12:25:42.262Z\"},{\"etag\":\"34097939302bfa1c0ceffb88a50fa565\",\"public_id\":\"2211_DSF6771_jakubkanna-1024x683\",\"mediaType\":\"IMAGE\",\"cld_url\":\"https://res.cloudinary.com/dzsehmvrr/image/upload/v1734006341/2211_DSF6771_jakubkanna-1024x683.jpg\",\"path\":\"/home/host797681/labguy-server/public/uploads/images/2211_DSF6771_jakubkanna-1024x683.jpeg\",\"filename\":\"2211_DSF6771_jakubkanna-1024x683\",\"format\":\"jpg\",\"bytes\":52398,\"description\":\"\",\"width\":1024,\"height\":683,\"isBright\":false,\"createdAt\":\"2024-12-12T10:13:54.000Z\",\"updatedAt\":\"2024-12-12T12:25:41.945Z\"}]',21),(9,'3D print, based on a sports car rear wing, smashed in STRESS–TEST by newscenario in 2023',NULL,2022,'[{\"etag\":\"8c355f4077b237f25a55e16fdc897e69\",\"public_id\":\"toofasttolast_16x9\",\"mediaType\":\"IMAGE\",\"cld_url\":\"https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/toofasttolast_16x9.jpg\",\"path\":\"/home/host797681/labguy-server/public/uploads/images/toofasttolast_16x9.jpeg\",\"filename\":\"toofasttolast_16x9\",\"format\":\"jpg\",\"bytes\":132207,\"description\":\"\",\"width\":2160,\"height\":1215,\"isBright\":null,\"createdAt\":\"2024-12-12T10:13:54.000Z\",\"updatedAt\":\"2024-12-12T10:13:54.823Z\"},{\"etag\":\"99c126fba8f12a5cebb779a4f1e4a4ad\",\"public_id\":\"Screenshot-2023-07-02-at-14.08.58\",\"mediaType\":\"IMAGE\",\"cld_url\":\"https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/Screenshot-2023-07-02-at-14.08.58.jpg\",\"path\":\"/home/host797681/labguy-server/public/uploads/images/Screenshot-2023-07-02-at-14.08.58.jpeg\",\"filename\":\"Screenshot-2023-07-02-at-14.08.58\",\"format\":\"jpg\",\"bytes\":203890,\"description\":\"\",\"width\":2160,\"height\":1216,\"isBright\":null,\"createdAt\":\"2024-12-12T10:13:54.000Z\",\"updatedAt\":\"2024-12-12T10:13:55.209Z\"},{\"etag\":\"aa30bfa6e8363664c49b09305aa39e8d\",\"public_id\":\"2207_DSF6746_jakubkanna-1536x1024\",\"mediaType\":\"IMAGE\",\"cld_url\":\"https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2207_DSF6746_jakubkanna-1536x1024.jpg\",\"path\":\"/home/host797681/labguy-server/public/uploads/images/2207_DSF6746_jakubkanna-1536x1024.jpeg\",\"filename\":\"2207_DSF6746_jakubkanna-1536x1024\",\"format\":\"jpg\",\"bytes\":203805,\"description\":\"\",\"width\":2160,\"height\":1440,\"isBright\":null,\"createdAt\":\"2024-12-12T10:13:54.000Z\",\"updatedAt\":\"2024-12-12T10:13:55.197Z\"},{\"etag\":\"881e7797c4c93b90e28c08ec5eb0ff4b\",\"public_id\":\"2209_DSF6765_jakubkanna-1536x1024\",\"mediaType\":\"IMAGE\",\"cld_url\":\"https://res.cloudinary.com/dzsehmvrr/image/upload/v1733998434/2209_DSF6765_jakubkanna-1536x1024.jpg\",\"path\":\"/home/host797681/labguy-server/public/uploads/images/2209_DSF6765_jakubkanna-1536x1024.jpeg\",\"filename\":\"2209_DSF6765_jakubkanna-1536x1024\",\"format\":\"jpg\",\"bytes\":220865,\"description\":\"\",\"width\":2160,\"height\":1440,\"isBright\":null,\"createdAt\":\"2024-12-12T10:13:54.000Z\",\"updatedAt\":\"2024-12-12T10:13:55.176Z\"}]',22);
/*!40000 ALTER TABLE `Work` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_GeneralSectionToTag`
--

DROP TABLE IF EXISTS `_GeneralSectionToTag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_GeneralSectionToTag` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL,
  UNIQUE KEY `_GeneralSectionToTag_AB_unique` (`A`,`B`),
  KEY `_GeneralSectionToTag_B_index` (`B`),
  CONSTRAINT `_GeneralSectionToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `GeneralSection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_GeneralSectionToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_GeneralSectionToTag`
--

LOCK TABLES `_GeneralSectionToTag` WRITE;
/*!40000 ALTER TABLE `_GeneralSectionToTag` DISABLE KEYS */;
INSERT INTO `_GeneralSectionToTag` VALUES (20,7),(21,7),(22,7);
/*!40000 ALTER TABLE `_GeneralSectionToTag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_ImageRefToTag`
--

DROP TABLE IF EXISTS `_ImageRefToTag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_ImageRefToTag` (
  `A` varchar(191) NOT NULL,
  `B` int(11) NOT NULL,
  UNIQUE KEY `_ImageRefToTag_AB_unique` (`A`,`B`),
  KEY `_ImageRefToTag_B_index` (`B`),
  CONSTRAINT `_ImageRefToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `ImageRef` (`etag`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_ImageRefToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_ImageRefToTag`
--

LOCK TABLES `_ImageRefToTag` WRITE;
/*!40000 ALTER TABLE `_ImageRefToTag` DISABLE KEYS */;
/*!40000 ALTER TABLE `_ImageRefToTag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_TagToVideoRef`
--

DROP TABLE IF EXISTS `_TagToVideoRef`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_TagToVideoRef` (
  `A` int(11) NOT NULL,
  `B` varchar(191) NOT NULL,
  UNIQUE KEY `_TagToVideoRef_AB_unique` (`A`,`B`),
  KEY `_TagToVideoRef_B_index` (`B`),
  CONSTRAINT `_TagToVideoRef_A_fkey` FOREIGN KEY (`A`) REFERENCES `Tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_TagToVideoRef_B_fkey` FOREIGN KEY (`B`) REFERENCES `VideoRef` (`etag`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_TagToVideoRef`
--

LOCK TABLES `_TagToVideoRef` WRITE;
/*!40000 ALTER TABLE `_TagToVideoRef` DISABLE KEYS */;
/*!40000 ALTER TABLE `_TagToVideoRef` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-12 15:58:56
