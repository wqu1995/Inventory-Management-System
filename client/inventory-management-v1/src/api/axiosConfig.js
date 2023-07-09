import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8282',
    headers:{"ngrok-skip-browser-warning" : "true"} 
});