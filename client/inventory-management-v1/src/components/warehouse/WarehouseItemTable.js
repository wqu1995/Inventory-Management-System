import React, { useState } from 'react'
import { Modal, Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import AddItemToWarehouseModal from './AddItemToWarehouseModal';
import api from '../../api/axiosConfig';



function WarehouseItemTable({filteredItems, warehouseId, handleAddItem}) {
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [detailItem, setDetailItem] = useState(null);

    const handleAddItemClick = () =>{
        setShowAddItemModal(true);
    }

    const handleShowDetail = (item) => {
        setDetailItem(item);
    };
    const handleDetailModalClose = () =>{
        setDetailItem(null);

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
                showModal={showAddItemModal}
                handleClose={setShowAddItemModal}
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
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems?.map((item, index) =>(
                        <tr key={item.itemId}>
                            <td>{item.itemId}</td>
                            <td>{item.itemName}</td>
                            <td>{item.quantity}</td>
                            <td className="button-container">
                                <Button variant="outline-secondary" size="sm" onClick={(e) => {e.stopPropagation();handleShowDetail(item)}}>Detail</Button>
                                <Button variant="outline-primary" size="sm">Edit</Button>
                                <Button variant="outline-danger" size="sm">Delete</Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={detailItem !==null} onHide={handleDetailModalClose} onClick={(e) => e.stopPropagation()}>
                <Modal.Header closeButton>
                    <Modal.Title>Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {detailItem &&(
                        <div>
                            <h2>{detailItem.itemName}</h2>
                            <br></br>
                            <h5>Id: {detailItem.itemId}</h5>
                            <h5>Drescription: {detailItem.itemDescription}</h5>
                            <h5>Quantity: {detailItem.quantity}</h5>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleDetailModalClose}>Close</Button>
                </Modal.Footer>
            </Modal>

            <AddItemToWarehouseModal
                filteredItems={filteredItems}
                showModal={showAddItemModal}
                handleClose={setShowAddItemModal}
                handleAddItemToWarehouse = {handleAddItemToWarehouse}
            />
        </div>
    )
}

export default WarehouseItemTable