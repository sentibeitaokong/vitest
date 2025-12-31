import App from './App.vue'
import {createApp} from 'vue'
import {store} from "./store";
import router from './router'
import {key} from "./store";
// 创建Vue应用实例
const app = createApp(App)
// app.use(store).mount('#app')
app.use(store,key).use(router).mount('#app')