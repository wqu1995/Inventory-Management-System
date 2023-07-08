package com.skillstorm.inventorymanagement.services;

import com.skillstorm.inventorymanagement.models.Item;
import com.skillstorm.inventorymanagement.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    @Autowired
    ItemRepository itemRepository;

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
    public int deleteItem(Item itemToBeDeleted) {
        return itemRepository.costumeDeleteById(itemToBeDeleted.getId());
    }
}
