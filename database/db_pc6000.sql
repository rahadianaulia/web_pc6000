-- MySQL Script generated by MySQL Workbench
-- 05/19/15 12:55:49
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema pc6000
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pc6000
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pc6000` DEFAULT CHARACTER SET latin1 ;
USE `pc6000` ;

-- -----------------------------------------------------
-- Table `pc6000`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc6000`.`customer` (
  `idcustomer` INT(11) NOT NULL AUTO_INCREMENT,
  `nama` VARCHAR(50) NULL DEFAULT NULL,
  `alamat` VARCHAR(50) NULL DEFAULT NULL,
  `no_hp` VARCHAR(15) NULL,
  PRIMARY KEY (`idcustomer`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `pc6000`.`penjualan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc6000`.`penjualan` (
  `no_faktur` INT(11) NOT NULL,
  `tgljual` DATETIME NULL,
  `idcustomer` INT(11) NOT NULL,
  `totalharga` DOUBLE NULL DEFAULT NULL,
  PRIMARY KEY (`no_faktur`, `idcustomer`),
  INDEX `fk_penjualan_customer1_idx` (`idcustomer` ASC),
  CONSTRAINT `fk_penjualan_customer1`
    FOREIGN KEY (`idcustomer`)
    REFERENCES `pc6000`.`customer` (`idcustomer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `pc6000`.`jenisbarang`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc6000`.`jenisbarang` (
  `idjenis` INT(3) NOT NULL AUTO_INCREMENT,
  `namajenis` VARCHAR(20) NULL,
  PRIMARY KEY (`idjenis`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pc6000`.`masterbarang`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc6000`.`masterbarang` (
  `idbarang` VARCHAR(13) NOT NULL,
  `namabarang` VARCHAR(50) NULL,
  `idjenis` INT(3) NOT NULL,
  `hargasatuan` DOUBLE NULL DEFAULT NULL,
  `hargajual` DOUBLE NULL DEFAULT NULL,
  `jumlahstock` INT(11) NULL DEFAULT NULL,
  `satuan` VARCHAR(15) NULL,
  `stockmin` INT(11) NULL,
  PRIMARY KEY (`idbarang`, `idjenis`),
  INDEX `fk_masterbarang_jenisbarang1_idx` (`idjenis` ASC),
  CONSTRAINT `fk_masterbarang_jenisbarang1`
    FOREIGN KEY (`idjenis`)
    REFERENCES `pc6000`.`jenisbarang` (`idjenis`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `pc6000`.`detailpenjualan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc6000`.`detailpenjualan` (
  `no_faktur` INT(11) NOT NULL,
  `idbarang` VARCHAR(15) NOT NULL,
  `hargajual` DOUBLE NULL,
  PRIMARY KEY (`no_faktur`, `idbarang`),
  INDEX `fk_detailbarangkeluar_masterbarang1_idx` (`idbarang` ASC),
  CONSTRAINT `fk_detailbarangkeluar_barangkeluar1`
    FOREIGN KEY (`no_faktur`)
    REFERENCES `pc6000`.`penjualan` (`no_faktur`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detailbarangkeluar_masterbarang1`
    FOREIGN KEY (`idbarang`)
    REFERENCES `pc6000`.`masterbarang` (`idbarang`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `pc6000`.`suplier`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc6000`.`suplier` (
  `idsuplier` INT(11) NOT NULL AUTO_INCREMENT,
  `nama` VARCHAR(50) NULL DEFAULT NULL,
  `alamat` VARCHAR(50) NULL DEFAULT NULL,
  `telp` VARCHAR(15) NULL DEFAULT NULL,
  PRIMARY KEY (`idsuplier`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `pc6000`.`masterbeli`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc6000`.`masterbeli` (
  `idbeli` INT(11) NOT NULL AUTO_INCREMENT,
  `tglbeli` DATETIME NULL DEFAULT NULL,
  `idsuplier` INT(11) NOT NULL,
  `totalbeli` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idbeli`, `idsuplier`),
  INDEX `fk_masterbeli_suplier1_idx` (`idsuplier` ASC),
  CONSTRAINT `fk_masterbeli_suplier1`
    FOREIGN KEY (`idsuplier`)
    REFERENCES `pc6000`.`suplier` (`idsuplier`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `pc6000`.`detailbeli`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc6000`.`detailbeli` (
  `idbeli` INT(11) NOT NULL,
  `idbarang` VARCHAR(15) NOT NULL,
  `jumlah` INT(11) NULL DEFAULT NULL,
  `hargasatuan` DOUBLE NULL DEFAULT NULL,
  `satuan` VARCHAR(15) NULL DEFAULT NULL,
  PRIMARY KEY (`idbeli`, `idbarang`),
  INDEX `fk_detailbeli_masterbarang1_idx` (`idbarang` ASC),
  CONSTRAINT `fk_detailbeli_masterbeli`
    FOREIGN KEY (`idbeli`)
    REFERENCES `pc6000`.`masterbeli` (`idbeli`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detailbeli_masterbarang1`
    FOREIGN KEY (`idbarang`)
    REFERENCES `pc6000`.`masterbarang` (`idbarang`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `pc6000`.`perbaikan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc6000`.`perbaikan` (
  `idperbaikan` INT(11) NOT NULL AUTO_INCREMENT,
  `tglmasuk` DATETIME NULL DEFAULT NULL,
  `idcustomer` INT(11) NOT NULL,
  `unit` TEXT NULL DEFAULT NULL,
  `keteranganrusak` TEXT NULL DEFAULT NULL,
  `status` ENUM('Selesai', 'Belum Selesai', 'Kembali') NULL,
  `keterangankembali` TEXT NULL,
  `tglselesai` DATETIME NULL,
  `total` INT(9) NULL,
  PRIMARY KEY (`idperbaikan`, `idcustomer`),
  INDEX `fk_perbaikan_customer1_idx` (`idcustomer` ASC),
  CONSTRAINT `fk_perbaikan_customer1`
    FOREIGN KEY (`idcustomer`)
    REFERENCES `pc6000`.`customer` (`idcustomer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `pc6000`.`detailperbaikan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pc6000`.`detailperbaikan` (
  `idperbaikan` INT(11) NOT NULL,
  `idbarang` VARCHAR(13) NOT NULL,
  `hargabarang` INT(11) NULL,
  `hargajasa` INT(8) NULL,
  PRIMARY KEY (`idperbaikan`, `idbarang`),
  INDEX `fk_detailperbaikan_masterbarang1_idx` (`idbarang` ASC),
  CONSTRAINT `fk_detailperbaikan_perbaikan`
    FOREIGN KEY (`idperbaikan`)
    REFERENCES `pc6000`.`perbaikan` (`idperbaikan`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detailperbaikan_masterbarang1`
    FOREIGN KEY (`idbarang`)
    REFERENCES `pc6000`.`masterbarang` (`idbarang`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
