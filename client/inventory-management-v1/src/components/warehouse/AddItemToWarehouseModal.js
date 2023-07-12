import React, { useEffect, useState, useRef} from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import api from '../../api/axiosConfig';


function AddItemToWarehouseModal({filteredItems, showModal, handleClose, handleAddItemToWarehouse}) {

    const modalRef = useRef(null);

    const[addItemData, setAddItemData] = useState({
        item: null,
        quantity: 0,
      });
    const[itemData, setItemData] = useState([]);
    
    const getItems = () =>{
        api.get("/items").then((response) =>{
            setItemData(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }

    const handleCloseModal = (e) => {
        handleClose(false);
      };
    
    useEffect(()=>{
        getItems();
    },[])

    const handleSubmit =(e) =>{
        e.preventDefault();
        handleAddItemToWarehouse(addItemData);
        handleClose();
    }
    
    const handleChange = (fieldName, e)=>{

        if (fieldName === 'item') {
            const selectedItemId = e.target.value;
            const selectedItem = itemData.find((item) => item.id === Number(selectedItemId));
        
            if (selectedItem) {
              const matchingItem = filteredItems.find((item) => item.itemId === selectedItem.id);
              const newItemData = {
                id: selectedItem.id,
                name: selectedItem.name,
                description: selectedItem.description,
                size: selectedItem.size
              };
        
              setAddItemData((prevData) => ({
                ...prevData,
                item: newItemData,
                quantity: matchingItem ? matchingItem.quantity : ''
              }));
            }
          } else {
            setAddItemData((prevData) => ({
              ...prevData,
              [fieldName]: Number(e.target.value)
            }));
          }
        //console.log(addItemData);

    }
    return (
        <Modal show = {showModal} onHide={handleCloseModal} onClick={(e) => e.stopPropagation()} ref={modalRef}>
            <Modal.Header closeButton>
                <Modal.Title>Add Item to Warehouse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Item</Form.Label>
                        <Form.Control as="select" value={addItemData.item?.id || ''} onChange={(e)=>handleChange('item', e)} onClick={(e) => e.stopPropagation()}>
                            <option value="">Select an item</option>
                            {itemData?.map((item)=>(
                                <option key={item.id} value= {item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control 
                            type='number'
                            value={addItemData.quantity}
                            onChange={(e) => handleChange('quantity', e)}
                            onClick={(e) => e.stopPropagation()}
                            disabled={!addItemData.item}
                            />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' onClick={handleSubmit}>Add</Button>
                <Button variant='secondary' onClick={handleCloseModal}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddItemToWarehouseModal