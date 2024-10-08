import axios from "axios";

const apiUrl = process.env.NODE_ENV === 'production' 
  ? 'https://rwa-api-2-0.vercel.app'
  : 'http://localhost:3333';


const api = axios.create({
    baseURL: apiUrl
});

export default api;
