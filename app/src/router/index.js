import { createRouter, createWebHistory } from 'vue-router';
import YourPets from '../views/YourPets.vue';
import store from '../store';

let initialLoad = true;

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
  },
  {
    path: '/connect',
    name: 'ConnectMetamask',
    component: () => import(/* webpackChunkName: "ConnectMetamask" */ '../views/ConnectMetamask.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  if (initialLoad) {
    await store.dispatch('setupMetamask', true);
    initialLoad = false;
  }
  if (store.getters.chainId === 3 &&
    store.getters.userAddress?.length === 42 || to.name === 'NotFound' || to.name === 'ConnectMetamask') {
    next();
  } else if (!store.getters.userAddress) {
    next({ name: 'ConnectMetamask' });
  } else {
    next({ name: 'NotFound' });
  }
});

export default router;
