import React from 'react'
import './Warehouse.css';
import { Carousel } from 'bootstrap';
import {Paper} from '@mui/material'

const Warehouse = ({warehouses}) => {
  return (
    <div>
        {/* <Carousel>
            {
                warehouses.map((warehouse) =>{
                    return (
                        <Paper>
                            <div>
                                {warehouse.id}
                                {warehouse.name}
                            </div>
                        </Paper>
                    )
                })
            }
        </Carousel> */}
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Size</th>
                    <th>Capacity</th>

                </tr>
            </thead>
            <tbody>
                {warehouses.length > 0 ? (
                    warehouses.map((warehouse) =>(
                        <tr key = {warehouse.id}>
                            <td>{warehouse.id}</td>
                            <td>{warehouse.name}</td>
                            <td>{warehouse.location}</td>
                            <td>{warehouse.size}</td>
                            <td>{warehouse.capacity}</td>
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