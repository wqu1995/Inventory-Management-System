import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function Warehouse() {

    const [warehouses, setWarehouses] = useState();
    const [show, setShow] = useState(false);
    const [addWarehouseData, updateAddedWarehouse] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getWarehouses = () =>{
        api.get("/warehouses").then((response) =>{
            setWarehouses(response.data);
        }).catch((error) =>{
            console.log(error);
        })
    }

    const addWarehouse =() =>{
        api.post("/warehouses/addWarehouse", addWarehouseData).then((response) =>{
            if(response.status===201 && response.data){
                setWarehouses(oldArray => [...oldArray, response.data]);
            }
        }).catch((error) =>{
            console.log(error);
        })
    }

    const handleChange = (e) =>{
        updateAddedWarehouse({
            ...addWarehouseData,
            [e.target.name] : e.target.value.trim()
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        addWarehouse();
        //console.log(addWarehouseData);
        handleClose();
    }

    useEffect(()=>{
        getWarehouses();
    }, [])


    return (
        <div>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h1 className="text-dark">Warehouses</h1>
                <Button variant = "primary" className='custom-button' onClick={handleShow}>Add Warehouse</Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Warehouse</Modal.Title>
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
                    <Button variant='secondary' onClick={handleClose}>Close</Button>
                    <Button variant='primary' onClick={handleSubmit}>Add!</Button>
                </Modal.Footer>

            </Modal>

            {warehouses?.map((warehouse)=>(
                <Card key={warehouse.id} className='mb-3 custom-card'>
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                        <Card.Body>
                            <Card.Title>{warehouse.name}</Card.Title>
                            <Card.Text>{warehouse.location}</Card.Text>
                            <Card.Text>Size: {warehouse.size} Capacity: {warehouse.capacity}</Card.Text>
                        </Card.Body>
                        <Button variant="primary" className="custom-button mb-3" onClick={handleShow}>Edit</Button>
                        <Button variant="secondary" className="custom-button mb-3" onClick={handleShow}>Delete</Button>
                    </div>

                </Card>
            ))}
        </div>
    )
}

export default Warehouse