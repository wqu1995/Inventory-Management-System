import React, { useState } from 'react'
import { Form, Modal, Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import AddItemToWarehouseModal from './AddItemToWarehouseModal';
import api from '../../api/axiosConfig';



function WarehouseItemTable({filteredItems, warehouseId, handleUpdate}) {
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [detailItem, setDetailItem] = useState(null);
    const [editItem, setEditItem] = useState(null);
    const [newQuantity, setNewQuantity] = useState(1);

    const handleAddItemClick = () =>{
        setShowAddItemModal(true);
    }

    const handleShowDetail = (item) => {
        setDetailItem(item);
    };
    const handleDetailModalClose = () =>{
        setDetailItem(null);

    }

    const handleEditItem = (item) =>{
        setNewQuantity(item.quantity)
        setEditItem(item);
    }
    const handleSaveEditItem = () =>{

        //console.log(editItem);
        //console.log(newQuantity);
        if(editItem && newQuantity){
            const requestData = {
                id:{
                    warehouseId:editItem.warehouseId,
                    itemId: editItem.itemId
                },
                item:{
                    id: editItem.itemId,
                    name: editItem.itemName,
                    description: editItem.itemDescription,
                    size: editItem.itemSize
                },
                warehouse:{
                    id: editItem.warehouseId
                },
                quantity: newQuantity
            }
            api.post("/inventories/addInventory", requestData).then((response)=>{
                if(response.status===201 || response.status===202){
                    handleUpdate();
                }
            }).catch((error)=>{
                console.log(error);
            })
            //console.log(requestData);
        }
        setEditItem(null);
    }

    const handleChange = (e) =>{
        //console.log(e.target.value);
        if(e.target.value == 0){
            e.target.value = 1
        }
        setNewQuantity(e.target.value)
    }

    const handleAddItemToWarehouse = (addItemData) =>{
        //console.log(filteredItems)
        if(addItemData){
            //console.log(addItemData);
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
                    handleUpdate();
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
                                <Button variant="outline-primary" size="sm" onClick={(e) => {e.stopPropagation();handleEditItem(item)}}>Edit</Button>
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
                            <h5>Size: {detailItem.itemSize}</h5>
                            <h5>Quantity: {detailItem.quantity}</h5>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleDetailModalClose}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={editItem !== null} onHide={() => setEditItem(null)} onClick={(e) => e.stopPropagation()}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control value={editItem?.itemName || ''} disabled></Form.Control>
                            <Form.Label>Item Quantity</Form.Label>
                            <Form.Control 
                                type = 'number' 
                                value={newQuantity || 0} 
                                min={1} 
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => handleChange(e)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='primary' onClick={handleSaveEditItem}>Update!</Button>
                    <Button variant='secondary' onClick={() => setEditItem(null)}>Cancel</Button>
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