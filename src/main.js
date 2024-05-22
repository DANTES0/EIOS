import { createApp } from 'vue'
import router from './router/routes'
import vuetify from './plugins/vuetify';
import App from './App.vue'
import './style.css'
import store from './store'
import Popper from 'vue3-popper'

createApp(App)
.use(router)
.use(vuetify)
.use(store)
.component("Popper", Popper)
.mount('#app')