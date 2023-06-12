import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import './index.css'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
