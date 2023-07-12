import React from 'react'
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


function WarehouseItemTable({filteredItems}) {
    if(filteredItems.length === 0 ){
        return null;
    }
    return (
        <div className='mt-3'>
            <div className="d-flex justify-content-between align-items-center">
                <h5>Items:</h5>
                <Button className="btn btn-primary btn-sm" >Add Item</Button>
            </div>
            <Table striped bordered hover size='sm' className='custom-table'>
                <thead>
                    <tr>
                        <th>Item Id</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems?.map((item, index) =>(
                        <tr key={item.itemId}>
                            <td>{item.itemId}</td>
                            <td>{item.itemName}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default WarehouseItemTable