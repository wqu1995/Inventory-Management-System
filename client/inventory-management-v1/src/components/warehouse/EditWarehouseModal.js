import React, { useEffect, useState } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

function EditWarehouseModal({ show, handleClose, warehouse, handleEditWarehouse }) {

    const [editWarehouseData, setEditWarehouseData] = useState(undefined);

    useEffect(()=>{
        //console.log(warehouse);
        setEditWarehouseData(warehouse);
    }, [warehouse]);

    const handleChange = (filedName, e) =>{

        const value = e.target.value;

        if(!value.startsWith(' ')){
            const trimmedValue = value.trim();
            setEditWarehouseData({
                ...editWarehouseData,
                [filedName]: e.target.value
            })
        }


        //setEditWarehouseData(e.target.value);
        
    };

    const handleSubmit = (e) =>{
        //console.log(editWarehouseData)
        e.preventDefault();
        handleEditWarehouse(editWarehouseData);
        handleClose();
    };

    return (
        <Modal show = {show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Warehouse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        {editWarehouseData &&(
                            <Form.Control type="text" value={editWarehouseData.name} onChange={(e)=>handleChange('name', e)} required/>
                        )}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Location</Form.Label>
                        {editWarehouseData &&(
                            <Form.Control type="text" value={editWarehouseData.location} onChange={(e)=>handleChange('location', e)} required/>
                        )}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Warehouse Size</Form.Label>
                        {editWarehouseData &&(
                            <Form.Control type="number" value={editWarehouseData.size}  disabled/>
                        )}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Warehouse Capacity</Form.Label>
                        {editWarehouseData &&(
                            <Form.Control type="number" value={editWarehouseData.capacity} onChange={(e)=>handleChange('capacity', e)} required/>
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='primary' onClick={handleSubmit}>Add!</Button>
                <Button variant='secondary' onClick={handleClose}>Close</Button>
            </Modal.Footer> 
        </Modal>
    )
}

export default EditWarehouseModal