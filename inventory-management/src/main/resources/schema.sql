drop table if exists inventories;
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

CREATE TABLE `inventories` (
  `item_id` integer,
  `warehouse_id` integer,
  `quantity` integer,
  PRIMARY KEY (`item_id`, `warehouse_id`)
);

ALTER TABLE `inventories` ADD FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `inventories` ADD FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`id`)ON DELETE CASCADE ON UPDATE CASCADE;