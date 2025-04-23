import { createRouter as createVueRouter, createWebHistory} from 'vue-router';
import HomeView from "../views/HomeView.vue";

const { routes } = await import("sport/Routes");

export const createRouter = () =>
    createVueRouter({
        history: createWebHistory(),
        routes: [
            {
                path: '/',
                component: HomeView,
            },
            {
                path: '/technology',
                component: () => import("header/Header"),
            },
            {
                path: '/sports/:id/:nome',
                component: () => import("sport/SportView"),
            },
            {
                path: '/sports',
                name: 'Sports',
                component: () => import("sport/Sport"),
            },
            ...routes
        ],
    });

const router = createRouter();

export default router;
