import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Импорт стилей
import './assets/styles/tailwind.css';


const app = createApp(App)
app.use(router)
app.mount('#app')