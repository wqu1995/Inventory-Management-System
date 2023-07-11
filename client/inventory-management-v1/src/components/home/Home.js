import React from 'react'
import Warehouse from '../warehouse/Warehouse'

const Home = ({warehouses}) => {
  return (
    <Warehouse warehouses = {warehouses}/>
  )
}

export default Home