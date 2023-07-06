CREATE TABLE `warehouses` (
  `id` integer UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(50),
  `location` varchar(255),
  `size` integer,
  `capacity` integer
);
