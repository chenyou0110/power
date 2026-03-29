import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 导入 Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// 导入 Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css'
// 导入自定义样式
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.mount('#app')