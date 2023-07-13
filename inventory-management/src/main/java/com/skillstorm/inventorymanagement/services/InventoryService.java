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

        Warehouse warehouse = warehouseRepository.findById(inventoryToBeUpdated.getId().getWarehouseId()).orElse(null);


        if(warehouse != null){
            Inventory oldInv = inventoryRepository.findById(inventoryToBeUpdated.getId()).orElse(null);
            int increment;
            if(oldInv != null){
                //System.out.println(oldInv.getQuantity()+" "+inventoryToBeUpdated.getQuantity());
                int newQuant = inventoryToBeUpdated.getQuantity();
                int oldQuant = oldInv.getQuantity();

                increment = inventoryToBeUpdated.getItem().getSize() *(newQuant-oldQuant);

            }else{
                increment = inventoryToBeUpdated.getItem().getSize() * inventoryToBeUpdated.getQuantity();
            }
            System.out.println(warehouse.getSize()+" "+increment+" "+ warehouse.getCapacity());
            if(warehouse.getSize()+increment <= warehouse.getCapacity()){
                warehouse.setSize(warehouse.getSize()+increment);
                //System.out.println(warehouse.getSize());

                warehouseRepository.save(warehouse);
                Inventory res = inventoryRepository.save(inventoryToBeUpdated);
                return ResponseEntity.ok(res);

            }

            //System.out.println(warehouse.getSize()+" "+inventoryToBeUpdated.getItem()+" "+ inventoryToBeUpdated.getQuantity())
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Exceeded warehouse capacity");


        //return inventoryRepository.save(inventoryToBeUpdated);
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
