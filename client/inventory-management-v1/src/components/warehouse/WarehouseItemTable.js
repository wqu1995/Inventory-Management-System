import React, { useState } from 'react'
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import AddItemToWarehouseModal from './AddItemToWarehouseModal';
import api from '../../api/axiosConfig';



function WarehouseItemTable({filteredItems, warehouseId, handleAddItem}) {
    const [showModal, setShowModal] = useState(false);

    const handleAddItemClick = () =>{
        setShowModal(true);
    }

    const handleCloseModal = () =>{
        setShowModal(false);
    }

    const handleSaveItem = () =>{
        setShowModal(false);
    }

    const handleAddItemToWarehouse = (addItemData) =>{
        //console.log(filteredItems)
        if(addItemData){
            console.log(addItemData);
            const requestData ={
                id:{
                    warehouseId:warehouseId,
                    itemId: addItemData.item.id
                },
                item:addItemData.item,
                warehouse:{
                    id: warehouseId
                },
                quantity: addItemData.quantity
            }
            console.log(requestData);

            api.post("/inventories/addInventory", requestData).then((response)=>{
                if(response.status===201 || response.status===202){
                    handleAddItem();
                }
            }).catch((error)=>{
                console.log(error);
            })
        }

    }

    if(filteredItems.length === 0 ){
        return(
            <div className='mt-3'>
                <div className="d-flex justify-content-between align-items-center">
                    <h5>Items:</h5>
                    <Button className="btn btn-primary btn-sm" onClick={(e) => {e.stopPropagation(); handleAddItemClick()}}>Add Item</Button>
                </div>

                <AddItemToWarehouseModal
                filteredItems={filteredItems}
                wId = {warehouseId}
                showModal={showModal}
                handleClose={setShowModal}
                handleAddItemToWarehouse = {handleAddItemToWarehouse}
                />
            </div>

        )
    }
    return (
        <div className='mt-3'>
            <div className="d-flex justify-content-between align-items-center">
                <h5>Items:</h5>
                <Button className="btn btn-primary btn-sm" onClick={(e) => {e.stopPropagation(); handleAddItemClick()}}>Add Item</Button>
            </div>
            <Table striped bordered hover size='sm' className='custom-table'>
                <thead>
                    <tr>
                        <th>Item Id</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems?.map((item, index) =>(
                        <tr key={item.itemId}>
                            <td>{item.itemId}</td>
                            <td>{item.itemName}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <AddItemToWarehouseModal
                filteredItems={filteredItems}
                showModal={showModal}
                handleClose={setShowModal}
                handleAddItemToWarehouse = {handleAddItemToWarehouse}
            />
        </div>
    )
}

export default WarehouseItemTable