import { Authority } from '@/shared/security/authority';
const Entities = () => import('@/entities/entities.vue');

const Sport = () => import('@/entities/sport/sport.vue');
const SportUpdate = () => import('@/entities/sport/sport-update.vue');
const SportDetails = () => import('@/entities/sport/sport-details.vue');

// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export const routes = [
  {
    path: '/sport',
    name: 'Sport',
    component: Sport,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/sport/new',
    name: 'SportCreate',
    component: SportUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/sport/:sportId/edit',
    name: 'SportEdit',
    component: SportUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/sport/:sportId/view',
    name: 'SportView',
    component: SportDetails,
    meta: { authorities: [Authority.USER] },
  },
];

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'sport',
      name: 'Sport',
      component: Sport,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'sport/new',
      name: 'SportCreate',
      component: SportUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'sport/:sportId/edit',
      name: 'SportEdit',
      component: SportUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'sport/:sportId/view',
      name: 'SportView',
      component: SportDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
