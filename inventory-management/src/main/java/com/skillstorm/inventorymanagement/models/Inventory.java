package com.skillstorm.inventorymanagement.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "inventories")
public class Inventory {
    @EmbeddedId
    private InventoryId id;

    @ManyToOne
    @MapsId("warehouseId")
    @JsonBackReference

    //@JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    @ManyToOne
    @MapsId("itemId")
    @JsonBackReference

    //@JoinColumn(name = "item_id")
    private Item item;

    @Column
    private int quantity;

    public Inventory() {
    }

    public Inventory(InventoryId id, int quantity) {
        this.id = id;
        this.quantity = quantity;
    }

    public Inventory(InventoryId id, Warehouse warehouse, Item item, int quantity) {
        this.id = id;
        this.warehouse = warehouse;
        this.item = item;
        this.quantity = quantity;
    }
    public Warehouse getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public InventoryId getId() {
        return id;
    }

    public void setId(InventoryId id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "Inventory{" +
                "id=" + id +
                ", warehouse=" + warehouse +
                ", item=" + item +
                ", quantity=" + quantity +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Inventory inventory = (Inventory) o;
        return quantity == inventory.quantity && Objects.equals(id, inventory.id) && Objects.equals(warehouse, inventory.warehouse) && Objects.equals(item, inventory.item);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, warehouse, item, quantity);
    }

}
