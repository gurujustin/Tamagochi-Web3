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
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue')
  },
  {
    path: '/connect',
    name: 'ConnectMetamask',
    component: () => import(/* webpackChunkName: "ConnectMetamask" */ '../views/ConnectMetamask.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch('setupMetamask');
  console.log(store.getters.chainId);
  console.log(store.getters.userAddress);
  if (store.getters.chainId === 3 &&
    store.getters.userAddress?.length === 42 || to.name === 'NotFound' || to.name === 'ConnectMetamask') {
    next();
  } else if (store.getters.chainId !== 3) {
    next({ name: 'NotFound' });
  } else {
    next({ name: 'ConnectMetamask' });
  }
});

export default router;
