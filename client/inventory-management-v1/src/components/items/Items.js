import React, { useEffect, useState } from 'react'
import api from '../../api/axiosConfig';
import { Table, Button } from 'react-bootstrap';
import AddItemModal from './AddItemModal';
import ItemDetail from './ItemDetail';


function Items() {
    const [items, setItems] = useState();

    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [warehouses, setWarehouses] = useState([]);

    const getItems = () =>{
        api.get("/items").then((response) =>{
            setItems(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }

    const handleShowAddItemModal = () =>{
        setShowAddItemModal(true);
    }

    const handleAddItem = (addItemData) =>{
        api.post("/items/addItem", addItemData).then((response)=>{
            if(response.status===201 && response.data){
                setItems([...items, response.data]);
            }
        }).catch((error)=>{
            console.log(error);
        })
        //console.log(addItemData);
    }

    const handleDeleteItem = (deleteItemData) =>{
        const confirm = window.confirm('Are you sure you want to delete this item?');
        if(confirm){
            api.delete(`/items/deleteItem/${deleteItemData.id}`).then((response) =>{
                if(response.status === 200){
                    setItems(prevItems => prevItems.filter(item => item.id !== deleteItemData.id))
                }
                setSelectedItem(null);
                setWarehouses([]);
            }).catch((error) =>{
                console.log(error);
            })
        }
    }

    const handleEditItem = (editItemData)=>{
        //console.log(editItemData);
        api.put("/items/updateItem", editItemData).then((response)=>{
            if(response.status === 202 && response.data){
                //console.log("good")
                setItems((prevItems)=>
                prevItems.map((item)=>(item.id === response.data.id ? response.data : item))
                );
                //setSelectedItem(null);
                //setWarehouses([]);
                setSelectedItem(response.data);
                handleGetWarehouseByItemId(response.data.id);
            }
        }).catch((error) =>{
            console.log(error);
        })
    }

    const handleGetWarehouseByItemId =(itemId) =>{
            api.get(`/items/item/${itemId}`).then((response) =>{
                if(response.status === 200 && response.data){
                    const updatedWarehouses = response.data.map((warehouse) =>{
                        const inventory = warehouse.inventories.find(
                            (inv) => inv.id.itemId === itemId
                        );
                        const quantity = inventory ? inventory.quantity : 0;
                        return {...warehouse, quantity};
                    });
                    setWarehouses(updatedWarehouses);
                    
                }
            }).catch((error)=>{
                console.log(error)
            })

    }

    const handleItemClick = (item) => {
        //console.log(selectedItem)
        if(selectedItem === item){
            setSelectedItem(null);
        }else{
            handleGetWarehouseByItemId(item.id);
            setSelectedItem(item);
        }
    };
    const handleItemClose = () =>{
        setSelectedItem(null);
    }

    const update = (type, warehouseId, quant) =>{
        if(type === "delete"){
            setWarehouses(prevWarehouse => prevWarehouse.filter(wh => wh.id !== warehouseId))
        }
        if(type ==="update"){
            //console.log(warehouseId + quant);
            setWarehouses(prevWarehouse =>prevWarehouse.map(wh =>{
                if(wh.id === warehouseId){
                    return {
                        ...wh,
                        quantity : quant
                    };
                }
                return wh;
            }))
        }
    }

    useEffect(()=>{
        getItems();
    },[])

    return (
        <div>

            <div className="items-container">
                <div className="items-table">
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                        <h1>Items</h1>
                        <Button variant = "primary" className='custom-button' onClick={handleShowAddItemModal}>Add Item</Button>
                    </div>
                    <Table striped bordered hover size='sm' className='custom-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items?.map((item)=>(
                                <tr  key={item.id} onClick={(e) => { e.stopPropagation(); handleItemClick(item); }}>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.size}</td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>

                </div>

                <ItemDetail
                selectedItem = {selectedItem}
                warehouses = {warehouses}
                handleClose = {handleItemClose}
                update = {update}
                handleEditItem = {handleEditItem}
                handleDeleteItem = {handleDeleteItem}
                />


                
            </div>

            <AddItemModal
            showModal = {showAddItemModal}
            handleClose = {setShowAddItemModal}
            handleAddItem = {handleAddItem}
            />
        </div>
    )
}

export default Items