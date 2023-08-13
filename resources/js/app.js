import './bootstrap'

import { createApp } from 'vue'

import App from './views/templates/App.vue'
import router from './router/index'
import Echo from 'laravel-echo';

window.Echo = new Echo({
    broadcaster: 'pusher', // or 'redis', 'socket.io', etc.
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    // Other configuration options
});

createApp(App)
    .use(router)
    .mount('#app')
