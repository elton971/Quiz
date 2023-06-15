import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import './index.css'
import { store } from './store'

const app = createApp(App)
app.use(store)

app.mount('#app')
