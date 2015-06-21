/*
SQLyog Ultimate v11.5 (32 bit)
MySQL - 5.6.21 : Database - pc6000
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`pc6000` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `pc6000`;

/*Table structure for table `customer` */

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `idcustomer` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) DEFAULT NULL,
  `alamat` varchar(50) DEFAULT NULL,
  `no_hp` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`idcustomer`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `customer` */

/*Table structure for table `detailbeli` */

DROP TABLE IF EXISTS `detailbeli`;

CREATE TABLE `detailbeli` (
  `idbeli` int(11) NOT NULL,
  `idbarang` varchar(15) NOT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `hargasatuan` double DEFAULT NULL,
  `satuan` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`idbeli`,`idbarang`),
  KEY `fk_detailbeli_masterbarang1_idx` (`idbarang`),
  CONSTRAINT `fk_detailbeli_masterbarang1` FOREIGN KEY (`idbarang`) REFERENCES `masterbarang` (`idbarang`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_detailbeli_masterbeli` FOREIGN KEY (`idbeli`) REFERENCES `masterbeli` (`idbeli`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `detailbeli` */

insert  into `detailbeli`(`idbeli`,`idbarang`,`jumlah`,`hargasatuan`,`satuan`) values (22,'111',23,23,'dsd'),(22,'112',12,100000,'unit'),(22,'123',12,11,'asd'),(22,'124',12,50000,'unit'),(22,'125',12,120000,'unit'),(22,'126',3,323,'3'),(22,'127',212,2121,'8'),(47,'126',3,50000,'unit'),(48,'129',99,9000,'9'),(48,'50',12,100000,'unit'),(48,'51',12,80000,'unit'),(49,'52',10,30000,'unit'),(50,'111',12,90000,'unit'),(51,'54',2,200000,'unit'),(51,'55',2,200000,'unit'),(51,'56',3,3000,'unit'),(72,'57',787,878,'87'),(73,'58',8,878,'87'),(74,'59',787,878,'8'),(74,'60',87,878,'87');

/*Table structure for table `detailpenjualan` */

DROP TABLE IF EXISTS `detailpenjualan`;

CREATE TABLE `detailpenjualan` (
  `no_faktur` int(11) NOT NULL,
  `idbarang` varchar(15) NOT NULL,
  `hargajual` double DEFAULT NULL,
  PRIMARY KEY (`no_faktur`,`idbarang`),
  KEY `fk_detailbarangkeluar_masterbarang1_idx` (`idbarang`),
  CONSTRAINT `fk_detailbarangkeluar_barangkeluar1` FOREIGN KEY (`no_faktur`) REFERENCES `penjualan` (`no_faktur`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_detailbarangkeluar_masterbarang1` FOREIGN KEY (`idbarang`) REFERENCES `masterbarang` (`idbarang`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `detailpenjualan` */

/*Table structure for table `detailperbaikan` */

DROP TABLE IF EXISTS `detailperbaikan`;

CREATE TABLE `detailperbaikan` (
  `idperbaikan` int(11) NOT NULL,
  `idbarang` varchar(13) NOT NULL,
  `hargabarang` int(11) DEFAULT NULL,
  `hargajasa` int(8) DEFAULT NULL,
  PRIMARY KEY (`idperbaikan`,`idbarang`),
  KEY `fk_detailperbaikan_masterbarang1_idx` (`idbarang`),
  CONSTRAINT `fk_detailperbaikan_masterbarang1` FOREIGN KEY (`idbarang`) REFERENCES `masterbarang` (`idbarang`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_detailperbaikan_perbaikan` FOREIGN KEY (`idperbaikan`) REFERENCES `perbaikan` (`idperbaikan`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `detailperbaikan` */

/*Table structure for table `jenisbarang` */

DROP TABLE IF EXISTS `jenisbarang`;

CREATE TABLE `jenisbarang` (
  `idjenis` int(3) NOT NULL AUTO_INCREMENT,
  `namajenis` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idjenis`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

/*Data for the table `jenisbarang` */

insert  into `jenisbarang`(`idjenis`,`namajenis`) values (1,'Flashdisk'),(7,'Array'),(8,'dwqd'),(9,'modem'),(10,'monitor'),(11,'dwedef'),(12,'mouse'),(13,'dawd'),(14,'yuk'),(15,'pppo'),(16,'r5y5'),(17,'dasd'),(18,'apa saja'),(19,'tambah jenis'),(20,'tambah lagi'),(21,'tambah dari pembelia'),(22,'coba tambah');

/*Table structure for table `masterbarang` */

DROP TABLE IF EXISTS `masterbarang`;

CREATE TABLE `masterbarang` (
  `idbarang` varchar(13) NOT NULL,
  `namabarang` varchar(50) DEFAULT NULL,
  `idjenis` int(3) NOT NULL,
  `hargasatuan` double DEFAULT NULL,
  `hargajual` double DEFAULT NULL,
  `jumlahstock` int(11) DEFAULT NULL,
  `satuan` varchar(15) DEFAULT NULL,
  `stockmin` int(11) DEFAULT NULL,
  PRIMARY KEY (`idbarang`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `masterbarang` */

insert  into `masterbarang`(`idbarang`,`namabarang`,`idjenis`,`hargasatuan`,`hargajual`,`jumlahstock`,`satuan`,`stockmin`) values ('111','asus',1,90000,120000,16,'unit',10),('112','asus',1,100000,150000,12,'unit',2),('113','asus',1,150000,200000,12,'unit',2),('114','nike',1,120000,150000,12,'unit',2),('115','aqua',7,200000,250000,12,'unit',2),('116','tas',1,120000,150000,12,'unit',2),('117','jkj',1,80000,8787,88,'87',787),('118','adw',7,2323,232,23323,'323',3),('119','jkjk',1,9898,898,99,'jk',9),('120','iuiu',1,989,9898,989,'989',89),('123','ada',9,12,21,9,'sdc',12),('124','cliptec',1,50000,100000,12,'unit',2),('125','acer',1,120000,150000,0,'unit',2),('126','baterai',7,323,232,3,'3',23),('127','laptop',1,2121,212,212,'8',8),('128','calculator',7,1212,121,12121,'2121',21),('129','koran',1,9000,999,99,'9',9),('50','sepatu',8,100000,150000,12,'unit',2),('51','sendal',1,80000,100000,12,'unit',2),('52','printer',7,30000,50000,10,'unit',2),('53','monitor',9,20000,30000,12,'unit',2),('54','lima empat',1,200000,2000,2,'unit',2),('55','lima lima',1,200000,2000,2,'unit',2),('56','lima enam',7,3000,30,3,'unit',3),('57','lima tujuh',1,878,78,787,'87',87),('58','lima delapan',9,878,787,8,'87',787),('59','lima sembilan',9,878,78,787,'8',87),('60','enam kosong',10,878,787,87,'87',87),('61','enam satu',1,898,989,1,'89',89),('62','enam du',7,98,98,0,'8',99),('63','enam tiga',1,878,78,8,'878',8787),('64','enam empat',1,88,78,78,'87',8),('65','enam lima',1,80000,90000,2,'unit',2),('66','enam enam',11,20000,20000,0,'unit',9),('ada','awda',18,123,12,9,'adwd',123),('asd','asd',1,123,1231,12,'23',123);

/*Table structure for table `masterbeli` */

DROP TABLE IF EXISTS `masterbeli`;

CREATE TABLE `masterbeli` (
  `idbeli` int(11) NOT NULL AUTO_INCREMENT,
  `tglbeli` date DEFAULT NULL,
  `idsuplier` int(11) NOT NULL,
  `totalbeli` int(11) DEFAULT NULL,
  PRIMARY KEY (`idbeli`,`idsuplier`),
  KEY `fk_masterbeli_suplier1_idx` (`idsuplier`),
  CONSTRAINT `fk_masterbeli_suplier1` FOREIGN KEY (`idsuplier`) REFERENCES `suplier` (`idsuplier`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=latin1;

/*Data for the table `masterbeli` */

insert  into `masterbeli`(`idbeli`,`tglbeli`,`idsuplier`,`totalbeli`) values (22,'2015-06-01',1,90000),(47,'2015-06-01',2,1212),(48,'2015-06-01',2,9000),(49,'2015-06-12',1,180000),(50,'2015-06-13',1,540000),(51,'2015-06-16',17,400000),(55,'2015-06-14',17,10059710),(72,'2015-06-02',1,690986),(73,'2015-06-23',1,7024),(74,'2015-06-03',1,767372);

/*Table structure for table `penjualan` */

DROP TABLE IF EXISTS `penjualan`;

CREATE TABLE `penjualan` (
  `no_faktur` int(11) NOT NULL,
  `tgljual` datetime DEFAULT NULL,
  `idcustomer` int(11) NOT NULL,
  `totalharga` double DEFAULT NULL,
  PRIMARY KEY (`no_faktur`,`idcustomer`),
  KEY `fk_penjualan_customer1_idx` (`idcustomer`),
  CONSTRAINT `fk_penjualan_customer1` FOREIGN KEY (`idcustomer`) REFERENCES `customer` (`idcustomer`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `penjualan` */

/*Table structure for table `perbaikan` */

DROP TABLE IF EXISTS `perbaikan`;

CREATE TABLE `perbaikan` (
  `idperbaikan` int(11) NOT NULL AUTO_INCREMENT,
  `tglmasuk` datetime DEFAULT NULL,
  `idcustomer` int(11) NOT NULL,
  `unit` text,
  `keteranganrusak` text,
  `status` enum('Selesai','Belum Selesai','Kembali') DEFAULT NULL,
  `keterangankembali` text,
  `tglselesai` datetime DEFAULT NULL,
  `total` int(9) DEFAULT NULL,
  PRIMARY KEY (`idperbaikan`,`idcustomer`),
  KEY `fk_perbaikan_customer1_idx` (`idcustomer`),
  CONSTRAINT `fk_perbaikan_customer1` FOREIGN KEY (`idcustomer`) REFERENCES `customer` (`idcustomer`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `perbaikan` */

/*Table structure for table `suplier` */

DROP TABLE IF EXISTS `suplier`;

CREATE TABLE `suplier` (
  `idsuplier` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) DEFAULT NULL,
  `alamat` varchar(50) DEFAULT NULL,
  `telp` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`idsuplier`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

/*Data for the table `suplier` */

insert  into `suplier`(`idsuplier`,`nama`,`alamat`,`telp`) values (1,'pino kio','padang','9999'),(2,'rahadian','padang','99999'),(8,'aulia','padang','999'),(9,'rahadian aulia','padang','999'),(11,'rahadian aulia firda','padang','9999'),(12,'maxindo','padang','0000'),(15,'j-bros','padang','999'),(16,'awdwa','dawd','awdaw'),(17,'awd','sasd','asd'),(18,'awdqw','dqda','dawdawd'),(19,'pino','awd','awdawd'),(20,'awdaw','dawdaw','dawd'),(21,'asd','asdas','dawdwd'),(27,'pino kio','padang','0999'),(29,'','',''),(30,'','',''),(31,'add','sadas','dasdas'),(32,'lagi','padang','999'),(33,'asd','asd','asda'),(34,'adwd','awda','wdaw'),(35,'adasd','asdas','asdas');

/* Trigger structure for table `detailbeli` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `deletepembelian` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `deletepembelian` AFTER DELETE ON `detailbeli` FOR EACH ROW BEGIN
    update masterbarang set jumlahstock=jumlahstock-old.jumlah where idbarang=old.idbarang;
    END */$$


DELIMITER ;

/* Procedure structure for procedure `sp_addBarang` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_addBarang` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_addBarang`(aidbarang VARCHAR (13),anamabarang VARCHAR (50), aidjenis int, 
ahargasatuan DOUBLE, ahargajual double, ajumlahstock INT, asatuan VARCHAR (15), astockmin INT)
BEGIN
 
DECLARE checkMaster INT;
SELECT COUNT(*) INTO checkMaster FROM masterbarang WHERE idbarang = aidbarang; 
IF checkMaster = 0 THEN
	INSERT INTO masterbarang VALUES (aidbarang, anamabarang, aidjenis, ahargasatuan, ahargajual, ajumlahstock, asatuan, astockmin);
ELSE
	UPDATE masterbarang SET 
	jumlahstock = jumlahstock+ajumlahstock
	WHERE idbarang = aidbarang;
END IF;
 
END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
