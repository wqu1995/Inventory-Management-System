import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

function AddInventoryModal({showModal, handleClose, handleAddInventory, inv, warehouse, items}) {

    const initInvData = {
        warehouseId : '',
        itemId : '',
        item:null,
        quantity: ''
    }

    const [addInvData, setAddInvData] = useState(initInvData);
    const [quantityError, setQuantityError] = useState('');


    const handleCloseModal = (e) =>{
        setAddInvData(initInvData);
        handleClose(false);
    }

    const handleChange = (fieldName, e) =>{
        if(fieldName === 'warehouse'){
            const warehouseId = Number(e.target.value);
            
            setAddInvData((prevData)=>({
                ...prevData,
                warehouseId:warehouseId
            }));
            if(addInvData.itemId){
                const selectInv = inv.find((i) => i.id.warehouseId === warehouseId && i.id.itemId === addInvData.itemId);
                setAddInvData((prevData)=>({
                    ...prevData,
                    quantity: selectInv ? selectInv.quantity : ''
                }));
            }

        }else if(fieldName === 'item'){
            const itemId = Number(e.target.value);
            
            setAddInvData((prevData)=>({
                ...prevData,
                itemId: itemId
            }));
            if(addInvData.warehouseId){
                const selectInv = inv.find((i) => i.id.warehouseId === addInvData.warehouseId && i.id.itemId === itemId);
                const selectItem = items.find((item) => item.id === itemId)
                //console.log(inv)
                //console.log(addInvData.warehouseId +" " +itemId )
                setAddInvData((prevData)=>({
                    ...prevData,
                    item : selectItem,
                    quantity: selectInv ? selectInv.quantity : ''
                }));
            }
        }else{
            const value = e.target.value != '' ? e.target.value : '';
            setAddInvData((prevData) =>({
                ...prevData,
                [fieldName]: value
            }));
        }
    }

    const handleSubmit = (e)=>{
        const quantity = addInvData.quantity != '' ? Number(addInvData.quantity) : ''
        if(!quantity || quantity<1){
            setQuantityError('Quantity must be greater than 1');
            return;
        }
        const newInvData = {
            id:{
                itemId : addInvData.itemId,
                warehouseId : addInvData.warehouseId
            },
            item : addInvData.item,
            warehouse:{
                id: addInvData.warehouseId
            },
            quantity: quantity
        }
        //console.log(newInvData);
        e.preventDefault();
        handleAddInventory(newInvData);
        setQuantityError('');
        setAddInvData(initInvData);
        handleClose();
    }

    return (
        <div>
            <Modal show = {showModal} onHide={handleCloseModal} onClick={(e) => e.stopPropagation()}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Inventory</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Warehouse</Form.Label>
                            <Form.Control as="select" value={addInvData.warehouseId || ''} onChange={(e)=>handleChange('warehouse', e)} onClick={(e) => e.stopPropagation()}>
                                <option value="">Select a warehouse</option>
                                {warehouse?.map((wh)=>(
                                    <option key={wh.id} value = {wh.id}>
                                        {wh.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Item</Form.Label>
                            <Form.Control as="select" value = {addInvData.itemId || ''} onChange={(e)=>handleChange('item', e)} onClick={(e) => e.stopPropagation()}>
                                <option value ="">Select an item</option>
                                {items.map((item)=>(
                                    <option key={item.id} value ={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control 
                            value={addInvData.quantity}
                            onChange={(e) => handleChange('quantity', e)}
                            onClick={(e) => e.stopPropagation()}
                            disabled={!addInvData.warehouseId || !addInvData.itemId}
                            isInvalid={!!quantityError}/>

                            {quantityError&&(
                                <Form.Control.Feedback type='invalid'>{quantityError}</Form.Control.Feedback>
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={handleSubmit}>Add</Button>
                    <Button variant='secondary' onClick={handleCloseModal}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddInventoryModal