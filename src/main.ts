import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import { Toast } from 'vant';

createApp(App).use(router).use(Toast).mount('#app')
