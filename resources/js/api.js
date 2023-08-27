import axios from 'axios';

const authToken = localStorage.getItem('authToken');
const headers = {
    Authorization: `Bearer ${authToken}`,
    Accept: 'application/json',
};

const api = axios.create({
    baseURL: '/api',
    headers,
});

export default api;
