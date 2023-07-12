import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import AddWarehouseModal from './AddWarehouseModal';
import EditWarehouseModal from './EditWarehouseModal';


function Warehouse() {

    const [warehouses, setWarehouses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingWarehouse, setEditingWarehouse] = useState(null);
    const [expandedWarehouse, setExpandedWarehouse] = useState(null);

    const getWarehouses = () =>{
        api.get("/warehouses").then((response) =>{
            setWarehouses(response.data);
        }).catch((error) =>{
            console.log(error);
        })
    }

    const handleAddWarehouse =(newWarehouse) =>{
        api.post("/warehouses/addWarehouse", newWarehouse).then((response) =>{
            if(response.status===201 && response.data){
                setWarehouses([...warehouses, response.data]);
            }
        }).catch((error) =>{
            console.log(error);
        })
    }

    const handleEditWarehouse = (editedWarehouse) =>{
        //console.log(editedWarehouse);
        api.put("/warehouses/updateWarehouse", editedWarehouse).then((response)=>{
            if(response.status===202 && response.data){
                setWarehouses(prevWarehouses =>{
                    const updatedWarehouses = prevWarehouses.map(warehouse =>{
                        if(warehouse.id === response.data.id){
                            return response.data;
                        }
                        return warehouse;
                    });
                    return updatedWarehouses;
                });
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    const handleDeleteWarehouse = (warehouseId) =>{
        //console.log(warehouseToBeDeleted)
        const confirmed = window.confirm('Are you sure you want to delete this warehouse?');
        if(confirmed){
            api.delete(`/warehouses/deleteWarehouse/${warehouseId}`).then((response) =>{
                if(response.status === 200 && response.data===1){
                    setWarehouses(prevWarehouses => prevWarehouses.filter(warehouse => warehouse.id !== warehouseId));
                }
            }).catch((error) =>{
                console.log(error);
            })

        }
    }

    const handleEditModalOpen = (warehouse) =>{
        
        setEditingWarehouse(warehouse);
    }

    const handleEditModalClose = () =>{
        setEditingWarehouse(null);
    }

    const handleCloseModal = () =>{
        setShowModal(false);
    }

    const handleShowModal = () =>{
        setShowModal(true);
    }

    const handleExpandWarehouse = (warehouseId) => {
        setExpandedWarehouse(expandedWarehouse === warehouseId ? null : warehouseId);
      };

    useEffect(()=>{
        getWarehouses();
    }, [])


    return (
        <div>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h1 className="text-dark">Warehouses</h1>
                <Button variant = "primary" className='custom-button' onClick={handleShowModal}>Add Warehouse</Button>
            </div>

            {warehouses?.map((warehouse)=>(
                <Card 
                    key={warehouse.id} 
                    className={`mb-3 custom-card ${expandedWarehouse === warehouse.id ? 'expanded' : ''}`}
                    onClick={() => handleExpandWarehouse(warehouse.id)}
                >
                    <Card.Body onClick={()=> handleExpandWarehouse(warehouse.id)}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <Card.Title>{warehouse.name}</Card.Title>
                                <Card.Text>{warehouse.location}</Card.Text>
                                <Card.Text>Size: {warehouse.size} Capacity: {warehouse.capacity}</Card.Text>
                            </div>
                            <div>
                            <Button variant="outline-primary" size="sm" onClick={(e) => {e.stopPropagation(); handleEditModalOpen(warehouse)}}> Edit</Button>
                            <span className="mr-2"></span> {/* Add spacing between buttons */}
                            <Button variant="outline-danger" size="sm" onClick={(e) => {e.stopPropagation(); handleDeleteWarehouse(warehouse.id)}}> Delete</Button>
                            {/* <span className="mr-2"></span>  */}
                            {/* <Button variant='outline-secondary' size='sm' onClick={()=> handleExpandWarehouse(warehouse.id)}>{expandedWarehouse === warehouse.id ? 'Hide Items' : 'Show Items'}</Button> */}
                            </div>
                        </div>
                        {expandedWarehouse === warehouse.id && (
                            <div className="mt-3">
                                <h5>Items:</h5>
                                <ul>
                                    {warehouse.inventories?.map((item, index)=>(
                                        <li key={index}>{item.id.itemId}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </Card.Body>

                </Card>
            ))}

            <AddWarehouseModal
                show = {showModal}
                handleClose={handleCloseModal}
                handleAddWarehouse={handleAddWarehouse}
            />

            <EditWarehouseModal
                show = {!!editingWarehouse}
                handleClose={handleEditModalClose}
                warehouse={editingWarehouse}
                handleEditWarehouse={handleEditWarehouse}
            />
            
        </div>
    )
}

export default Warehouse