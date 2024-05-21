import { createApp } from 'vue'
import router from './router/routes'
import vuetify from './plugins/vuetify';
import App from './App.vue'
import './style.css'

createApp(App).use(router).use(vuetify).mount('#app')