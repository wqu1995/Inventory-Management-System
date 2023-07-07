drop table if exists items;

CREATE TABLE `items` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50),
  `description` varchar(255),
  `size` integer
);