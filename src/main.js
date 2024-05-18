import { createApp } from 'vue'
import router from './router/routes'
import App from './App.vue'
import './style.css'
import store from './store'

createApp(App)
.use(router)
.use(store)
.mount('#app')
