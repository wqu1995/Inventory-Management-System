import React, { useState, useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import AddWarehouseModal from './AddWarehouseModal';
import EditWarehouseModal from './EditWarehouseModal';
import WarehouseItemTable from './WarehouseItemTable';


function Warehouse() {

    const [warehouses, setWarehouses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingWarehouse, setEditingWarehouse] = useState(null);
    const [expandedWarehouse, setExpandedWarehouse] = useState(null);
    const [warehouseItemData, setWarehouseItemData] = useState([]);

    //get warehouses from database 
    const getWarehouses = () =>{
        api.get("/warehouses").then((response) =>{
            setWarehouses(response.data);
        }).catch((error) =>{
            console.log(error);
        })
    }

    //add warehouse to database 
    const handleAddWarehouse =(newWarehouse) =>{
        api.post("/warehouses/addWarehouse", newWarehouse).then((response) =>{
            if(response.status===201 && response.data){
                setWarehouses([...warehouses, response.data]);
            }
        }).catch((error) =>{
            console.log(error);
        })
    }

    //update warehouse to database 
    const handleEditWarehouse = (editedWarehouse) =>{
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

    //delete warehouse
    const handleDeleteWarehouse = (warehouseId) =>{
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

    //retrieve all items associate with warehouse 
    const handleGetItemsByWarehouseId = (warehouseId) =>{
        api.get(`/warehouses/warehouse/${warehouseId}`).then((response) =>{
            if(response.status === 200 && response.data){
               // console.log(warehouseItemData);
                setWarehouseItemData(response.data);
                //setExpandedWarehouse(response.data);
            }
        }).catch((error) =>{
            console.log(error);
        })
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

    //expand the warehouse card
    const handleExpandWarehouse = (warehouseId) => {
        if(expandedWarehouse === warehouseId){
            setExpandedWarehouse(null);
        }else{
            handleGetItemsByWarehouseId(warehouseId);
            setExpandedWarehouse(warehouseId);
        }
    };

    const filteredItems = warehouseItemData.flatMap((obj) =>
      obj.inventories
        .filter((item) => item.id.warehouseId === expandedWarehouse)
        .map((item) => ({
            warehouseId: expandedWarehouse,
            itemId: obj.id,
            itemName: obj.name,
            quantity: item.quantity,
            itemDescription: obj.description,
            itemSize:obj.size
        }))
    );


    useEffect(()=>{
        getWarehouses();
    }, [])

    const modalRef = useRef(null);



    const handleUpdate = () =>{
        getWarehouses();
        handleGetItemsByWarehouseId(expandedWarehouse);
    }

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h1 className="text-dark">Warhouses</h1>
                <Button variant = "primary" className='custom-button' onClick={handleShowModal}>Add Warehouse</Button>
            </div>
            <p>Click to expand!</p>

            {warehouses?.map((warehouse)=>(
                <Card 
                    key={warehouse.id} 
                    className={`mb-3 custom-card ${expandedWarehouse === warehouse.id ? 'expanded' : ''}`}
                >
                    <Card.Body onClick={(e)=> {e.stopPropagation(); handleExpandWarehouse(warehouse.id);} }>
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
                            </div>
                        </div>
                        {expandedWarehouse === warehouse.id && (
                            <WarehouseItemTable 
                            filteredItems={filteredItems}
                            warehouseId = {expandedWarehouse}
                            handleUpdate={handleUpdate}
                            />
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