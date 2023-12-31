package com.skillstorm.inventorymanagement.controllers;

import com.skillstorm.inventorymanagement.models.Item;
import com.skillstorm.inventorymanagement.models.Warehouse;
import com.skillstorm.inventorymanagement.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/items")
@CrossOrigin
public class ItemController {

    @Autowired
    ItemService itemService;

    /**
     * Method to handle GET("/items") request
     *
     * @return the response entity
     */
    @GetMapping
    public ResponseEntity<List<Item>> findAllItems(){
        List<Item> items = itemService.findAllItems();

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    /**
     * Method to handle POST("/items/addItem") request
     *
     * @param itemToBeAdded the item to be added
     * @return the response entity
     */
    @PostMapping("/addItem")
    public ResponseEntity<Item> addItem(@RequestBody Item itemToBeAdded){
        Item newItem = itemService.addItem(itemToBeAdded);

        return new ResponseEntity<>(newItem, HttpStatus.CREATED);
    }

    /**
     * Method to handle PUT("/items/updateItem") request.
     *
     * @param itemToBeUpdated the item to be updated
     * @return the response entity
     */
    @PutMapping("/updateItem")
    public ResponseEntity<Item> updateItem(@RequestBody Item itemToBeUpdated){
        Item updatedItem = itemService.uppdateItem(itemToBeUpdated);

        return new ResponseEntity<>(updatedItem, HttpStatus.ACCEPTED);
    }

    /**
     * Method to handle DELETE("/items/deleteItem") request.
     *
     * @param itemId the item id
     * @return the response entity
     */
    @DeleteMapping("/deleteItem/{itemId}")
    public ResponseEntity<Integer> deleteItem(@PathVariable Integer itemId){
        int rowsAffected = itemService.deleteItem(itemId);

        return new ResponseEntity<>(rowsAffected, HttpStatus.OK);
    }

    /**
     * Method to handle GET("/items/item/{id})request, to get the item with the requested id
     *
     * @param id the id
     * @return the response entity
     */
    @GetMapping("/item/{id}")
    public ResponseEntity<Set<Warehouse>> getWarehousesByItemId(@PathVariable int id){
        Set<Warehouse> result = itemService.getWarehousesByItemId(id);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
