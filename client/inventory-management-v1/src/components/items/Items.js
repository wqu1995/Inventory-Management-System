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
                                <Button variant="outline-danger" size="sm" onClick={(e) => {e.stopPropagation();handleDelete(item)}}>Delete</Button>

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