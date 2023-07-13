package com.skillstorm.inventorymanagement.services;

import com.skillstorm.inventorymanagement.models.Inventory;
import com.skillstorm.inventorymanagement.models.InventoryId;
import com.skillstorm.inventorymanagement.models.Warehouse;
import com.skillstorm.inventorymanagement.repositories.InventoryRepository;
import com.skillstorm.inventorymanagement.repositories.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {
    @Autowired
    InventoryRepository inventoryRepository;

    @Autowired
    WarehouseRepository warehouseRepository;

    /**
     * Find all inventories from the database.
     *
     * @return the list
     */
    public List<Inventory> findAllInventories() {
        return inventoryRepository.findAll();
    }

    /**
     * Add/update inventory to database.
     * Method will update the inventory entry in db if warehouse_id and item_id are provided in the request body
     *
     * @param inventoryToBeUpdated the inventory to be updated
     * @return the inventory
     */
    public Inventory addInventory(Inventory inventoryToBeUpdated) {

        Warehouse warehouse = warehouseRepository.findById(inventoryToBeUpdated.getId().getWarehouseId()).orElse(null);

        if(warehouse != null){
            System.out.println(warehouse.getSize()+" "+inventoryToBeUpdated.getItem()+" "+ inventoryToBeUpdated.getQuantity());
            int increment = inventoryToBeUpdated.getItem().getSize() * inventoryToBeUpdated.getQuantity();
            warehouse.setSize(warehouse.getSize()+increment);
            System.out.println(warehouse.getSize());

            warehouseRepository.save(warehouse);
        }

        return inventoryRepository.save(inventoryToBeUpdated);
        //return inventoryRepository.save(inventoryToBeUpdated);
    }

    /**
     * Delete inventory that matches the primary key in database.
     *
     * @param inventoryToBeDeleted the inventory to be deleted
     * @return the int
     */
    public int deleteInventory(InventoryId inventoryToBeDeleted) {
        return inventoryRepository.costumeDeleteById(inventoryToBeDeleted);
    }
}
