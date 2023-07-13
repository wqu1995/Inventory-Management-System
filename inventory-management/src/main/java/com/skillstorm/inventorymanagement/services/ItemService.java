package com.skillstorm.inventorymanagement.services;

import com.skillstorm.inventorymanagement.models.Inventory;
import com.skillstorm.inventorymanagement.models.Item;
import com.skillstorm.inventorymanagement.models.Warehouse;
import com.skillstorm.inventorymanagement.repositories.InventoryRepository;
import com.skillstorm.inventorymanagement.repositories.ItemRepository;
import com.skillstorm.inventorymanagement.repositories.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ItemService {
    @Autowired
    ItemRepository itemRepository;

    @Autowired
    InventoryRepository inventoryRepository;

    @Autowired
    WarehouseRepository warehouseRepository;

    /**
     * Find all items from the database.
     *
     * @return the list of items
     */
    public List<Item> findAllItems() {

        return itemRepository.findAll();
    }

    /**
     * Add/update item to database
     * Method will update the item entry in db if id is provided in the request body
     *
     * @param itemToBeAdded the item to be added
     * @return the item being added
     */
    public Item addItem(Item itemToBeAdded) {
        return itemRepository.save(itemToBeAdded);
    }

    /**
     * Delete item that matches the id in database.
     *
     * @param itemToBeDeleted the item to be deleted
     * @return the number of rows deleted
     */
    public int deleteItem(Integer itemToBeDeleted) {

        Item item = itemRepository.findById(itemToBeDeleted).orElse(null);

        if(item!=null){
            List<Inventory> inv = inventoryRepository.findAllByItem_Id(itemToBeDeleted);
            for(Inventory i : inv){
                Warehouse warehouse = i.getWarehouse();
                int decrement = item.getSize() * i.getQuantity();
                warehouse.setSize(warehouse.getSize()-decrement);
                warehouseRepository.save(warehouse);
            }
        }


        return itemRepository.costumeDeleteById(itemToBeDeleted);
    }

    public Set<Warehouse> getWarehousesByItemId(int id) {
        Item item = itemRepository.findById(id).orElse(null);
        if (item != null) {
            Set<Inventory> inventories = item.getInventories();
            return inventories.stream()
                    .map(Inventory::getWarehouse)
                    .collect(Collectors.toSet());
        }
        return new HashSet<>();
    }
}
