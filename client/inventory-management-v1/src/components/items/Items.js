import React, { useEffect, useState } from 'react'
import api from '../../api/axiosConfig';
import { Table, Button } from 'react-bootstrap';
import AddItemModal from './AddItemModal';


function Items() {
    const [items, setItems] = useState();

    const [showAddItemModal, setShowAddItemModal] = useState(false);

    const getItems = () =>{
        api.get("/items").then((response) =>{
            setItems(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }

    const handleShowAddItemModal = () =>{
        setShowAddItemModal(true);
    }

    const handleAddItem = (addItemData) =>{
        api.post("/items/addItem", addItemData).then((response)=>{
            if(response.status===201 && response.data){
                setItems([...items, response.data]);
            }
        }).catch((error)=>{
            console.log(error);
        })
        //console.log(addItemData);
    }

    const handleDeleteItem = (deleteItemData) =>{
        const confirm = window.confirm('Are you sure you want to delete this item?');
        if(confirm){
            api.delete(`/items/deleteItem/${deleteItemData.id}`).then((response) =>{
                if(response.status === 200){
                    setItems(prevItems => prevItems.filter(item => item.id !== deleteItemData.id))
                }
            }).catch((error) =>{
                console.log(error);
            })
        }
    }

    useEffect(()=>{
        getItems();
    },[])

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h1>Items</h1>
                <Button variant = "primary" className='custom-button' onClick={handleShowAddItemModal}>Add Item</Button>
            </div>
            <Table striped bordered hover size='sm' className='custom-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Size</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items?.map((item)=>(
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.size}</td>
                            <td className="button-container">
                                <Button variant="outline-danger" size="sm" onClick={(e) => {e.stopPropagation();handleDeleteItem(item)}}>Delete</Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <AddItemModal
            showModal = {showAddItemModal}
            handleClose = {setShowAddItemModal}
            handleAddItem = {handleAddItem}
            />
        </div>
    )
}

export default Items