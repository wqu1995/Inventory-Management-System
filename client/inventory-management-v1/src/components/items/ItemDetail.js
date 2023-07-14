import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import WarehouseTable from './WarehouseTable';


function ItemDetail({selectedItem, warehouses, handleClose, update}) {

    const [totalCount, setTotalCount] = useState(0);

    useEffect(()=>{
        const total = warehouses.reduce((total, warehouse) => total + warehouse.quantity, 0);
        setTotalCount(total);
    }, [warehouses])
 

    const handleCloseDetail = () =>{
        handleClose();
    }

    const handleDelteInv = (warehouse) =>{
        const confirm = window.confirm('Are you sure you want to delete this Inventory?');
        if(confirm){
            api.delete(`/inventories/deleteInventory/${warehouse.id}/${selectedItem.id}`).then((response)=>{
                if(response.status === 200){
                    setTotalCount(totalCount - warehouse.quantity);
                    update("delete", warehouse);
                }
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

    const handleEditteInv = (warehouse) =>{
        console.log(warehouse);
    }
    

    const check = () =>{
        console.log(warehouses)
    }
    if (!selectedItem) {
        return null; // If no item is selected, return null to hide the component
    }
    
    return (
        <div className="additional-info">
            <h2>{selectedItem.name}</h2>
            <p>Id: {selectedItem.id}</p>
            <p>Description: {selectedItem.description}</p>
            <p>Size: {selectedItem.size}</p>
            <p>Total Count: {totalCount}</p>
            <p>Stored In: </p>
            <Button onClick={check}>hi</Button>
            <br/><br/>

            <WarehouseTable
            selectedItem = {selectedItem}
            warehouses={warehouses}
            handleEdit = {handleEditteInv}
            handleDelete = {handleDelteInv}
            />
        </div>
    );
}

export default ItemDetail