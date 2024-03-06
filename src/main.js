import { createApp } from 'vue'
import router from './router/routes'
import App from './App.vue'
import './style.css'

createApp(App).use(router).mount('#app')
