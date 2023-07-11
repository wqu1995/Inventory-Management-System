import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom'
import Home from './components/home/Home';
import Header from './components/header/Header';
import Item from './components/item/Item';

function App() {

  const [warehouses, setWarehouses] = useState();

  const getWarehouses = async () =>{

    try{
      const response = await api.get("/warehouses");
      //console.log(response.data);
      setWarehouses(response.data);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() =>{
    getWarehouses();
  }, [])

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home warehouses = {warehouses}/>}></Route>
          <Route path="/items" element={<Item/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
