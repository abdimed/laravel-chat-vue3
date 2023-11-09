import { defineStore } from 'pinia';
import router from '../router/index';
import api from '@/api';

export const useAuthStore = defineStore({
    id: 'auth',

    state: () => ({
        authToken: localStorage.getItem('authToken') || null,
        user: JSON.parse(localStorage.getItem('user')) || null,

    }),

    getters: {
        isAuthenticated: (state) => state.authToken !== null,
        token: (state) => state.authToken,
        authUser: (state) => state.user,
    },

    actions: {
        async login(credentials) {
            try {
                const response = await api.post('/login', credentials, {
                    headers: {
                        Accept: 'application/json',
                    },
                });

                const authToken = response.data.authToken;
                const user = response.data.user;

                this.setAuthToken(authToken);
                this.setUser(user);

                router.push('/messages');

            } catch (error) {
                console.error('Login failed:', error);
                return { success: false, message: 'Login failed. Please check your credentials.' };
            }
        },

        async logout() {
            try {
                await api.post('/logout');

                this.clearAuthToken();

                localStorage.removeItem('authToken');

                router.push('/login');

            } catch (error) {
                console.error('Logout failed:', error);
                return { success: false, message: 'Logout failed.' };
            }
        },

        setAuthToken(token) {
            this.authToken = token;
            localStorage.setItem('authToken', token);
        },

        clearAuthToken() {
            this.authToken = null;
            this.user = null;
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
          },

        setUser(user) {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
    },
});
