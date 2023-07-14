import React from 'react'
import { Table, Button } from 'react-bootstrap'

function WarehouseTable({selectedItem, warehouses, handleEdit, handleDelete}) {
    if(warehouses.length === 0){
        return(
            <div></div>
        )
    }
    return (
        <div>
            <Table striped bordered hover size='sm' className='custom-table'>
                <thead>
                    <tr>
                        <th>Warehouse Name</th>
                        <th>Location</th>
                        <th>Quantity</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                {warehouses.map((warehouse) => (
                    <tr key={warehouse.id}>
                    <td>{warehouse.name}</td>
                    <td>{warehouse.location}</td>
                    <td>{warehouse.quantity}</td>
                    <td className="button-container">
                        <Button variant="outline-primary" size="sm" onClick={(e) => {e.stopPropagation();handleEdit(warehouse)}}>Edit</Button>
                        <Button variant="outline-danger" size="sm" onClick={(e) => {e.stopPropagation();handleDelete(warehouse)}}>Delete</Button>

                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default WarehouseTable