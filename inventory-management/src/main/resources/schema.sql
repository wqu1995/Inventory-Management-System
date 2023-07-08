drop table if exists warehouses;
drop table if exists items;

CREATE TABLE `warehouses` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50),
  `location` varchar(255),
  `size` integer,
  `capacity` integer
);
CREATE TABLE `items` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50),
  `description` varchar(255),
  `size` integer
);
