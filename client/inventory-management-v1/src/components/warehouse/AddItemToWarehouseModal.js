import React, { useEffect, useState, useRef} from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import api from '../../api/axiosConfig';


function AddItemToWarehouseModal({filteredItems, showModal, handleClose, handleAddItemToWarehouse}) {

    const modalRef = useRef(null);


    //initial object modal for add item data 
    const initAddItemData = {
        item: null,
        quantity: ''
    }

    const[addItemData, setAddItemData] = useState({
        item: null,
        quantity: ''
      });
    const[itemData, setItemData] = useState([]);

    const [quantityError, setQuantityError] = useState('');
    
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
        if(!addItemData.quantity || addItemData.quantity<1){
            setQuantityError('Quantity must be greater than 1');
            return;
        }
        e.preventDefault();
        handleAddItemToWarehouse(addItemData);
        setAddItemData(initAddItemData);
        setQuantityError('');
        handleClose();
    }
    
    //update the additem data based on the form change
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
            const value = e.target.value !== '' ? Number(e.target.value) : '';
            setAddItemData((prevData) => ({
              ...prevData,
              [fieldName]: value
            }));
          }

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
                                    {`${item.id}. ${item.name}`}
                                </option>
                                
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Item Size</Form.Label>
                        <Form.Control value = {addItemData.item?.size || ''} disabled/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control 
                            value={addItemData.quantity}
                            onChange={(e) => handleChange('quantity', e)}
                            onClick={(e) => e.stopPropagation()}
                            disabled={!addItemData.item}
                            isInvalid={!!quantityError}
                            />
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
    )
}

export default AddItemToWarehouseModal