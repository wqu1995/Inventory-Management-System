package com.skillstorm.inventorymanagement.repositories;

import com.skillstorm.inventorymanagement.models.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


/**
 * The interface Warehouse repository.
 */
@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Integer> {

    @Query(value = "DELETE FROM Warehouse w WHERE  w.id = ?1")
    @Modifying
    @Transactional
    int costumeDeleteById(int id);
}
