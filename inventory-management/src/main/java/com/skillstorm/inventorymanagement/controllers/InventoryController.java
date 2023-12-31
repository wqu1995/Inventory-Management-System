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
    public ResponseEntity<Object> addInventory(@RequestBody Inventory inventoryToBeAdded){
        ResponseEntity<Object> serviceResponse = inventoryService.addInventory(inventoryToBeAdded);
        if(serviceResponse.getStatusCode() == HttpStatus.OK){
            return ResponseEntity.status(HttpStatus.CREATED).body(serviceResponse.getBody());
        }else{
            return serviceResponse;

        }
    }

    /**
     * Method to handle PUT("/inventories/updateInventory") request
     *
     * @param inventoryToBeUpdated the inventory to be updated
     * @return the response entity
     */
    @PutMapping("/updateInventory")
    public ResponseEntity<Object> updateInventory(@RequestBody Inventory inventoryToBeUpdated){

        ResponseEntity<Object> serviceResponse = inventoryService.addInventory(inventoryToBeUpdated);
        if(serviceResponse.getStatusCode() == HttpStatus.OK){
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(serviceResponse.getBody());
        }else{
            return serviceResponse;

        }
//        Object updatedInventory = inventoryService.addInventory(inventoryToBeUpdated);
//
//        return new ResponseEntity<>(updatedInventory, HttpStatus.ACCEPTED);

    }

    /**
     * Method to handle DELETE("/inventories/deleteInventory") request
     *
     * @param warehouseId the warehouse id
     * @param itemId      the item id
     * @return the response entity
     */
    @DeleteMapping("/deleteInventory/{warehouseId}/{itemId}")
    public ResponseEntity<Integer> deleteInventory(@PathVariable int warehouseId, @PathVariable int itemId){

        int rowAffected = inventoryService.deleteInventory(new InventoryId(warehouseId, itemId));

        return new ResponseEntity<>(rowAffected, HttpStatus.OK);
    }

    /**
     * Method to handle PUT("/inventories/updateInventoryById") request
     *
     *
     * @param inventoryToBeUpdated the inventory to be updated
     * @return the response entity
     */
    @PutMapping("/updateInventoryById")
    public ResponseEntity<Object> updateInventoryById(@RequestBody Inventory inventoryToBeUpdated){

        ResponseEntity<Object> serviceResponse = inventoryService.updateById(inventoryToBeUpdated);
        if(serviceResponse.getStatusCode() == HttpStatus.OK){
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(serviceResponse.getBody());
        }else{
            return serviceResponse;

        }
//

    }
}

