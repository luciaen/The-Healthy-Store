CREATE DATABASE  IF NOT EXISTS `the_healthy_store` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `the_healthy_store`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: the_healthy_store
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.13-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(45) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Leches',NULL,NULL,NULL),(2,'Aceites',NULL,NULL,NULL),(3,'Endulzantes',NULL,NULL,NULL),(4,'Harinas',NULL,NULL,NULL),(5,'Pastas',NULL,NULL,NULL),(6,'Frutos-Secos',NULL,NULL,NULL),(7,'Granolas',NULL,NULL,NULL),(8,'Viandas',NULL,NULL,NULL),(9,'Bebidas',NULL,NULL,NULL),(10,'Postres',NULL,NULL,NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `recomended` varchar(45) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId_idx` (`categoryId`),
  CONSTRAINT `categoryId` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Aceite de Coco Orgánico','Virgen primera prensada',500,500.00,2,30,'noRecomendado','producto-1596984815473.jpg',NULL,'2020-08-09 14:53:35',NULL),(2,'Aceite de coco  virgen',' x 225 ml - God Bless Yo',14,650.00,2,0,'vendido','aceite-coco-2.jpg',NULL,'2020-08-09 15:18:30',NULL),(3,'Aceite de oliva ','x 250cc - Esquina de Crotto  Agroecológico ',35,400.00,2,0,'noRecomendado','aceite-4.jpg',NULL,'2020-08-12 21:19:25',NULL),(4,'Aceite de oliva ','Producto San Juan',23,320.00,2,30,'noRecomendado','aceite-5.png',NULL,'2020-08-09 14:45:15',NULL),(5,'Aceto balsamico ','Producto Mendoza',14,356.00,2,15,'noRecomendado','aceite-6.jpg',NULL,'2020-08-09 14:46:14',NULL),(6,'Vinagre de Manzana ',' Pampa Gourmet Producto San Juan',50,134.00,2,0,'noRecomendado','aceite-7.jpg',NULL,'2020-08-09 15:19:14',NULL),(7,'Vinagre de vino blanco ','Producto Mendoza',12,234.00,2,0,'noRecomendado','aceite-8.jpg',NULL,'2020-08-09 15:19:34',NULL),(8,'Vinagre de vino ','Producto San Juan',15,245.00,2,0,'noRecomendado','aceite-9.jpg',NULL,'2020-08-09 15:20:05',NULL),(9,'Arroz Chia para Sushi','Producto Uruguayo',12,80.00,5,0,'noRecomendado','pastas-1.jpg',NULL,NULL,NULL),(10,'Arroz integral','Producto Brasil',9,99.00,5,0,'noRecomendado','pastas-2.jpg',NULL,NULL,NULL),(11,'Arroz Yamani','Producto Brasil',11,80.00,5,15,'noRecomendado','pastas-3.jpg',NULL,NULL,NULL),(12,'Pasta 3 sabores','Producto Uruguayo',23,78.00,5,30,'noRecomendado','pastas-4.jpg',NULL,NULL,NULL),(13,'Pasta de Garbanzo',' Producto garantizado para comenzar bien',43,65.00,5,30,'noRecomendado','pastas-5.jpg',NULL,NULL,NULL),(14,'Pasta de Chia','Producto Tucumano',23,120.00,5,0,'noRecomendado','pastas-6.jpg',NULL,NULL,NULL),(15,'Pasta de Lenteja','Producto Uruguayo',4,67.00,5,0,'vendido','pastas-7.jpg',NULL,NULL,NULL),(16,'Pasta de Quinoa','Producto Brasil',23,190.00,5,15,'noRecomendado','pastas-8.jpg',NULL,NULL,NULL),(17,'Azucar Integral de caña ',' Segunda molienda con mucha melaza',14,130.00,3,0,'noRecomendado','endulzante-1.jpg',NULL,'2020-08-09 15:06:56',NULL),(18,'Azucar orgánica','Producto Tucumán',23,180.00,3,0,'vendido','endulzante-3.jpg',NULL,'2020-08-09 15:12:29',NULL),(19,'Miel natural','Producto de Jujuy',15,120.00,3,0,'noRecomendado','endulzante-2.jpg',NULL,'2020-08-09 15:14:04',NULL),(20,'Azucar de Coco',' Producto Canadiense ideal para los desayunos',54,500.00,3,0,'noRecomendado','endulzante-4.png',NULL,NULL,NULL),(21,'Miel de Entre Rios',' Envasada en origen con el mayor esmero y dedicacion de las Monjas Benedictas',12,340.00,3,0,'noRecomendado','endulzante-5.jpg',NULL,NULL,NULL),(22,'Stevia envasada',' Contiene 100 sobres',34,234.00,3,0,'noRecomendado','endulzante-6.jpg',NULL,'2020-08-09 15:13:29',NULL),(23,'Jarabe de Maple',' Especial para panificación y postres',12,200.00,3,30,'noRecomendado','endulzante-7.jpg',NULL,'2020-08-09 15:14:54',NULL),(24,'Stevia',' El mejor endulzante natural procucto de Amazonas',16,180.00,3,15,'noRecomendado','endulzante-8.jpg',NULL,NULL,NULL),(25,'Almendras peladas ','Producto Jujeño',34,156.00,6,15,'noRecomendado','frutos-secos-1.jpg',NULL,'2020-08-09 15:14:29',NULL),(26,'Combo power con frutas','Producto Brasil',12,124.00,6,30,'noRecomendado','frutos-secos-2.jpg',NULL,'2020-08-09 15:20:55',NULL),(27,'Dátiles seleccionados ','Marruecos',16,200.00,6,0,'noRecomendado','frutos-secos-3.jpg',NULL,'2020-08-09 15:20:32',NULL),(28,'Mani colorado','Producto Bariloche',43,130.00,6,0,'noRecomendado','frutos-secos-4.jpg',NULL,'2020-08-09 15:09:02',NULL),(29,'Mix de Pistacchio',' Origen Bolivia',11,120.00,6,15,'noRecomendado','frutos-secos-5.jpg',NULL,NULL,NULL),(30,'Mix de frutas secas ',' Producto Marruecos',13,140.00,6,0,'noRecomendado','frutos-secos-6.jpg',NULL,'2020-08-09 15:21:33',NULL),(31,'Mix de frutas sin Mani',' Origen Santiago del Estero',12,130.00,6,0,'vendido','frutos-secos-7.jpg',NULL,NULL,NULL),(32,'Ciruelas disecadas','San Pedro',16,200.00,6,0,'recomendado','frutos-secos-8.jpg',NULL,'2020-08-09 15:08:10',NULL),(33,'Granola almendrada','Producto Bariloche  - Sabor Almendra orgánicas',40,200.00,7,0,'noRecomendado','granola-1.jpg',NULL,'2020-08-09 15:22:01',NULL),(34,'Granola con chocolate','Producto Bariloche  - Sabor Chocolate blanco ',15,220.00,7,0,'noRecomendado','granola-2.jpg',NULL,'2020-08-09 15:22:46',NULL),(35,'Granola de Quinua',' Origen Santiago del Estero  - Sabor Naranja dulce y nueces',20,235.00,7,30,'noRecomendado','granola-3.jpg',NULL,'2020-08-09 15:23:11',NULL),(36,'Granola con proteinas',' Origen Santiago del Estero',45,264.00,7,15,'noRecomendado','granola-9.jpeg',NULL,'2020-08-09 15:23:31',NULL),(37,'Granola  ',' Producto garantizado para comenzar bien',35,180.00,7,0,'noRecomendado','granola-5.jpg',NULL,'2020-08-09 15:24:10',NULL),(38,'Granola  con nueces',' Producto garantizado para comenzar bien',25,195.00,7,0,'noRecomendado','granola-6.jpg',NULL,NULL,NULL),(39,'Granola reforzada',' Origen Santiago del Estero',10,120.00,7,0,'noRecomendado','granola-7.jpg',NULL,'2020-08-09 15:27:55',NULL),(40,'Mani  seleccionado',' Origen Santiago del Estero',11,150.00,7,0,'recomendado','granola-8.jpg',NULL,'2020-08-09 15:09:37',NULL),(41,'Harina de Almendras','por 100 g',10,180.00,4,0,'noRecomendado','harina-1.png',NULL,NULL,NULL),(42,'Harina de Maiz','Producto Brazil',12,120.00,4,0,'noRecomendado','harina-2.png',NULL,'2020-08-09 15:10:10',NULL),(43,'Harina de Frutos secos',' Especial del mes Shaltzi',11,120.00,4,0,'noRecomendado','harina-10.jpg',NULL,NULL,NULL),(44,'Harina de Mandioca ',' Especial del mes Shaltzi',12,150.00,4,15,'noRecomendado','harina-4.png',NULL,'2020-08-09 15:10:48',NULL),(45,'Harina de Coco',' Producto de Brasil ',32,153.00,4,15,'noRecomendado','harina-5.jpg',NULL,NULL,NULL),(46,'Harina de Quinua',' Molida sin mezcla',52,145.00,4,0,'noRecomendado','Harina-3.png',NULL,NULL,NULL),(47,'Harina Orgánica','Molida a piedras',24,123.00,4,30,'noRecomendado','harina-7.jpg',NULL,NULL,NULL),(48,'Harina Integral',' Especial para panificación y postres',12,150.00,4,0,'recomendado','harina-8.jpg',NULL,'2020-08-09 15:17:11',NULL),(49,'Jugo de Ciruelas ','Importado de Uruguay',8,90.00,9,0,'recomendado','Jugo-1.jpg',NULL,'2020-08-09 15:11:47',NULL),(50,'Jugo de Coco ','Producto Brasil sin conservantes',11,100.00,9,0,'noRecomendado','Jugo-2.jpg',NULL,'2020-08-09 15:13:03',NULL),(51,'Jugo de Durazno',' Producto San Juan',20,120.00,9,0,'noRecomendado','Jugo-3.jpg',NULL,'2020-08-09 15:24:47',NULL),(52,'Jugo de hojas verdes','Natural - Desintoxicante y rico',15,85.00,9,0,'noRecomendado','Jugo-4.jpg',NULL,'2020-08-09 15:25:15',NULL),(53,'Coco mezcla','Sin conservantes  - Pura Fruta',10,120.00,9,0,'noRecomendado','Jugo-5.png',NULL,'2020-08-09 15:25:44',NULL),(54,'Jugo Zanahoria',' Origen Santiago del Estero',12,150.00,9,30,'noRecomendado','Jugo-6.png',NULL,'2020-08-09 15:26:12',NULL),(55,'Jugo de Mandarinas ','Sin conservantes - Producto San Luis',11,115.00,9,15,'noRecomendado','Jugo-7.png',NULL,'2020-08-09 15:26:37',NULL),(56,'Manzana orgánico ',' Muy recomendado - Pura fruta',12,120.00,9,15,'noRecomendado','Jugo-8.jpg',NULL,'2020-08-12 20:50:27',NULL),(57,'Almendra cacao','Sin conservantes - Cocoon',11,120.00,1,15,'noRecomendado','leche-1.png',NULL,NULL,NULL),(58,'Almendra pura','Sin conservantes -  Cocoon',12,320.00,1,15,'noRecomendado','leche-2.jpeg',NULL,NULL,NULL),(59,'Almendras y hierro','Sin Azucar con 45% hierro',15,270.00,1,0,'noRecomendado','leche-3.jpg',NULL,NULL,NULL),(60,'Organica','Orgánico - sin azucar',11,250.00,1,0,'noRecomendado','leche-4.png',NULL,NULL,NULL),(61,'Almendra calcio','Natural con Calcio',10,150.00,1,0,'noRecomendado','leche-5.png',NULL,NULL,NULL),(62,'Almendra mineral','reforzada 45% con minerales',9,300.00,1,0,'noRecomendado','leche-6.jpeg',NULL,'2020-08-09 15:15:32',NULL),(63,'Castañas de caju','Leche - Producto Brazil',5,230.00,1,0,'noRecomendado','leche-8.jpeg',NULL,'2020-08-09 15:31:47',NULL),(64,'Not-Milk de soya ','Producido en San Vicente',24,180.00,1,0,'recomendado','leche-9.jpeg',NULL,'2020-08-09 15:16:09',NULL),(65,'Tarta de Calabaza','Masa integral, 200 g',10,90.00,8,0,'recomendado','viandas-1.jpg',NULL,NULL,NULL),(66,'ñoquis de batata','sin conservantes ni harinas refinadas',12,180.00,8,0,'noRecomendado','viandas-2.jpg',NULL,NULL,NULL),(67,'Hamburguesa de garbanzos','Puede contener derivados del gluten',12,150.00,8,15,'noRecomendado','viandas-3.jpg',NULL,NULL,NULL),(68,'Albondigas de acelga','Rinde dos porciones',12,250.00,8,15,'noRecomendado','viandas-4.jpg',NULL,NULL,NULL),(69,'Lasagna de vegetales','de espinaca con queso',14,280.00,8,0,'noRecomendado','viandas-5.jpg',NULL,NULL,NULL),(70,'Noodles de zuquini','con bolognesa de trigo texturizado',12,180.00,8,30,'recomendado','viandas-6.jpg',NULL,NULL,NULL),(71,'Hamburguesas vegetales ','Haburguesas de garbanzos y budin de acelga',10,250.00,8,0,'noRecomendado','viandas-7.jpg',NULL,NULL,NULL),(72,'Pollo al champignon ','Guarnicion de budin de espinaca',8,250.00,8,0,'noRecomendado','viandas-8.jpg',NULL,NULL,NULL),(73,'Alfajor con dulce','Natural 75 cal',10,200.00,10,0,'recomendado','postres-1.jpg',NULL,NULL,NULL),(74,'Tiramisu','Con mascarpone',5,300.00,10,0,'noRecomendado','postres-2.jpg',NULL,NULL,NULL),(75,'Cup Mani','Apto celiacos',12,250.00,10,0,'noRecomendado','postres-3.jpg',NULL,NULL,NULL),(76,'Chocotorta','Sin Harina',5,200.00,10,0,'noRecomendado','postres-4.jpg',NULL,NULL,NULL),(77,'Lemonies','sin huevo',6,150.00,10,0,'noRecomendado','postres-5.jpeg',NULL,NULL,NULL),(78,'Biscotti','pura miel',8,200.00,10,0,'noRecomendado','postres-6.jpg',NULL,NULL,NULL),(79,'De Arroz','muy suaves',12,100.00,10,0,'noRecomendado','postres-7.jpg',NULL,NULL,NULL),(80,'Muffins','de caramelo',13,250.00,10,0,'noRecomendado','postres-8.jpg',NULL,NULL,NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shoppingcart`
--

DROP TABLE IF EXISTS `shoppingcart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shoppingcart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usedId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `transactionId` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `transactionId_idx` (`transactionId`),
  KEY `userId_idx` (`usedId`),
  KEY `productId_idx` (`productId`),
  CONSTRAINT `productId` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `transactionId` FOREIGN KEY (`transactionId`) REFERENCES `transactions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userId` FOREIGN KEY (`usedId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoppingcart`
--

LOCK TABLES `shoppingcart` WRITE;
/*!40000 ALTER TABLE `shoppingcart` DISABLE KEYS */;
/*!40000 ALTER TABLE `shoppingcart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `paymentMethod` varchar(45) DEFAULT NULL,
  `deliveryMethod` varchar(45) DEFAULT NULL,
  `totalAmount` decimal(10,2) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `email` varchar(55) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `admin` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'Dani','Edu','profes@dhouse.com',12344647,'$2a$10$maf6hGBtHwihwie1krbrMutXz/YeOBA4KGoRtv2liuOaG10lH3z86','userUndefined.jpg',1,'2020-08-14 00:32:42','2020-08-14 00:32:42',NULL),(7,'Lucia','Enriquez','luli@gmail.com',4534314,'$2a$10$y03kLVjd0N/365tVCSNpgORSRLdx4rlCWeHARIW1jfb/HUFMtdOce','usuario-1597365311748.JPG',1,'2020-08-14 00:35:12','2020-08-14 00:35:12',NULL),(8,'Federico','Cuello','fede@gmail.com',12143565,'$2a$10$Jh3PXQIQTMZrgJaIckv9K.C5sGGsjEs9KYcZBimWHBIJWQsM7D5Te','usuario-1597365428944.jpg',1,'2020-08-14 00:37:33','2020-08-14 00:37:33',NULL),(9,'Ronaldo','Quinn','ronacho07@gmail.com',124354664,'$2a$10$OBrJWVW1.h0Mpv/P.ylP8.AiT8ia4.JC4Xt1FnopA0QRWPnpn5rXi','usuario-1597365659046.PNG',1,'2020-08-14 00:41:34','2020-08-14 00:41:34',NULL),(10,'Juan','Perez','juanp@gmail.com',12335467,'$2a$10$4g5QmIttdSvA6Nrq3mdOb.BcDmSok9a0EI8rCMGEs5RYvm/w6LG8m','userUndefined.jpg',0,'2020-08-14 00:43:03','2020-08-14 00:43:03',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-13 22:18:02
