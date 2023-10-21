
const authToken = localStorage.getItem('authToken');
const headers = {
    Authorization: `Bearer ${authToken}`,
    Accept: 'application/json',
};

const api = axios.create({
    baseURL: '/api',
    headers,
});


api.interceptors.request.use(
    (config) => {
        const authToken = localStorage.getItem('authToken');

        if (authToken) {
            config.headers['Authorization'] = `Bearer ${authToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default api;
