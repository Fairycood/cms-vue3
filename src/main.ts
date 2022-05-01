import { createApp } from 'vue'
import App from './App.vue'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'

import router from './router'
import store from './store'

const app = createApp(App)
app.use(globalRegister)
app.use(store)
store.dispatch('login/loadLocalLogin')
app.use(router)
app.mount('#app')
