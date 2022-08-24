# Node crash course

This project is the result of my following a video series I found on youtube.  You can find this video series here:

https://www.youtube.com/watch?v=zb3Qk8SG5Ms&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=1

Many thanks to "The Net Ninja" for providing such a great introduction to node js.

Although I followed the series from start to end, I did deviate from it a bit.  Instead of using mongodb, I decided to give it a go using the latest version of MySQL that was available at the time of this writing (v8.0.30).  If you want to make it work, you can change the connection parameters in the dbConnect.js file to suit your needs.  Below is the SQL for the table I created for this project.  I exported it using phpMyAdmin v5.2.0:

CREATE TABLE `blog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `snippet` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `body` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdTS` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `createdTS` (`createdTS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

I hope you find this useful...