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
        </div>
    )
}

export default Items