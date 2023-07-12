package com.skillstorm.inventorymanagement.services;

import com.skillstorm.inventorymanagement.models.Inventory;
import com.skillstorm.inventorymanagement.models.Item;
import com.skillstorm.inventorymanagement.models.Warehouse;
import com.skillstorm.inventorymanagement.models.WarehouseDTO;
import com.skillstorm.inventorymanagement.repositories.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
     * @param warehouseToBeAdded the warehouse to be add
     * @return the warehouse being added
     */
    public Warehouse addWarehouse(Warehouse warehouseToBeAdded) {
        return warehouseRepo.save(warehouseToBeAdded);
    }

    /**
     * Delete warehouse that matches the id in database.
     *
     * @param warehouseId the warehouseId to be deleted
     * @return the int
     */
    public int deleteWarehouse(Integer warehouseId) {
        //System.out.println(warehouseToBeDeleted.toString());
        return warehouseRepo.costumeDeleteById(warehouseId);
    }

    public Set<Item> getItemsByWarehouseId(int id) {
//        Warehouse warehouse = warehouseRepo.findByIdWithInventories(id);
//        if(warehouse!=null){
//            System.out.println(warehouse.toString());
//            return warehouse.getInventories().stream().map(Inventory::getItem).collect(Collectors.toSet());
//
//            // return warehouse.getInventories().stream().map(Inventory::getItem).collect(Collectors.toSet());
//        }
//        return null;

        System.out.println(id);
        Warehouse warehouse = warehouseRepo.findById(id).orElse(null);
        if(warehouse!=null){
            //System.out.println(warehouse.toString());
            Set<Inventory> inventories = warehouse.getInventories();

            return inventories.stream().map(Inventory::getItem).collect(Collectors.toSet());
        }
        return new HashSet<>();
    }
}
