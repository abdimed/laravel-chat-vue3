import './bootstrap'

import { createApp } from 'vue'
import store from './store/index';

import App from './views/templates/App.vue'
import router from './router/index'


const storedToken = localStorage.getItem('authToken');
if (storedToken) {
  store.commit('auth/setAuthToken', storedToken);
}

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
