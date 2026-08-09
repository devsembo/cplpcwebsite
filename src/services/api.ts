import axios from "axios";

const API_URL = "https://devsembo.pt/";
//const API_URL = "http://localhost:5555/";

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});