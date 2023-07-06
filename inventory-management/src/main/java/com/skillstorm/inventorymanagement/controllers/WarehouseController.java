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
     * @param warehouseToBeAdd the warehouse to be add
     * @return the response entity
     */
    @PostMapping("/addWarehouse")
    public ResponseEntity<Warehouse> addWarehouse(@RequestBody Warehouse warehouseToBeAdd){
        //System.out.println(warehouseToBeAdd.toString());
        Warehouse newWarehouse = warehouseService.addWarehouse(warehouseToBeAdd);

        return new ResponseEntity<>(newWarehouse, HttpStatus.CREATED);
    }

    /**
     * Method to handle PUT(/warehouse/updateWarehouse) request
     *
     * @param warehouseToBeUpdate the warehouse to be update
     * @return the response entity
     */
    @PutMapping("/updateWarehouse")
    public ResponseEntity<Warehouse> updateWarehouse(@RequestBody Warehouse warehouseToBeUpdate){
        //System.out.println(warehouseToBeAdd.toString());
        Warehouse updatedWarehouse = warehouseService.addWarehouse(warehouseToBeUpdate);

        return new ResponseEntity<>(updatedWarehouse, HttpStatus.ACCEPTED);
    }
}
