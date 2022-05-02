import { createRouter, createWebHistory } from 'vue-router';
import YourPets from '../views/YourPets.vue';

const routes = [
  {
    path: '/',
    name: 'YourPets',
    component: YourPets
  },
  {
    path: '/mint/food',
    name: 'MintFood',
    component: () => import(/* webpackChunkName: "MintFood" */ '../views/MintFood.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
