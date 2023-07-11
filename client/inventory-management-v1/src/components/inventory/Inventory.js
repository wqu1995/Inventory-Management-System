import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import api from '../../api/axiosConfig';


function Inventory() {

    const [inventory, setInventory] = useState();

    const getInventory = () =>{
        api.get("/inventories").then((response)=>{
            setInventory(response.data);
        }).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        getInventory();
    },[])


    return (
        <div>
            <h1>Inventory</h1>
            <Table striped bordered hover size="sm" className="custom-table">
                <thead>
                    <tr>
                        <th>Warehouse ID</th>
                        <th>Item ID</th>
                        <th>quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory?.map((inv, index) =>(
                        <tr key={index}>
                            <td>{inv.id.warehouseId}</td>
                            <td>{inv.id.itemId}</td>
                            <td>{inv.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Inventory