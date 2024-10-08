import axios from "axios";

const hostName = window.location.hostname;

const api = axios.create({
    baseURL: `${hostName === "localhost" ? "http://localhost:3333" : "https://rwa-api-2-0.vercel.app"}`
});

export default api;
