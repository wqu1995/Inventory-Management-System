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

    public List<Warehouse> findAllWarehouse(){
        return warehouseRepo.findAll();
    }
}
