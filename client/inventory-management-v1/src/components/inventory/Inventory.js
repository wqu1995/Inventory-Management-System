import React, { useEffect, useState } from 'react'
import {Alert, Button, Table } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import AddInventoryModal from './AddInventoryModal';


function Inventory() {

    const [inventory, setInventory] = useState([]);
    const [items, setItems] = useState([]);
    const [warehouse, setWarehouse] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');

    const [showAddInvModal, setShowInvModal] = useState(false);

    const getInventory = () =>{
        api.get("/inventories").then((response)=>{
            setInventory(response.data);
        }).catch((error)=>{
            console.log(error)
        })
    }

    const getItems =() =>{
        api.get("/items").then((response)=>{
            setItems(response.data);
        }).catch((error)=>{
            console.log(error);
        })
    }

    const getWarehouse = () =>{
        api.get("/warehouses").then((response)=>{
            setWarehouse(response.data);
        }).catch((error)=>{
            console.log(error);
        })
    }

    const handleAddInventory = (addInvData) =>{
        console.log(addInvData);
        api.post("/inventories/addInventory", addInvData).then((response)=>{
            if(response.status===201 && response.data){
                setInventory([...inventory, response.data])
                setAlertMessage('');
            }
        }).catch((error)=>{
            if (error.response && error.response.status === 400) {
                //Alert(error.response.data);
              setAlertMessage(error.response.data);
            } else {
              console.log(error);
            }
        })
    }

    const handleDeleteInv = (inv) =>{
        const confirmed = window.confirm('Are you sure you want to delete this inventory?');
        if(confirmed){
            api.delete(`/inventories/deleteInventory/${inv.id.warehouseId}/${inv.id.itemId}`).then((response)=>{
                setInventory((prevInventory)=> prevInventory.filter((item) => item.id !== inv.id));
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    const handowShowAddInvModal = () =>{
        setShowInvModal(true);
    }

    const getWarehouseName = (warehouseId) =>{
        const wh = warehouse.find((x) => x.id === warehouseId);
        return wh ? wh.name : ''; 
    }

    const getItemName = (itemId) =>{
        const item = items.find((i) => i.id === itemId);
        return item ? item.name : '';
    }

    useEffect(()=>{
        getInventory();
        getItems();
        getWarehouse();
    },[])


    return (
        <div>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h1 className="text-dark">Inventory</h1>
                <div>
                    {alertMessage && <Alert>{alertMessage}</Alert>}
                </div>
                <Button variant = "primary" className='custom-button' onClick={handowShowAddInvModal}>Add Inventory</Button>
            </div>
            <Table striped bordered hover size="sm" className="custom-table">
                <thead>
                    <tr>
                        <th>Warehouse Name</th>
                        <th>Item Name</th>
                        <th>quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory?.map((inv, index) =>(
                        <tr key={index}>
                            <td>{getWarehouseName(inv.id.warehouseId)}</td>
                            <td>{getItemName(inv.id.itemId)}</td>
                            <td>{inv.quantity}</td>
                            <td className="button-container">
                                <Button variant="outline-primary" size="sm" onClick={(e) => {e.stopPropagation();handleEditInv(inv)}}>Edit</Button>
                                <Button variant="outline-danger" size="sm" onClick={(e) => {e.stopPropagation();handleDeleteInv(inv)}}>Delete</Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <AddInventoryModal
                showModal = {showAddInvModal}
                handleClose={setShowInvModal}
                handleAddInventory = {handleAddInventory}
                inv = {inventory}
                warehouse = {warehouse}
                items = {items}
            />
        </div>
    )
}

export default Inventory