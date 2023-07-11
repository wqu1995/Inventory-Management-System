import React from 'react'
import './Warehouse.css';


const Warehouse = ({warehouses}) => {
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Size</th>
                    <th>Capacity</th>
                    <th>Actions</th>

                </tr>
            </thead>
            <tbody>
                {/* {
                    warehouses?.map((warehouse) =>{
                        <tr key = {warehouse.id}>
                            <td>{warehouse.id}</td>
                            <td>{warehouse.name}</td>
                            <td>{warehouse.location}</td>
                            <td>{warehouse.size}</td>
                            <td>{warehouse.capacity}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    })
                } */}
                {warehouses ? (
                    warehouses.map((warehouse) =>(
                        <tr key = {warehouse.id}>
                            <td>{warehouse.id}</td>
                            <td>{warehouse.name}</td>
                            <td>{warehouse.location}</td>
                            <td>{warehouse.size}</td>
                            <td>{warehouse.capacity}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))
                ) :(
                    <tr>
                        <td colSpan = {3}> No Warehouse</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  )
}

export default Warehouse