package com.skillstorm.inventorymanagement.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

/**
 * The type Item.
 */
@Entity
@Table(name = "items")
public class Item {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private int size;


    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
   // @JsonIgnore
    private Set<Inventory> inventories;

    public Item() {
    }

    public Item(String name, String description, int size) {
        this.name = name;
        this.description = description;
        this.size = size;
    }

    public Item(int id, String name, String description, int size) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.size = size;
    }

    public Item(int id, String name, String description, int size, Set<Inventory> inventories) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.size = size;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Item item = (Item) o;
        return id == item.id && size == item.size && Objects.equals(name, item.name) && Objects.equals(description, item.description);

    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, size);
    }

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", size=" + size +
                ", inventories=" + inventories +
                '}';
    }
}
