CREATE TABLE `warehouses` (
  `id` integer UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(50),
  `location` varchar(255),
  `size` integer,
  `capacity` integer
);

CREATE TABLE `items` (
  `id` integer UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(50),
  `description` varchar(255),
  `size` int
);

CREATE TABLE `transactions` (
  `id` integer PRIMARY KEY,
  `item_id` integer,
  `warehouse_id` integer,
  `type` varchar(255)
);

CREATE TABLE `storage` (
  `item_id` integer,
  `warehouse_id` integer,
  `quantity` integer,
  PRIMARY KEY (`item_id`, `warehouse_id`)
);

ALTER TABLE `transactions` ADD FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);

ALTER TABLE `transactions` ADD FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`id`);

ALTER TABLE `storage` ADD FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);

ALTER TABLE `storage` ADD FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`id`);
