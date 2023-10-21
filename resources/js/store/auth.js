import router from '../router/index';
import api from '@/api';

export default {
    namespaced: true,
    state: {
        authToken: null,
    },
    mutations: {
        setAuthToken(state, token) {
            state.authToken = token;
            localStorage.setItem('authToken', token);
        },
        clearAuthToken(state) {
            state.authToken = null;
            localStorage.removeItem('authToken')
        },
    },
    getters: {
        isAuthenticated: (state) => {
            return state.authToken !== null;
        },
        token: (state) => {
            return state.authToken;
        }
    },
    actions: {
        async login({ commit }, credentials) {
            try {

                const response = await axios.post('/api/login', credentials, {
                    headers: {
                        Accept: " application/json",
                    },
                });

                const authToken = response.data.authToken;

                commit('setAuthToken', authToken);

                router.push('/messages');

            } catch (error) {
                console.error('Login failed:', error);
            }
        },

        async logout({ commit }) {
            try {
                // Make an API request to log the user out
                await api.post('/logout'); // You need to adjust the API URL as needed

                // Clear the token and any user-related data from the state
                commit('clearAuthToken');
                // Optionally, you can clear other user data as well

                // Redirect the user to the login page or perform other actions as needed
                router.push('/login');
            } catch (error) {
                // Handle any errors (e.g., network issues)
                console.error('Logout failed:', error);
            }
        },
    }
};
