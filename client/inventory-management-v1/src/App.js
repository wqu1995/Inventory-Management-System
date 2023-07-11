import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/header/Header'
import Items from './components/items/Items';
import Inventory from './components/inventory/Inventory';
import Warehouse from './components/warehouse/Warehouse';

function App() {
  return (
    <Router>
        <div className='container'>
            <Header/>

            <Routes>
                <Route path='/items' element={<Items/>}></Route>
                <Route path='/inventory' element={<Inventory/>}></Route>
                <Route path='/' element={<Warehouse/>}></Route>
            </Routes>
        </div>
    </Router>

  )
}

export default App