-- MySQL Workbench Forward Engineering

-- 기존 설정 저장
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- 스키마 bookstock
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `bookstock` ;

-- -----------------------------------------------------
-- 스키마 bookstock 생성
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bookstock` DEFAULT CHARACTER SET utf8 ;
USE `bookstock` ;

-- -----------------------------------------------------
-- 테이블 `bookstock`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookstock`.`user` ;

CREATE TABLE IF NOT EXISTS `bookstock`.`user` (
  `userId` VARCHAR(30) NOT NULL COMMENT '이메일',
  `pwd` VARCHAR(20) NOT NULL COMMENT '비밀번호',
  `nick` VARCHAR(30) NOT NULL COMMENT '닉네임',
  `userPhone` VARCHAR(14) NOT NULL COMMENT '가입자 핸드폰번호',
  `userAddr` VARCHAR(1000) NOT NULL COMMENT '가입자 주소',
  `userAccount` VARCHAR(17) NOT NULL,
  `userCreAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '가입일',
  `userUpdaAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '가입자 정보 수정일',
  PRIMARY KEY (`userId`)
) ENGINE = InnoDB;

CREATE UNIQUE INDEX `nick_UNIQUE` ON `bookstock`.`user` (`nick` ASC) VISIBLE;
CREATE UNIQUE INDEX `userPhone_UNIQUE` ON `bookstock`.`user` (`userPhone` ASC) VISIBLE;
CREATE UNIQUE INDEX `userAccount_UNIQUE` ON `bookstock`.`user` (`userAccount` ASC) VISIBLE;

-- -----------------------------------------------------
-- 테이블 `bookstock`.`book`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookstock`.`book` ;

CREATE TABLE IF NOT EXISTS `bookstock`.`book` (
  `bookId` INT NOT NULL AUTO_INCREMENT COMMENT '북Id',
  `bookTitle` VARCHAR(60) NOT NULL COMMENT '책 제목',
  `bookAuthor` VARCHAR(60) NOT NULL COMMENT '책 저자',
  `bookPuisher` VARCHAR(60) NOT NULL COMMENT '출판사',
  `bookPubDate` DATETIME NOT NULL COMMENT '출간일',
  `isbn` VARCHAR(13) NOT NULL,
  `bookText` VARCHAR(1000) NOT NULL COMMENT '책 설명',
  PRIMARY KEY (`bookId`)
) ENGINE = InnoDB;

CREATE INDEX `bookId_idx` ON `bookstock`.`book` (`bookId` ASC) VISIBLE;

-- -----------------------------------------------------
-- 테이블 `bookstock`.`auction`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookstock`.`auction` ;

CREATE TABLE IF NOT EXISTS `bookstock`.`auction` (
  `auctionId` INT NOT NULL COMMENT '경매번호',
  `auctionStart` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '경매시작일',
  `auctionEnd` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '옥션 종료일',
  `bid` INT(10) NOT NULL,
  `auctionImgSrc` VARCHAR(40) NOT NULL COMMENT '경매품 이미지',
  `auctionContext` VARCHAR(1000) NOT NULL COMMENT '경매품 설명',
  `uId` VARCHAR(30) NOT NULL,
  `bookId` INT NOT NULL,
  PRIMARY KEY (`auctionId`),
  CONSTRAINT `userId`
    FOREIGN KEY (`uId`)
    REFERENCES `bookstock`.`user` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `bookId`
    FOREIGN KEY (`bookId`)
    REFERENCES `bookstock`.`book` (`bookId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE INDEX `userId_idx` ON `bookstock`.`auction` (`uId` ASC) VISIBLE;
CREATE INDEX `bookId_idx` ON `bookstock`.`auction` (`bookId` ASC) VISIBLE;

-- -----------------------------------------------------
-- 테이블 `bookstock`.`bid`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookstock`.`bid` ;

CREATE TABLE IF NOT EXISTS `bookstock`.`bid` (
  `bidId` INT NOT NULL AUTO_INCREMENT COMMENT '입찰 번호',
  `bidPrice` INT(10) NOT NULL COMMENT '입찰 가격',
  `bidImgSrc` VARCHAR(40) NOT NULL COMMENT '입찰물 이미지',
  `bidCreateAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '입찰 시간',
  `bidContext` VARCHAR(1000) NOT NULL COMMENT '입찰물 설명',
  `auctionId` INT NOT NULL,
  `uId` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`bidId`),
  CONSTRAINT `uId`
    FOREIGN KEY (`uId`)
    REFERENCES `bookstock`.`user` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `auctionId`
    FOREIGN KEY (`auctionId`)
    REFERENCES `bookstock`.`auction` (`auctionId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE INDEX `uId_idx` ON `bookstock`.`bid` (`uId` ASC) VISIBLE;
CREATE INDEX `auctionId_idx` ON `bookstock`.`bid` (`auctionId` ASC) VISIBLE;

-- 이전 설정으로 복원
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
