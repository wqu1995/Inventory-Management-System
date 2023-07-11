import React, { useEffect, useState } from 'react'
import api from '../../api/axiosConfig';

const Item = () => {
    const [items, setItems] = useState();

    const getItems = async() =>{
        try{
            const response = await api.get("/items");
            console.log(response.data);
            setItems(response.data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() =>{
        getItems();
    }, [])

  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Size</th>
                </tr>
            </thead>
            <tbody>
                {
                    items?.map((item) =>(
                        <tr key = {item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.size}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

        
    </div>
  )
}

export default Item