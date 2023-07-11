package com.skillstorm.inventorymanagement.models;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class InventoryId implements Serializable {

    @Column(name = "warehouse_id")
    private int warehouseId;

    @Column(name = "item_id")
    private int itemId;

    public InventoryId() {
    }

    public InventoryId(int warehouseId, int itemId) {
        this.warehouseId = warehouseId;
        this.itemId = itemId;
    }

    public int getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(int warehouseId) {
        this.warehouseId = warehouseId;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        InventoryId that = (InventoryId) o;
        return warehouseId == that.warehouseId && itemId == that.itemId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(warehouseId, itemId);
    }

    @Override
    public String toString() {
        return "InventoryId{" +
                "warehouseId=" + warehouseId +
                ", itemId=" + itemId +
                '}';
    }


}
