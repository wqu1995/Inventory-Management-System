package com.skillstorm.inventorymanagement.models;

import java.util.Set;

public interface WarehouseDTO {
    int getId();
    String getName();
    String getLocation();
    int getSize();
    int getCapacity();
    Set<Inventory> getInventories();
}
