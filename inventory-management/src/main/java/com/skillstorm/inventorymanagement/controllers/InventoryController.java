package com.skillstorm.inventorymanagement.controllers;

import com.skillstorm.inventorymanagement.models.Inventory;
import com.skillstorm.inventorymanagement.models.InventoryId;
import com.skillstorm.inventorymanagement.services.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventories")
@CrossOrigin
public class InventoryController {
    @Autowired
    InventoryService inventoryService;

    /**
     * Method to handle GET("/inventories") request
     *
     * @return the response entity
     */
    @GetMapping
    public ResponseEntity<List<Inventory>> findAllInventories(){
        List<Inventory> inventories = inventoryService.findAllInventories();


        return new ResponseEntity<>(inventories, HttpStatus.OK);

    }

    /**
     * Method to handle POST("/inventories/addInventory") request
     *
     * @param inventoryToBeAdded the inventory to be added
     * @return the response entity
     */
    @PostMapping("/addInventory")
    public ResponseEntity<Inventory> addInventory(@RequestBody Inventory inventoryToBeAdded){
        Inventory newInventory = inventoryService.addInventory(inventoryToBeAdded);

        return new ResponseEntity<>(newInventory, HttpStatus.CREATED);
    }

    /**
     * Method to handle PUT("/inventories/updateInventory") request
     *
     * @param inventoryToBeUpdated the inventory to be updated
     * @return the response entity
     */
    @PutMapping("/updateInventory")
    public ResponseEntity<Inventory> updateInventory(@RequestBody Inventory inventoryToBeUpdated){
        Inventory updatedInventory = inventoryService.addInventory(inventoryToBeUpdated);

        return new ResponseEntity<>(updatedInventory, HttpStatus.ACCEPTED);

    }

    /**
     * Method to handle DELETE("/inventories/deleteInventory") request
     *
     * @param inventoryToBeDeleted the inventory to be deleted
     * @return the response entity
     */
    @DeleteMapping("/deleteInventory")
    public ResponseEntity<Integer> deleteInventory(@RequestBody Inventory inventoryToBeDeleted){
        int rowAffected = inventoryService.deleteInventory(inventoryToBeDeleted);

        return new ResponseEntity<>(rowAffected, HttpStatus.OK);
    }
}

