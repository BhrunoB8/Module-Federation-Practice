
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/vue-mf', component: () => import('header/routes') },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;