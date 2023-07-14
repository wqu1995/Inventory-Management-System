package com.skillstorm.inventorymanagement.repositories;

import com.skillstorm.inventorymanagement.models.Inventory;
import com.skillstorm.inventorymanagement.models.InventoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, InventoryId> {

    @Query(value = "DELETE FROM Inventory i WHERE i.id = ?1")
    @Modifying
    @Transactional
    int costumeDeleteById(InventoryId id);

    List<Inventory> findAllByItem_Id(int itemId);

}
