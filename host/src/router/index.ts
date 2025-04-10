import { createRouter as createVueRouter, createWebHistory} from 'vue-router';
import Technology from "remotes/Technology";
import Sports from "remotes/Sports";

export const createRouter = () =>
    createVueRouter({
        history: createWebHistory(),
        routes: [
            {
                path: '/technology',
                name: 'Technology',
                component: Technology,
            },
            {
                path: '/sports',
                name: 'Sports',
                component: Sports,
            }
        ],
    });

const router = createRouter();

export default router;
