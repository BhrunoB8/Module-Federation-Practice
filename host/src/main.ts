import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

async function loadMicroFrontend() {
    try {
        // const module = await import('header/Header');
        // const sportsModule = await import('sports/Sports');
        // module.mount(document.getElementById('header'));
        // sportsModule.mount(document.getElementById('sports'));
    } catch (error) {
        console.error('Erro ao carregar o header:', error);
    }
}


loadMicroFrontend();