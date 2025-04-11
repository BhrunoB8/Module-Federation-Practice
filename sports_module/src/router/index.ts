// import { createRouter as createVueRouter, createWebHistory} from 'vue-router';
// import SportCreate from "../views/SportCreate.vue";
// import Home from "@/views/Home.vue";

export const navigateTo = (route: Object) => {
    const evt = new CustomEvent("remoteNavigateTo", { detail: route });
    document.dispatchEvent(evt);
};
//
//
// export const createRouter = () =>
//     createVueRouter({
//         history: createWebHistory(),
//         routes: [
//             {
//                 path: '/sports/create',
//                 name: 'SportCreate',
//                 component: SportCreate,
//             },
//         ],
//     });
//
// const router = createRouter();

// export default router;
