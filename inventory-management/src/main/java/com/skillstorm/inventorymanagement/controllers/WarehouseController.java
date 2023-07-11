package com.skillstorm.inventorymanagement.controllers;

import com.skillstorm.inventorymanagement.models.Warehouse;
import com.skillstorm.inventorymanagement.services.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/warehouses")
@CrossOrigin
public class WarehouseController {
    @Autowired
    WarehouseService warehouseService;


    /**
     * Method to handle GET(/warehouse) request.
     *
     * @return the response entity
     */
    @GetMapping
    public ResponseEntity<List<Warehouse>> findAllWarehouses(){
        List<Warehouse> warehouses = warehouseService.findAllWarehouse();

        return new ResponseEntity<>(warehouses, HttpStatus.OK);
    }


    /**
     * Method to handle POST(/warehouse/addWarehouse) request.
     *
     * @param warehouseToBeAdded the warehouse to be added
     * @return the response entity
     */
    @PostMapping("/addWarehouse")
    public ResponseEntity<Warehouse> addWarehouse(@RequestBody Warehouse warehouseToBeAdded){
        //System.out.println(warehouseToBeAdd.toString());
        Warehouse newWarehouse = warehouseService.addWarehouse(warehouseToBeAdded);

        return new ResponseEntity<>(newWarehouse, HttpStatus.CREATED);
    }

    /**
     * Method to handle PUT(/warehouse/updateWarehouse) request
     *
     * @param warehouseToBeUpdated the warehouse to be updated
     * @return the response entity
     */
    @PutMapping("/updateWarehouse")
    public ResponseEntity<Warehouse> updateWarehouse(@RequestBody Warehouse warehouseToBeUpdated){
        //System.out.println(warehouseToBeAdd.toString());
        Warehouse updatedWarehouse = warehouseService.addWarehouse(warehouseToBeUpdated);

        return new ResponseEntity<>(updatedWarehouse, HttpStatus.ACCEPTED);
    }

    /**
     * Method to handle DELETE(/warehouse/deleteWarehouse) request
     *
     * @param warehouseId the warehouseId to be deleted
     * @return the response entity
     */
    @DeleteMapping("/deleteWarehouse/{warehouseId}")
    public ResponseEntity<Integer> deleteWarehouse(@PathVariable Integer warehouseId){
        //System.out.println(warehouseToBeDeleted.toString());
        int response = warehouseService.deleteWarehouse(warehouseId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
