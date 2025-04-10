import './assets/main.css'

import { createApp } from 'vue'
// import router from './router'
import Header from "../src/components/Header.vue";

// const app = createApp(App)
//
// app.use(router)
//
// app.mount('#app')
export function mount(el) {
    createApp(Header).mount(el);
}