import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';

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

    </div>
  );
}

export default App;
