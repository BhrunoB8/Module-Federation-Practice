import SportCreate from "../views/SportCreate.vue";
import SportList from "../views/SportList.vue";
import {createRouter as createVueRouter, createWebHistory} from 'vue-router';

export const routes = [
    {
        path: '/sports/create',
        name: 'SportCreate',
        component: SportCreate,
    },
    {
        path: '/sports/list',
        name: 'SportList',
        component: SportList,
    },
]

//
// export const createRouter = () =>
//     createVueRouter({
//         history: createWebHistory(),
//         routes
//     });
//
// const router = createRouter();

// export default router;
