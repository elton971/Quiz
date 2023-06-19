import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { store } from './store'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import * as FaIcons from 'oh-vue-icons/icons/fa'

const Fa = Object.values({ ...FaIcons })
addIcons(...Fa)

const app = createApp(App)
app.use(store)
app.component('v-icon', OhVueIcon)

app.mount('#app')
