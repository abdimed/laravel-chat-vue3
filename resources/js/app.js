import './bootstrap'

import { createApp } from 'vue'

import App from './views/templates/App.vue'
import router from './router/index'

createApp(App)
    .use(router)
    .mount('#app')
