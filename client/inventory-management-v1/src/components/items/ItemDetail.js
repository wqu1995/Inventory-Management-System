import React, { useEffect, useState } from 'react'
import {Alert, Button, Form, Modal } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import WarehouseTable from './WarehouseTable';


function ItemDetail({selectedItem, warehouses, handleClose, update, handleEditItem, handleDeleteItem}) {

    const [totalCount, setTotalCount] = useState(0);
    const [showEditModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [quantityError, setQuantityError] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    //update item total count 
    useEffect(()=>{
        const total = warehouses.reduce((total, warehouse) => total + warehouse.quantity, 0);
        setTotalCount(total);
    }, [warehouses])
 

    const handleCloseDetail = () =>{
        handleClose();
    }


    //perform delete request to delete the inventory entry
    const handleDelteInv = (warehouse) =>{
        const confirm = window.confirm('Are you sure you want to delete this Inventory?');
        if(confirm){
            api.delete(`/inventories/deleteInventory/${warehouse.id}/${selectedItem.id}`).then((response)=>{
                if(response.status === 200){
                    setTotalCount(totalCount - warehouse.quantity);
                    update("delete", warehouse.id, 0);
                }
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

    //perofrm update request to update the inventory 
    const handleEditInv = (editData, oldQuant) =>{

        //console.log(editData);
        api.put("/inventories/updateInventoryById", editData).then((response) =>{
            if(response.status === 202){
                const diff = response.data.quantity - oldQuant
                setTotalCount(totalCount + diff);
                update("update", editData.id.warehouseId, response.data.quantity);
            }
        }).catch((error =>{
            if(error.response && error.response.status===400){
                setAlertMessage(error.response.data);
            }else{
                console.log(error)
            }
        }))
    }

    const showEditItemModal = () =>{
        setShowModal(true);
        setEditData(selectedItem);
    }

    const handleCloseEditItemModal = () =>{
        setShowModal(false);
        setEditData(null);
        setQuantityError('');
    }

    const handleChange = (e) =>{
        const value = e.target.value;
        if(!value.startsWith(' ')){
            const trimmedValue = value.trim();
            setEditData({
                ...editData,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleDelete = () =>{
        handleDeleteItem(selectedItem);
    }

    const handleSubmit = (e) =>{
        const size = editData.size != '' ? Number(editData.size) : ''
        if(!size || size<1){
            setQuantityError('Size must be greater than 1');
            return;
        }
        setEditData({
            ...editData,
            size: size
        })
        e.preventDefault();
        handleEditItem(editData);
        setEditData(null);
        handleCloseEditItemModal();
    }
    
    if (!selectedItem) {
        return null; // If no item is selected, return null to hide the component
    }
    
    return (
        <div className="additional-info">
            <h2>{selectedItem.name}</h2>
            <p>Id: {selectedItem.id}</p>
            <p>Description: {selectedItem.description}</p>
            <p>Size: {selectedItem.size}</p>
            <p>Total Count: {totalCount}</p>
            <p>
                <Button variant="primary" className="button-margin" onClick={(e) => {e.stopPropagation(); showEditItemModal()}}>Edit Item</Button>
                <Button variant="danger" className="button-margin" onClick={(e) => {e.stopPropagation(); handleDelete()}}>Delete</Button>

            </p>
            <div>
                    {alertMessage && <Alert>{alertMessage}</Alert>}
            </div>
            <br/><br/>
            <p>Stored In: </p>

            <WarehouseTable
            selectedItem = {selectedItem}
            warehouses={warehouses}
            handleEdit = {handleEditInv}
            handleDelete = {handleDelteInv}
            />

            <Modal show = {showEditModal} onHide={handleCloseEditItemModal} onClick={(e) => e.stopPropagation()}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Item name</Form.Label>
                            {editData &&(
                                <Form.Control
                                type="text"
                                value = {editData.name}
                                name = "name"
                                onChange = {(e)=>handleChange(e) }
                                required/>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Item Description</Form.Label>
                            {editData &&(
                                <Form.Control
                                type="text"
                                value = {editData.description}
                                name = "description"
                                onChange = {(e)=>handleChange(e) }
                                />
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Item size</Form.Label>
                            {editData &&(
                                <div>
                                    <Form.Control
                                    type="text"
                                    value = {editData.size}
                                    name = "size"
                                    onChange = {(e)=>handleChange(e) }
                                    required
                                    isInvalid={!!quantityError}/>
                                    {quantityError&&(
                                        <Form.Control.Feedback type='invalid'>{quantityError}</Form.Control.Feedback>
                                    )}
                                </div>
                                
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={handleSubmit}>Edit!</Button>
                    <Button variant='secondary' onClick={handleCloseEditItemModal}>Close</Button>
                </Modal.Footer> 
            </Modal>
        </div>
    );
}

export default ItemDetail