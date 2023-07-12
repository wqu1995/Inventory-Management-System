package com.skillstorm.inventorymanagement.repositories;

import com.skillstorm.inventorymanagement.models.Item;
import com.skillstorm.inventorymanagement.models.Warehouse;
import com.skillstorm.inventorymanagement.models.WarehouseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;


/**
 * The interface Warehouse repository.
 */
@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Integer> {

//    @Transactional
//    @Query("SELECT w FROM Warehouse w LEFT JOIN FETCH w.inventories i JOIN FETCH i.item WHERE w.id = :warehouseId")
//    Warehouse findByIdWithInventories(@Param("warehouseId") int warehouseId);
//    @Query("SELECT i.item FROM Inventory i WHERE i.warehouse.id = :warehouseId")
//    Set<Item> findItemsByWarehouseId(@Param("warehouseId") int warehouseId);

    @Query(value = "DELETE FROM Warehouse w WHERE  w.id = ?1")
    @Modifying
    @Transactional
    int costumeDeleteById(int id);
}
