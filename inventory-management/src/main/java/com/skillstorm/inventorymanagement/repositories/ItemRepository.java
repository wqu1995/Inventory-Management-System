package com.skillstorm.inventorymanagement.repositories;

import com.skillstorm.inventorymanagement.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {

    @Query(value = "DELETE FROM Item i WHERE i.id = ?1")
    @Modifying
    @Transactional
    int costumeDeleteById(int id);
}
