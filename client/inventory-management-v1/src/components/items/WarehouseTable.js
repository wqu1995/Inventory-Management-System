import React, { useState } from 'react'
import { Table, Button, Modal, Form } from 'react-bootstrap'

function WarehouseTable({selectedItem, warehouses, handleEdit, handleDelete}) {
    
    //state variable for keep track for the inventory being updated
    const [editWarehouse, setEditWarehouse] = useState(null);
    const [updatedQuant, setUpdatedQuant] = useState(0);
    const [quantityError, setQuantityError] = useState('');


    const handleEditWarehouse = (warehouse) =>{
        setEditWarehouse(warehouse);
        setUpdatedQuant(warehouse.quantity);
    }

    const handleCloseModal = () =>{
        setEditWarehouse(null);
        setQuantityError('');
        setUpdatedQuant(null);
    }
    
    const handleChange = (e) =>{
        const value = e.target.value != '' ? e.target.value : '';
        setUpdatedQuant(value);
    }

    const handleSubmit = (e) =>{
        const quantity = updatedQuant != '' ? Number(updatedQuant) : ''
        if(!quantity || quantity<1){
            setQuantityError('Quantity must be greater than 1');
            return;
        }
        const reqData = {
            id:{
                itemId : selectedItem.id,
                warehouseId : editWarehouse.id
            },
            quantity : updatedQuant
        }
        e.preventDefault();
        handleEdit(reqData, editWarehouse.quantity);
        handleCloseModal();
    }

    //if there is no warehouse assoiciate with item, dont show the table
    if(warehouses.length === 0){
        return(
            <div></div>
        )
    }
    //display the warehouse table
    return (
        <div>
            <Table striped bordered hover size='sm' className='custom-table'>
                <thead>
                    <tr>
                        <th>Warehouse Name</th>
                        <th>Location</th>
                        <th>Quantity</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                {warehouses.map((warehouse) => (
                    <tr key={warehouse.id}>
                    <td>{warehouse.name}</td>
                    <td>{warehouse.location}</td>
                    <td>{warehouse.quantity}</td>
                    <td className="button-container">
                        <Button variant="outline-primary" size="sm" onClick={(e) => {e.stopPropagation();handleEditWarehouse(warehouse)}}>Edit</Button>
                        <Button variant="outline-danger" size="sm" onClick={(e) => {e.stopPropagation();handleDelete(warehouse)}}>Delete</Button>

                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal show = {editWarehouse} onHide = {handleCloseModal} onClick={(e) => e.stopPropagation()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {editWarehouse ?(
                            <div> 
                                <Form >
                                    <Form.Group className="mb-3">
                                        <Form.Label>Item:</Form.Label>
                                        <Form.Control
                                        value = {selectedItem.name}
                                        disabled
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Warehouse:</Form.Label>
                                        <Form.Control
                                        value = {editWarehouse.name}
                                        disabled
                                        />
                                    </Form.Group>

                                    <div className="mb-3">
                                        <Form.Label>Available Space: {editWarehouse.capacity - editWarehouse.size}</Form.Label>
                                    </div>
                                    <Form.Group>
                                        <Form.Label>Item Quantity</Form.Label>
                                        <Form.Control
                                        value = {updatedQuant}
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={(e) => handleChange(e)}
                                        isInvalid={!!quantityError}
                                        />
                                        {quantityError&&(
                                            <Form.Control.Feedback type='invalid'>{quantityError}</Form.Control.Feedback>
                                        )}

                                    </Form.Group>
                                </Form>

                            </div>
                        ) :(
                            <p>loading...</p>
                        )}

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='primary' onClick={handleSubmit}>Edit!</Button>
                        <Button variant='secondary' onClick={handleCloseModal}>Cancel</Button>
                    </Modal.Footer>
            </Modal>
        </div>
    )
}

export default WarehouseTable