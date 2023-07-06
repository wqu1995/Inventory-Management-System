package com.skillstorm.inventorymanagement.services;

import com.skillstorm.inventorymanagement.models.Warehouse;
import com.skillstorm.inventorymanagement.repositories.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarehouseService {

    @Autowired
    WarehouseRepository warehouseRepo;

    /**
     * Find all warehouse from database.
     *
     * @return the list of warehouse
     */
    public List<Warehouse> findAllWarehouse(){
        return warehouseRepo.findAll();
    }

    /**
     * Add/update warehouse to database.
     * Function will update the warehouse entry in db if id is provided in the request body
     *
     * @param warehouseToBeAdd the warehouse to be add
     * @return the warehouse being added
     */
    public Warehouse addWarehouse(Warehouse warehouseToBeAdd) {
        return warehouseRepo.save(warehouseToBeAdd);
    }
}
