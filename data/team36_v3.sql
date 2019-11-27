CREATE DATABASE  IF NOT EXISTS `team36` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `team36`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: team36
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `Username` varchar(50) NOT NULL,
  PRIMARY KEY (`Username`),
  CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`Username`) REFERENCES `employee` (`Username`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('cool_class4400');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `Name` varchar(50) NOT NULL,
  PRIMARY KEY (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES ('4400 Theater Company'),('AI Theater Company'),('Awesome Theater Company'),('EZ Theater Company');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `creditcard`
--

DROP TABLE IF EXISTS `creditcard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `creditcard` (
  `CreditCardNumber` char(16) NOT NULL,
  `Username` varchar(50) NOT NULL,
  PRIMARY KEY (`CreditCardNumber`),
  KEY `Username` (`Username`),
  CONSTRAINT `creditcard_ibfk_1` FOREIGN KEY (`Username`) REFERENCES `customer` (`Username`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creditcard`
--

LOCK TABLES `creditcard` WRITE;
/*!40000 ALTER TABLE `creditcard` DISABLE KEYS */;
INSERT INTO `creditcard` VALUES ('1111111111000000','calcultron'),('1111111100000000','calcultron2'),('1111111110000000','calcultron2'),('1111111111100000','calcwizard'),('2222222222000000','cool_class4400'),('2220000000000000','DNAhelix'),('2222222200000000','does2Much'),('2222222222222200','eeqmcsquare'),('2222222222200000','entropyRox'),('2222222222220000','entropyRox'),('1100000000000000','fullMetal'),('1111111111110000','georgep'),('1111111111111000','georgep'),('1111111111111100','georgep'),('1111111111111110','georgep'),('1111111111111111','georgep'),('2222222222222220','ilikemoney$$'),('2222222222222222','ilikemoney$$'),('9000000000000000','ilikemoney$$'),('1111110000000000','imready'),('1110000000000000','isthisthekrustykrab'),('1111000000000000','isthisthekrustykrab'),('1111100000000000','isthisthekrustykrab'),('1000000000000000','notFullMetal'),('2222222000000000','programerAAL'),('3333333333333300','RitzLover28'),('2222222220000000','thePiGuy3.14'),('2222222222222000','theScienceGuy');
/*!40000 ALTER TABLE `creditcard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `Username` varchar(50) NOT NULL,
  PRIMARY KEY (`Username`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`Username`) REFERENCES `user` (`Username`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('calcultron'),('calcultron2'),('calcwizard'),('clarinetbeast'),('cool_class4400'),('DNAhelix'),('does2Much'),('eeqmcsquare'),('entropyRox'),('fullMetal'),('georgep'),('ilikemoney$$'),('imready'),('isthisthekrustykrab'),('notFullMetal'),('programerAAL'),('RitzLover28'),('thePiGuy3.14'),('theScienceGuy');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customerviewmovie`
--

DROP TABLE IF EXISTS `customerviewmovie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customerviewmovie` (
  `Movie` varchar(50) NOT NULL,
  `ReleaseDate` date NOT NULL,
  `ViewDate` date NOT NULL,
  `Theater` varchar(50) NOT NULL,
  `Company` varchar(50) NOT NULL,
  `CreditCardNumber` char(16) NOT NULL,
  PRIMARY KEY (`Company`,`Theater`,`Movie`,`ReleaseDate`,`ViewDate`,`CreditCardNumber`),
  KEY `Company` (`Company`,`Theater`,`Movie`,`ReleaseDate`,`ViewDate`),
  KEY `CreditCardNumber` (`CreditCardNumber`),
  CONSTRAINT `customerviewmovie_ibfk_1` FOREIGN KEY (`Company`, `Theater`, `Movie`, `ReleaseDate`, `ViewDate`) REFERENCES `movieplay` (`Company`, `Theater`, `Movie`, `ReleaseDate`, `PlayDate`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `customerviewmovie_ibfk_2` FOREIGN KEY (`CreditCardNumber`) REFERENCES `creditcard` (`CreditCardNumber`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customerviewmovie`
--

LOCK TABLES `customerviewmovie` WRITE;
/*!40000 ALTER TABLE `customerviewmovie` DISABLE KEYS */;
INSERT INTO `customerviewmovie` VALUES ('How to Train Your Dragon','2010-03-21','2010-03-25','Star Movies','EZ Theater Company','1111111111111100'),('How to Train Your Dragon','2010-03-21','2010-04-02','Cinema Star','4400 Theater Company','1111111111111111'),('How to Train Your Dragon','2010-03-21','2010-03-22','Main Movies','EZ Theater Company','1111111111111111'),('How to Train Your Dragon','2010-03-21','2010-03-23','Main Movies','EZ Theater Company','1111111111111111');
/*!40000 ALTER TABLE `customerviewmovie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `Username` varchar(50) NOT NULL,
  PRIMARY KEY (`Username`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`Username`) REFERENCES `user` (`Username`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('calcultron'),('cool_class4400'),('entropyRox'),('fatherAI'),('georgep'),('ghcghc'),('imbatman'),('manager1'),('manager2'),('manager3'),('manager4'),('radioactivePoRa');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manager`
--

DROP TABLE IF EXISTS `manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manager` (
  `Username` varchar(50)  NOT NULL,
  `Street` varchar(50)  NOT NULL,
  `City` varchar(50)  NOT NULL,
  `State` char(2)  NOT NULL,
  `Zipcode` char(5) NOT NULL,
  `Company` varchar(50)  NOT NULL,
  PRIMARY KEY (`Username`),
  UNIQUE KEY `Address` (`Zipcode`,`Street`,`City`,`State`),
  KEY `company_ibfk_1` (`Company`),
  CONSTRAINT `company_ibfk_1` FOREIGN KEY (`Company`) REFERENCES `company` (`Name`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `manager_ibfk_1` FOREIGN KEY (`Username`) REFERENCES `employee` (`Username`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager`
--

LOCK TABLES `manager` WRITE;
/*!40000 ALTER TABLE `manager` DISABLE KEYS */;
INSERT INTO `manager` VALUES ('calcultron','123 Peachtree St','Atlanta','GA','30308','EZ Theater Company'),('entropyRox','200 Cool Place','San Francisco','CA','94016','4400 Theater Company'),('fatherAI','456 Main St','New York','NY','10001','EZ Theater Company'),('georgep','10 Pearl Dr','Seattle','WA','98105','4400 Theater Company'),('ghcghc','100 Pi St','Pallet Town','KS','31415','AI Theater Company'),('imbatman','800 Color Dr','Austin','TX','78653','Awesome Theater Company'),('manager1','123 Ferst Drive','Atlanta','GA','30332','4400 Theater Company'),('manager2','456 Ferst Drive','Atlanta','GA','30332','AI Theater Company'),('manager3','789 Ferst Drive','Atlanta','GA','30332','4400 Theater Company'),('manager4','000 Ferst Drive','Atlanta','GA','30332','4400 Theater Company'),('radioactivePoRa','100 Blu St','Sunnyvale','CA','94088','4400 Theater Company');
/*!40000 ALTER TABLE `manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `Name` varchar(50) NOT NULL,
  `ReleaseDate` date NOT NULL,
  `Duration` int(11) NOT NULL,
  PRIMARY KEY (`Name`,`ReleaseDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES ('4400 The Movie','2019-08-12',130),('Avengers: Endgame','2019-04-26',181),('Calculus Returns: A ML Story','2019-09-19',314),('George P Burdell\'s Life Story','1927-08-12',100),('Georgia Tech The Movie','1985-08-13',100),('How to Train Your Dragon','2010-03-21',98),('Spaceballs','1987-06-24',96),('Spider-Man: Into the Spider-Verse','2018-12-01',117),('The First Pokemon Movie','1998-07-19',75),('The King\'s Speech','2010-11-26',119);
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movieplay`
--

DROP TABLE IF EXISTS `movieplay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movieplay` (
  `Movie` varchar(50)  NOT NULL,
  `ReleaseDate` date NOT NULL,
  `PlayDate` date NOT NULL,
  `Theater` varchar(50)  NOT NULL,
  `Company` varchar(50)  NOT NULL,
  PRIMARY KEY (`Company`,`Theater`,`Movie`,`ReleaseDate`,`PlayDate`),
  KEY `Company` (`Company`,`Theater`),
  KEY `Movie` (`Movie`,`ReleaseDate`),
  CONSTRAINT `movieplay_ibfk_1` FOREIGN KEY (`Company`, `Theater`) REFERENCES `theater` (`Company`, `Name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `movieplay_ibfk_2` FOREIGN KEY (`Movie`, `ReleaseDate`) REFERENCES `movie` (`Name`, `ReleaseDate`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movieplay`
--

LOCK TABLES `movieplay` WRITE;
/*!40000 ALTER TABLE `movieplay` DISABLE KEYS */;
INSERT INTO `movieplay` VALUES ('4400 The Movie','2019-08-12','2019-09-12','Cinema Star','4400 Theater Company'),('4400 The Movie','2019-08-12','2019-10-12','ABC Theater','Awesome Theater Company'),('4400 The Movie','2019-08-12','2019-08-12','Star Movies','EZ Theater Company'),('Calculus Returns: A ML Story','2019-09-19','2019-10-10','ML Movies','AI Theater Company'),('Calculus Returns: A ML Story','2019-09-19','2019-12-30','ML Movies','AI Theater Company'),('George P Burdell\'s Life Story','1927-08-12','2010-05-20','Cinema Star','4400 Theater Company'),('George P Burdell\'s Life Story','1927-08-12','2019-07-14','Main Movies','EZ Theater Company'),('George P Burdell\'s Life Story','1927-08-12','2019-10-22','Main Movies','EZ Theater Company'),('Georgia Tech The Movie','1985-08-13','2019-09-30','Cinema Star','4400 Theater Company'),('Georgia Tech The Movie','1985-08-13','1985-08-13','ABC Theater','Awesome Theater Company'),('How to Train Your Dragon','2010-03-21','2010-04-02','Cinema Star','4400 Theater Company'),('How to Train Your Dragon','2010-03-21','2010-03-22','Main Movies','EZ Theater Company'),('How to Train Your Dragon','2010-03-21','2010-03-23','Main Movies','EZ Theater Company'),('How to Train Your Dragon','2010-03-21','2010-03-25','Star Movies','EZ Theater Company'),('Spaceballs','1987-06-24','2000-02-02','Cinema Star','4400 Theater Company'),('Spaceballs','1987-06-24','2010-04-02','ML Movies','AI Theater Company'),('Spaceballs','1987-06-24','2023-01-23','ML Movies','AI Theater Company'),('Spaceballs','1987-06-24','1999-06-24','Main Movies','EZ Theater Company'),('Spider-Man: Into the Spider-Verse','2018-12-01','2019-09-30','ML Movies','AI Theater Company'),('The First Pokemon Movie','1998-07-19','2018-07-19','ABC Theater','Awesome Theater Company'),('The King\'s Speech','2010-11-26','2019-12-20','Cinema Star','4400 Theater Company'),('The King\'s Speech','2010-11-26','2019-12-20','Main Movies','EZ Theater Company');
/*!40000 ALTER TABLE `movieplay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `theater`
--

DROP TABLE IF EXISTS `theater`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `theater` (
  `Company` varchar(50)  NOT NULL,
  `Name` varchar(50)  NOT NULL,
  `Capacity` int(11) NOT NULL,
  `Street` varchar(50)  NOT NULL,
  `City` varchar(50)  NOT NULL,
  `State` char(2)  NOT NULL,
  `Zipcode` char(5) NOT NULL,
  `ManagerUsername` varchar(50)  NOT NULL,
  PRIMARY KEY (`Company`,`Name`),
  UNIQUE KEY `ManagerUsername` (`ManagerUsername`),
  CONSTRAINT `theater_ibfk_1` FOREIGN KEY (`Company`) REFERENCES `company` (`Name`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `theater_ibfk_2` FOREIGN KEY (`ManagerUsername`) REFERENCES `manager` (`Username`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theater`
--

LOCK TABLES `theater` WRITE;
/*!40000 ALTER TABLE `theater` DISABLE KEYS */;
INSERT INTO `theater` VALUES ('4400 Theater Company','Cinema Star',4,'100 Cool Place','San Francisco','CA','94016','entropyRox'),('4400 Theater Company','Jonathan\'s Movies',2,'67 Pearl Dr','Seattle','WA','98101','georgep'),('4400 Theater Company','Star Movies',5,'4400 Rocks Ave','Boulder','CA','80301','radioactivePoRa'),('AI Theater Company','ML Movies',3,'314 Pi St','Pallet Town','KS','31415','ghcghc'),('Awesome Theater Company','ABC Theater',5,'880 Color Dr','Austin','TX','73301','imbatman'),('EZ Theater Company','Main Movies',3,'123 Main St','New York','NY','10001','fatherAI'),('EZ Theater Company','Star Movies',2,'745 GT St','Atlanta','GA','30332','calcultron');
/*!40000 ALTER TABLE `theater` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `Username` varchar(50)  NOT NULL,
  `Firstname` varchar(50)  NOT NULL,
  `Lastname` varchar(50)  NOT NULL,
  `Password` char(64)  NOT NULL,
  `Status` enum('approved','pending','declined')  NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('calcultron','Dwight','Schrute','77c9749b451ab8c713c48037ddfbb2c4','approved'),('calcultron2','Jim','Halpert','8792b8cf71d27dc96173b2ac79b96e0d','approved'),('calcwizard','Issac','Newton','0d777e9e30b918e9034ab610712c90cf','approved'),('clarinetbeast','Squidward','Tentacles','c8c605999f3d8352d7bb792cf3fdb25b','declined'),('cool_class4400','A. TA','Washere','77c9749b451ab8c713c48037ddfbb2c4','approved'),('DNAhelix','Rosalind','Franklin','ca94efe2a58c27168edf3d35102dbb6d','approved'),('does2Much','Carl','Gauss','00cedcf91beffa9ee69f6cfe23a4602d','approved'),('eeqmcsquare','Albert','Einstein','7c5858f7fcf63ec268f42565be3abb95','approved'),('entropyRox','Claude','Shannon','c8c605999f3d8352d7bb792cf3fdb25b','approved'),('fatherAI','Alan','Turing','0d777e9e30b918e9034ab610712c90cf','approved'),('fullMetal','Edward','Elric','d009d70ae4164e8989725e828db8c7c2','approved'),('gdanger','Gary','Danger','3665a76e271ada5a75368b99f774e404','declined'),('georgep','George P.','Burdell','bbb8aae57c104cda40c93843ad5e6db8','approved'),('ghcghc','Grace','Hopper','9f0863dd5f0256b0f586a7b523f8cfe8','approved'),('ilikemoney$$','Eugene','Krabs','7c5858f7fcf63ec268f42565be3abb95','approved'),('imbatman','Bruce','Wayne','9f0863dd5f0256b0f586a7b523f8cfe8','approved'),('imready','Spongebob','Squarepants','ca94efe2a58c27168edf3d35102dbb6d','approved'),('isthisthekrustykrab','Patrick','Star','134fb0bf3bdd54ee9098f4cbc4351b9a','approved'),('manager1','Manager','One','e58cce4fab03d2aea056398750dee16b','approved'),('manager2','Manager','Two','ba9485f02fc98cdbd2edadb0aa8f6390','approved'),('manager3','Three','Three','6e4fb18b49aa3219bef65195dac7be8c','approved'),('manager4','Four','Four','d61dfee83aa2a6f9e32f268d60e789f5','approved'),('notFullMetal','Alphonse','Elric','d009d70ae4164e8989725e828db8c7c2','approved'),('programerAAL','Ada','Lovelace','ba9485f02fc98cdbd2edadb0aa8f6390','approved'),('radioactivePoRa','Marie','Curie','e5d4b739db1226088177e6f8b70c3a6f','approved'),('RitzLover28','Abby','Normal','8792b8cf71d27dc96173b2ac79b96e0d','approved'),('smith_j','John','Smith','77c9749b451ab8c713c48037ddfbb2c4','pending'),('texasStarKarate','Sandy','Cheeks','7c5858f7fcf63ec268f42565be3abb95','declined'),('thePiGuy3.14','Archimedes','Syracuse','e11170b8cbd2d74102651cb967fa28e5','approved'),('theScienceGuy','Bill','Nye','c8c605999f3d8352d7bb792cf3fdb25b','approved');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visit`
--

DROP TABLE IF EXISTS `visit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visit` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(50)  NOT NULL,
  `Theater` varchar(50)  NOT NULL,
  `Company` varchar(50)  NOT NULL,
  `Date` date NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Username` (`Username`),
  KEY `Company` (`Company`,`Theater`),
  CONSTRAINT `visit_ibfk_1` FOREIGN KEY (`Username`) REFERENCES `user` (`Username`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `visit_ibfk_2` FOREIGN KEY (`Company`, `Theater`) REFERENCES `theater` (`Company`, `Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visit`
--

LOCK TABLES `visit` WRITE;
/*!40000 ALTER TABLE `visit` DISABLE KEYS */;
INSERT INTO `visit` VALUES (1,'georgep','Main Movies','EZ Theater Company','2010-03-22'),(2,'calcwizard','Main Movies','EZ Theater Company','2010-03-22'),(3,'calcwizard','Star Movies','EZ Theater Company','2010-03-25'),(4,'imready','Star Movies','EZ Theater Company','2010-03-25'),(5,'calcwizard','ML Movies','AI Theater Company','2010-03-20');
/*!40000 ALTER TABLE `visit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'team36'
--

--
-- Dumping routines for database 'team36'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-25 13:34:15
