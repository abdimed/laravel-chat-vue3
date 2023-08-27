
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
};
