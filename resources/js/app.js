import './bootstrap';
import { createApp } from 'vue'
import Login from './components/Login'

createApp({})
    .component('Login', login)
    .mount('#app')
