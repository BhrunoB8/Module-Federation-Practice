import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [] // Define your routes here
});

const app = createApp(App)

app.use(router)

app.mount('#app')

async function loadMicroFrontend() {
    try {
        const module = await import('header/Header');
        const sportsModule = await import('sports/Sports');
        module.mount(document.getElementById('header'));
        sportsModule.mount(document.getElementById('sports'));
    } catch (error) {
        console.error('Erro ao carregar o header:', error);
    }
}


loadMicroFrontend();