package com.skillstorm.inventorymanagement.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

/**
 * The type Warehouse.
 */
@Entity
@Table(name = "warehouses")
public class Warehouse {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String name;

    @Column
    private String location;

    @Column
    private int size;

    @Column
    private int capacity;

    @OneToMany(mappedBy = "warehouse")
    @JsonManagedReference
    private Set<Inventory> inventories;

    public Warehouse() {
    }

    public Warehouse(String name, String location, int size, int capacity) {
        this.name = name;
        this.location = location;
        this.size = size;
        this.capacity = capacity;
    }

    public Warehouse(int id, String name, String location, int size, int capacity) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.size = size;
        this.capacity = capacity;
    }

    public Warehouse(int id, String name, String location, int size, int capacity, Set<Inventory> inventories) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.size = size;
        this.capacity = capacity;
        this.inventories = inventories;
    }

    public Set<Inventory> getInventories() {
        return inventories;
    }

    public void setInventories(Set<Inventory> inventories) {
        this.inventories = inventories;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Warehouse warehouse = (Warehouse) o;
        return id == warehouse.id && size == warehouse.size && capacity == warehouse.capacity && Objects.equals(name, warehouse.name) && Objects.equals(location, warehouse.location);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, location, size, capacity);
    }

    @Override
    public String toString() {
        return "Warehouse{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", size=" + size +
                ", capacity=" + capacity +
                ", inventories=" + inventories +
                '}';
    }
}
