import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

export const api = axios.create({
    baseURL: `${BASE_URL}/${API_KEY}`,
    headers: {
        "Content-Type": "application/json"
    }
})