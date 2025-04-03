import axios from 'axios';

const ApiURL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: ApiURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
