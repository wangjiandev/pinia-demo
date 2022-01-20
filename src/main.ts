import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

// 创建Pinia实例
const pinia = createPinia()

const app = createApp(App)

// 挂载Pinia实例到Vue实例
app.use(pinia)
app.mount('#app')
