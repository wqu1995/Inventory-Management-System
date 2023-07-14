import React, { useEffect, useState } from 'react'
import api from '../../api/axiosConfig';
import { Table } from 'react-bootstrap';


function Items() {
    const [items, setItems] = useState();

    const getItems = () =>{
        api.get("/items").then((response) =>{
            setItems(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        getItems();
    },[])

    return (
        <div>
<<<<<<< Updated upstream
            <h1>Items</h1>
            <Table striped bordered hover size='sm' className='custom-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>
                    {items?.map((item)=>(
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.size}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
=======

            <div className="items-container">
                <div className="items-table">
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                        <h1>Figures</h1>
                        <Button variant = "primary" className='custom-button' onClick={handleShowAddItemModal}>Add Item</Button>
                    </div>
                    <Table striped bordered hover size='sm' className='custom-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items?.map((item)=>(
                                <tr  key={item.id} onClick={(e) => { e.stopPropagation(); handleItemClick(item); }}>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.size}</td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>

                </div>

                <ItemDetail
                selectedItem = {selectedItem}
                warehouses = {warehouses}
                handleClose = {handleItemClose}
                update = {update}
                handleEditItem = {handleEditItem}
                handleDeleteItem = {handleDeleteItem}
                />


                
            </div>

            <AddItemModal
            showModal = {showAddItemModal}
            handleClose = {setShowAddItemModal}
            handleAddItem = {handleAddItem}
            />
>>>>>>> Stashed changes
        </div>
    )
}

export default Items