import { createApp } from 'vue'
import router from './router/routes'
import App from './App.vue'
import './style.css'
import vuetify from './plugins/vuetify';

createApp(App).use(router).use(vuetify).mount('#app')
