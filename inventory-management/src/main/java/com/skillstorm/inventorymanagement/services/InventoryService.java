package com.skillstorm.inventorymanagement.services;

import com.skillstorm.inventorymanagement.models.Inventory;
import com.skillstorm.inventorymanagement.models.InventoryId;
import com.skillstorm.inventorymanagement.models.Warehouse;
import com.skillstorm.inventorymanagement.repositories.InventoryRepository;
import com.skillstorm.inventorymanagement.repositories.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Object> addInventory(Inventory inventoryToBeUpdated) {

        //get warehouse associated with the inventory
        Warehouse warehouse = warehouseRepository.findById(inventoryToBeUpdated.getId().getWarehouseId()).orElse(null);


        if(warehouse != null){
            //check if an inventory entry is already existing in the database
            Inventory oldInv = inventoryRepository.findById(inventoryToBeUpdated.getId()).orElse(null);
            int increment;

            //update the warehouse size accordingly
            if(oldInv != null){
                int newQuant = inventoryToBeUpdated.getQuantity();
                int oldQuant = oldInv.getQuantity();

                increment = inventoryToBeUpdated.getItem().getSize() *(newQuant-oldQuant);

            }else{
                increment = inventoryToBeUpdated.getItem().getSize() * inventoryToBeUpdated.getQuantity();
            }

            //check if the newly added inventory will exceed warehouse capacity
            if(warehouse.getSize()+increment <= warehouse.getCapacity()){
                warehouse.setSize(warehouse.getSize()+increment);

                warehouseRepository.save(warehouse);
                Inventory res = inventoryRepository.save(inventoryToBeUpdated);
                return ResponseEntity.ok(res);

            }

        }
        //return bad request to client if the request fails
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Exceeded warehouse capacity");


    }

    /**
     * Update inventory by id.
     *
     * @param inventoryToBeUpdated the inventory to be updated
     * @return the response entity
     */
    public ResponseEntity<Object> updateById(Inventory inventoryToBeUpdated) {
        //get existing inventory
        Inventory existingInv = inventoryRepository.findById(inventoryToBeUpdated.getId()).orElse(null);
        if(existingInv!=null){
            //update the corresponding warehouse size
            Warehouse warehouse = existingInv.getWarehouse();
            int newQuant = inventoryToBeUpdated.getQuantity();
            int oldQuant = existingInv.getQuantity();

            int increment = existingInv.getItem().getSize() * (newQuant-oldQuant);
            if(warehouse.getSize()+increment <= warehouse.getCapacity()){
                warehouse.setSize(warehouse.getSize()+increment);

                warehouseRepository.save(warehouse);
                existingInv.setQuantity(inventoryToBeUpdated.getQuantity());
                Inventory res = inventoryRepository.save(existingInv);
                return ResponseEntity.ok(res);
            }
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Exceeded warehouse capacity");
    }
    /**
     * Delete inventory that matches the primary key in database.
     *
     * @param inventoryToBeDeleted the inventory to be deleted
     * @return the int
     */
    public int deleteInventory(InventoryId inventoryToBeDeleted) {
        Inventory inv = inventoryRepository.findById(inventoryToBeDeleted).orElse(null);
        if(inv!=null){
            Warehouse warehouse = warehouseRepository.findById(inv.getId().getWarehouseId()).orElse(null);
            if(warehouse!=null){
                //update the size
                warehouse.setSize(warehouse.getSize()-inv.getItem().getSize()*inv.getQuantity());
                warehouseRepository.save(warehouse);
            }
            //System.out.println(inv);
        }
        return inventoryRepository.costumeDeleteById(inventoryToBeDeleted);
    }


}
