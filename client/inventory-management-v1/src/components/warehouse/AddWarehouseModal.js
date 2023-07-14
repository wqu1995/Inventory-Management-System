import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddWarehouseModal({show, handleClose, handleAddWarehouse}) {

    //state variable for storing warehouse data that will be added
    const [addWarehouseData, updateAddedWarehouse] = useState(null);

    // update addwarehousedata
    const handleChange = (e) =>{
        updateAddedWarehouse({
            ...addWarehouseData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        handleAddWarehouse(addWarehouseData);
        updateAddedWarehouse(null);
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title className="text-dark">Add Warehouse</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form>
                <Form.Group className='mb-3' controlId='addWarehouseName'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control name='name' onChange={handleChange} type='text' placeholder='Enter warehouse name'/>
                </Form.Group>
                <Form.Group className='mb-3' controlId='addWarehouseLocation'>
                    <Form.Label>Location</Form.Label>
                    <Form.Control name='location' onChange={handleChange} type='text' placeholder='Enter warehouse location'/>
                </Form.Group>
                <Form.Group className='mb-3' controlId='addWarehouseSize'>
                    <Form.Label>Warehouse Size</Form.Label>
                    <Form.Control name='size' onChange={handleChange} type='number' placeholder='Enter warehouse size'/>
                </Form.Group>
                <Form.Group className='mb-3' controlId='addWarehouseCapacity'>
                    <Form.Label>Warehouse Capacity</Form.Label>
                    <Form.Control name='capacity' onChange={handleChange} type='number' placeholder='Enter warehouse capacity'/>
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

export default AddWarehouseModal