package com.skillstorm.inventorymanagement.repositories;

import com.skillstorm.inventorymanagement.models.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * The interface Warehouse repository.
 */
@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Integer> {
}
