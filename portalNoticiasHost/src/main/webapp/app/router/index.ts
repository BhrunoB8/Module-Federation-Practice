import { createRouter as createVueRouter, createWebHistory } from 'vue-router';

const Home = () => import('@/core/home/home.vue');
const Error = () => import('@/core/error/error.vue');
import account from '@/router/account';
import admin from '@/router/admin';
import pages from '@/router/pages';
const { routes } = await import("sport/Sport");
// const sportCreate = await import("sport/SportCreate");

// import entities from '@/router/entities';
export const createRouter = () =>
  createVueRouter({

    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      // {
      //   path: '/teste',
      //   name: 'teste',
      //   component: sportCreate,
      // },
      {
        path: '/forbidden',
        name: 'Forbidden',
        component: Error,
        meta: { error403: true },
      },
      {
        path: '/not-found',
        name: 'NotFound',
        component: Error,
        meta: { error404: true },
      },
      ...account,
      ...admin,
      ...routes,
      ...pages,
    ],
  });

const router = createRouter();

// async function loadRemoteRoutes() {
//   const { routes } = await import("sport/Sport");
//   routes.forEach((it: any) => { router.addRoute(it) })
// }
//
// loadRemoteRoutes()

router.beforeResolve(async (to, from, next) => {
  if (!to.matched.length) {
    next({ path: '/not-found' });
    return;
  }
  next();
});

export default router;
