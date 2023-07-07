package com.skillstorm.inventorymanagement.repositories;

import com.skillstorm.inventorymanagement.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
}
