-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bookstock
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `bookstock`;

-- -----------------------------------------------------
-- Schema bookstock
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bookstock` DEFAULT CHARACTER SET utf8;
-- -----------------------------------------------------
-- Schema bookstock
-- -----------------------------------------------------
USE `bookstock`;

-- -----------------------------------------------------
-- Table `bookstock`.`USER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookstock`.`user`;

CREATE TABLE IF NOT EXISTS `bookstock`.`user` (
  `userId` VARCHAR(30) NOT NULL COMMENT '이메일',
  `pwd` VARCHAR(20) NOT NULL COMMENT '비밀번호',
  `nick` VARCHAR(30) NOT NULL COMMENT '닉네임',
  `userPhone` INT(11) NULL COMMENT '가입자 핸드폰번호',
  `userAddr` VARCHAR(1000) NULL COMMENT '가입자 주소',
  `userCreAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '가입일',
  `userUpdaAt` DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '가입자 정보 수정일',
  PRIMARY KEY (`userId`)
) ENGINE = InnoDB;

CREATE UNIQUE INDEX `nick_UNIQUE` ON `bookstock`.`user` (`nick` ASC) VISIBLE;

-- -----------------------------------------------------
-- Table `bookstock`.`BOOK`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookstock`.`book`;

CREATE TABLE IF NOT EXISTS `bookstock`.`book` (
  `bookId` INT NOT NULL AUTO_INCREMENT COMMENT '북Id',
  `bookTitle` VARCHAR(60) NOT NULL COMMENT '책 제목',
  `bookAuthor` VARCHAR(60) NOT NULL COMMENT '책 저자',
  `bookPublisher` VARCHAR(60) NOT NULL COMMENT '출판사',
  `bookPubDate` DATETIME NOT NULL COMMENT '출간일',
  `isbn` BIGINT(13) NOT NULL COMMENT 'ISBN',
  `bookText` VARCHAR(1000) NOT NULL COMMENT '책 설명',
  PRIMARY KEY (`bookId`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `bookstock`.`AUCTION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookstock`.`auction`;

CREATE TABLE IF NOT EXISTS `bookstock`.`auction` (
  `auctionId` INT NOT NULL AUTO_INCREMENT COMMENT '경매번호',
  `auctionStart` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '경매시작일',
  `auctionEnd` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '옥션 종료일',
  `bid` INT(10) NOT NULL,
  `auctionImgSrc` VARCHAR(40) NULL COMMENT '경매품 이미지',
  `auctionContext` VARCHAR(1000) NULL COMMENT '경매품 설명',
  `uId` VARCHAR(30) NOT NULL,
  `bookId` INT NOT NULL,
  `uAddr` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`auctionId`),
  CONSTRAINT `userId`
    FOREIGN KEY (`uId`)
    REFERENCES `user` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `bookId`
    FOREIGN KEY (`bookId`)
    REFERENCES `book` (`bookId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `uAddr`
    FOREIGN KEY (`uAddr`)
    REFERENCES `user` (`userAddr`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE UNIQUE INDEX `AUCTIONcol_UNIQUE` ON `bookstock`.`auction` (`auctionContext` ASC) VISIBLE;
CREATE INDEX `userId_idx` ON `bookstock`.`auction` (`uId` ASC) VISIBLE;
CREATE INDEX `bookId_idx` ON `bookstock`.`auction` (`bookId` ASC) VISIBLE;
CREATE INDEX `uAddr_idx` ON `bookstock`.`auction` (`uAddr` ASC) VISIBLE;

-- -----------------------------------------------------
-- Table `bookstock`.`BID`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookstock`.`bid`;

CREATE TABLE IF NOT EXISTS `bookstock`.`bid` (
  `bidId` INT NOT NULL AUTO_INCREMENT COMMENT '입찰 번호',
  `bidPrice` INT(10) NOT NULL COMMENT '입찰 가격',
  `bidImgSrc` VARCHAR(40) NOT NULL COMMENT '입찰물 이미지',
  `bidCreateAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '입찰 시간',
  `bidContext` VARCHAR(1000) NULL COMMENT '입찰물 설명',
  `auctionId` INT NULL,
  `uId` VARCHAR(30) NULL,
  PRIMARY KEY (`bidId`),
  CONSTRAINT `uId`
    FOREIGN KEY (`uId`)
    REFERENCES `user` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `auctionId`
    FOREIGN KEY (`auctionId`)
    REFERENCES `auction` (`auctionId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE INDEX `uId_idx` ON `bookstock`.`bid` (`uId` ASC) VISIBLE;
CREATE INDEX `auctionId_idx` ON `bookstock`.`bid` (`auctionId` ASC) VISIBLE;

-- -----------------------------------------------------
-- Table `bookstock`.`TRANS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookstock`.`trans`;

CREATE TABLE IF NOT EXISTS `bookstock`.`trans` (
  `transId` INT NOT NULL AUTO_INCREMENT,
  `payType` VARCHAR(255) NOT NULL COMMENT '결제 방법',
  `Done` TINYINT(1) NOT NULL COMMENT '거래 완료 여부',
  `aucBal` INT NULL COMMENT '옥션 거래 금액',
  `bidBal` INT NULL COMMENT '판매자 금액',
  `tempBal` INT NULL COMMENT '중간 금액 저장 장소',
  `trackNum` INT NULL COMMENT '송장번호 - 제거로 받기',
  `transCreateAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '거래 시작일',
  `transEndAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '거래 종료일',
  `auctionId` INT NULL,
  `bidId` INT NULL,
  `uId` VARCHAR(30) NULL,
  `userAddr` VARCHAR(1000) NULL,
  PRIMARY KEY (`transId`),
  CONSTRAINT `FK_auctionId`
    FOREIGN KEY (`auctionId`)
    REFERENCES `auction` (`auctionId`)
    ON DELETE NO ACTION
