import React, { useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap';

function AddItemModal({showModal, handleClose, handleAddItem}) {

    //state variable to store item data that being added 
    const [addItemData, updateAddItemData] = useState(null);

    const handleCloseModal = (e) =>{
        handleClose(false);
    }

    //update add item data 
    const handleChange = (e) =>{
        updateAddItemData({
            ...addItemData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        handleAddItem(addItemData);
        updateAddItemData(null);
        handleClose();
    }

    return (
        <div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-3' controlId='addItemName'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control name='name' onChange={handleChange} type='text' placeholder='Enter Item name'/>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='addItemDescription'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control name='description' onChange={handleChange} type='text' placeholder='Enter Item description'/>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='addItemSize'>
                            <Form.Label>Size</Form.Label>
                            <Form.Control name='size' onChange={handleChange} type='number' placeholder='Enter Item size'/>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='primary' onClick={handleSubmit}>Add!</Button>
                    <Button variant='secondary' onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>

            </Modal>
        </div>
    )
}

export default AddItemModal