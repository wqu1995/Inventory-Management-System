import React, { useEffect, useState } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

function EditWarehouseModal({ show, handleClose, warehouse, handleEditWarehouse }) {

    const [editWarehouseData, setEditWarehouseData] = useState(undefined);
    const [quantityError, setQuantityError] = useState('');

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
        if(!editWarehouseData.capacity || editWarehouseData.capacity<1){
            setQuantityError('Quantity must be greater than 1');
            return;
        }else if(editWarehouseData.capacity < warehouse.size){
            setQuantityError('Quantity must be greater warehosue size');
            return;
        }
        //console.log(editWarehouseData)
        e.preventDefault();
        handleEditWarehouse(editWarehouseData);
        setQuantityError('');
        handleClose();
    };

    return (
        <Modal show = {show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="text-dark">Edit Warehouse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label>Name</Form.Label>
                        {editWarehouseData &&(
                            <Form.Control type="text" value={editWarehouseData.name} onChange={(e)=>handleChange('name', e)} required/>
                        )}
                    </Form.Group >
                    <Form.Group className='mb-3'>
                        <Form.Label>Location</Form.Label>
                        {editWarehouseData &&(
                            <Form.Control type="text" value={editWarehouseData.location} onChange={(e)=>handleChange('location', e)} required/>
                        )}
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Warehouse Size</Form.Label>
                        {editWarehouseData &&(
                            <Form.Control type="number" value={editWarehouseData.size}  disabled/>
                        )}
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Warehouse Capacity</Form.Label>
                        {editWarehouseData &&(
                            <Form.Control 
                            type="number" 
                            value={editWarehouseData.capacity} 
                            onChange={(e)=>handleChange('capacity', e)} 
                            isInvalid={!!quantityError}
                            
                            required
                            />
                            
                        )}
                        {quantityError&&(
                                <Form.Control.Feedback type='invalid'>{quantityError}</Form.Control.Feedback>
                            )}
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='primary' onClick={handleSubmit}>Edit!</Button>
                <Button variant='secondary' onClick={handleClose}>Close</Button>
            </Modal.Footer> 
        </Modal>
    )
}

export default EditWarehouseModal