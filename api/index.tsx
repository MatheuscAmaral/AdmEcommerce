import axios from "axios";

const isLocal = typeof window !== 'undefined' && window.location.hostname === "localhost";

const api = axios.create({
    baseURL: isLocal ? "http://localhost:3333" : "https://rwa-api-2-0.vercel.app"
});

export default api;
