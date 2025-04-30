import { createRouter as createVueRouter, createWebHistory } from 'vue-router';

const Home = () => import('@/core/home/home.vue');
const Error = () => import('@/core/error/error.vue');
import account from '@/router/account';
import admin from '@/router/admin';
import pages from '@/router/pages';
import entities from "@/router/entities.ts";
import * as bridge from '@module-federation/bridge-vue3';

const Remote2 = bridge.createRemoteComponent({ loader: () =>  import('sport/export-app'), rootAttrs: {class: 'root-element-class'} });

export const createRouter = () =>
  createVueRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      { path: '/sport/:pathMatch(.*)*', component: Remote2 },
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
      entities,
      ...admin,
      ...pages,
    ],
  });

const router = createRouter();

router.beforeResolve(async (to, from, next) => {
  if (!to.matched.length) {
    next({ path: '/not-found' });
    return;
  }
  next();
});

export default router;
