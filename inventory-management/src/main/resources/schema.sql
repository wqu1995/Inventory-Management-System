drop table if exists warehouses;

CREATE TABLE `warehouses` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50),
  `location` varchar(255),
  `size` integer,
  `capacity` integer
);
