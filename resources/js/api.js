import axios from 'axios';
import { useAuthStore } from './store/auth';
import router from './router';

const api = axios.create({
    baseURL: '/api',
    headers: {
        Accept: 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();
        const authToken = authStore.token;

        if (authToken) {
            config.headers['Authorization'] = `Bearer ${authToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            const authStore = useAuthStore();
            authStore.clearAuthToken()
            console.log('Unauthorized request. Redirecting to login.');
            router.push({ name: 'login' });
        }
        return Promise.reject(error);
    }
);

export default api;
