import axios from 'axios';

const API_URL = 'https://696e9617d7bacd2dd717236f.mockapi.io/luciferuz/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {'Content-Type': 'application/json'}
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});