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

    @GetMapping
    public ResponseEntity<List<Warehouse>> findAllWarehouses(){
        List<Warehouse> warehouses = warehouseService.findAllWarehouse();

        return new ResponseEntity<>(warehouses, HttpStatus.OK);
    }

    @PostMapping("/addWarehouse")
    public ResponseEntity<Warehouse> addWarehouse(@RequestBody Warehouse warehouseToBeAdd){
        System.out.println(warehouseToBeAdd.toString());
        Warehouse newWarehouse = warehouseService.addWarehouse(warehouseToBeAdd);

        return new ResponseEntity<>(newWarehouse, HttpStatus.CREATED);
    }
}
