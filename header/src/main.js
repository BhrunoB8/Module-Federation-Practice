import { createApp } from 'vue';
import Header from './components/Header.vue';
// import router from "./routes/index.js";

export function mount(el) {
    createApp(Header).mount(el);
}