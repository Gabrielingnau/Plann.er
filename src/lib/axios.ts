import axios from "axios";

export const api = axios.create({
  baseURL: 'https://plann-er-backend.onrender.com'
})