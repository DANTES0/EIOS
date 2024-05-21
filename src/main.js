import { createApp } from 'vue'
import router from './router/routes'
import vuetify from './plugins/vuetify';
import App from './App.vue'
import './style.css'
import store from './store'

createApp(App)
.use(router)
.use(vuetify)
.use(store)
.mount('#app')