import React, { useEffect, useState } from 'react'
import {Alert, Button, Table, Form } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import AddInventoryModal from './AddInventoryModal';


function Inventory() {

    const [inventory, setInventory] = useState([]);
    const [items, setItems] = useState([]);
    const [warehouse, setWarehouse] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');

    const [showAddInvModal, setShowInvModal] = useState(false);
    const [isEditing, setIsEditing] = useState(null);
    const [updatedQuant, setUpdatedQuant] = useState('');

    const [quantityError, setQuantityError] = useState('');

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

    const handleEditInv = (inv) =>{
        setIsEditing(inv);
        setUpdatedQuant(inv.quantity);
    }

    const handleUpdateInv = (e) =>{
        e.preventDefault();
        console.log(isEditing);
        console.log(updatedQuant);

        const quantity = updatedQuant != '' ? Number(updatedQuant) : ''
        if(!quantity || quantity<1){
            console.log("in here");
            setQuantityError('Quantity must be greater than 1');
            return;
        }

        const reqItem = items.find((i) => i.id === isEditing.id.itemId);
        console.log(reqItem)

        const requestData = {
            id:{
                itemId : isEditing.id.itemId,
                warehouseId: isEditing.id.warehouseId
            },
            item: reqItem,
            warehouse:{
                id: isEditing.id.warehouseId
            },
            quantity : updatedQuant
        }
        console.log(requestData)
        api.put("/inventories/updateInventory", requestData).then((response)=>{
            if(response.status===202 && response.data){
                setInventory((prevInventory)=>{
                    const index = prevInventory.findIndex(
                        (inv) => inv.id.warehouseId === response.data.id.warehouseId && inv.id.itemId === response.data.id.itemId
                    );

                    if(index !== -1){
                        const updatedInventoryArray = [... prevInventory];
                        updatedInventoryArray[index] = response.data;
                        return updatedInventoryArray
                    }else{
                        return prevInventory;
                    }
                })
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

        setQuantityError('')
        setUpdatedQuant(null);
        setIsEditing(null)
    }

    const handleCancelEdit = () =>{
        setIsEditing(null);
        setUpdatedQuant('');
    }

    const handleChange = (e) =>{
        const value = e.target.value != '' ? e.target.value : '';
        setUpdatedQuant(value);
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
                            <td>
                                {isEditing === inv ? (
                                    <div className="d-flex align-items-center input-container">
                                        <input
                                            type = "text"
                                            value = {updatedQuant}
                                            onChange = {(e) =>{handleChange(e)}}
                                            
                                        />

                                        <div className='button-container'>
                                            <Button variant="outline-primary" size="sm" onClick={(e) => {e.stopPropagation();handleUpdateInv(e)}}>Update!</Button>
                                            <Button variant="outline-secondary" size="sm" onClick={(e) => {e.stopPropagation();handleCancelEdit()}}>Cancel</Button>
                                        </div>

                                    </div>
                                ) :(inv.quantity)}
                                {isEditing ===inv && !!quantityError &&(
                                    <div className="text-danger">{quantityError}</div>
                                )}
                            </td>
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