import { createRouter, createWebHistory } from 'vue-router';
import YourPets from '../views/YourPets.vue';

const routes = [
  {
    path: '/',
    name: 'YourPets',
    component: YourPets
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
