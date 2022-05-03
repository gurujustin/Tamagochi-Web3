import { createStore } from 'vuex';
import { ethers } from 'ethers';

const store = createStore({
  state: {
    userAddress: null,
    chainId: null,
    provider: new ethers.providers.Web3Provider(window.ethereum)
  },
  mutations: {
    userAddress(state, userAddress) {
      state.userAddress = userAddress;
    },
    chainId(state, chainId) {
      state.chainId = chainId;
    },
  },
  getters: {
    userAddress: (state) => state.userAddress,
    chainId: (state) => state.chainId,
    provider: (state) => state.provider,
  },
  actions: {
    async setupMetamask({ getters, commit }) {
      if (getters.userAddress) return;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      commit("userAddress", await signer.getAddress());
      commit("chainId", parseInt(provider.provider.chainId));
    }
  }
});


export default store;