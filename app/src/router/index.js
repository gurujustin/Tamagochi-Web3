import { createRouter, createWebHistory } from 'vue-router';
import YourPets from '../views/YourPets.vue';
import store from '../store';

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
  },
  {
    path: '/mint/pet',
    name: 'MintPet',
    component: () => import(/* webpackChunkName: "MintPet" */ '../views/MintPet.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  const connected = (await store.getters.provider?.listAccounts()).length > 0;
  if (connected) await store.dispatch('setupMetamask');
  if (store.getters.chainId === 3 &&
    store.getters.userAddress !== null) {
    next();
  } else {
    next({ name: 'NotFound' });
  }
});

export default router;
