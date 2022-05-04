import { createStore } from 'vuex';
import { ethers } from 'ethers';
import router from '../router';
import { create } from "ipfs-http-client";

const store = createStore({
  state: {
    userAddress: null,
    chainId: null,
    provider: window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : null,
    ipfs: create("https://ipfs.infura.io:5001/api/v0"),
    MarketContract: null,
    FoodContract: null,
    PetContract: null
  },
  mutations: {
    userAddress(state, userAddress) {
      state.userAddress = userAddress;
    },
    chainId(state, chainId) {
      state.chainId = chainId;
    },
    MarketContract(state, MarketContract) {
      state.MarketContract = MarketContract;
    },
    FoodContract(state, FoodContract) {
      state.FoodContract = FoodContract;
    },
    PetContract(state, PetContract) {
      state.PetContract = PetContract;
    },
  },
  getters: {
    userAddress: (state) => state.userAddress,
    chainId: (state) => state.chainId,
    provider: (state) => state.provider,
    ipfs: (state) => state.ipfs,
    MarketContract: (state) => state.MarketContract,
    FoodContract: (state) => state.FoodContract,
    PetContract: (state) => state.PetContract,
  },
  actions: {
    async setupMetamask({ getters, commit }) {
      if (!window.ethereum) return;
      if (getters.userAddress?.length === 42 && getters.chainId === 3) return;
      const connected = (await store.getters.provider?.listAccounts()).length > 0;
      if (!connected) return;
      await getters.provider.send("eth_requestAccounts", []);
      const signer = getters.provider.getSigner();
      commit("userAddress", await signer.getAddress());
      commit("chainId", parseInt(await window.ethereum.request({ method: 'eth_chainId' })));
      window.ethereum.on("chainChanged", async (_chainId) => {
        const id = parseInt(_chainId, 16);
        commit('chainId', id);

        id === 3
          ? router.push('/')
          : router.push({ name: 'NotFound' });
      });
      window.ethereum.on("accountsChanged", async (_accounts) => {
        commit('userAddress', _accounts[0]);
        if (!_accounts[0]) location.reload();
        else router.push('/');
      });
    },
    setupContracts({ commit }, contracts) {
      commit('MarketContract', contracts.MarketContract);
      commit('FoodContract', contracts.FoodContract);
      commit('PetContract', contracts.PetContract);
    }
  }
});


export default store;