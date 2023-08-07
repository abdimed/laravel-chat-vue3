import './bootstrap';
import { createApp } from 'vue'
import Login from './components/Login.vue'

createApp({})
    .component('Login', Login)
    .mount('#app')
