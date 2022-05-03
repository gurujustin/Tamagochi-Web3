import { createStore } from 'vuex';
import { ethers } from 'ethers';
import router from '../router';

const store = createStore({
  state: {
    userAddress: null,
    chainId: null,
    provider: window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : null
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
      console.log(1);
      if (!window.ethereum) return;
      console.log(2);
      if (getters.userAddress?.length === 42 && getters.chainId === 3) return;
      console.log(3);
      const connected = (await store.getters.provider?.listAccounts()).length > 0;
      if (!connected) return;
      console.log(4);
      await getters.provider.send("eth_requestAccounts", []);
      console.log(5);
      const signer = getters.provider.getSigner();
      console.log(6);
      commit("userAddress", await signer.getAddress());
      console.log(7);
      commit("chainId", parseInt(await window.ethereum.request({ method: 'eth_chainId' })));

      console.log(8);
      window.ethereum.on("chainChanged", async (_chainId) => {
        commit('chainId', _chainId);
        router.push('/');
      });
      window.ethereum.on("accountsChanged", async (_accounts) => {
        commit('userAddress', _accounts[0]);
        if (!_accounts[0]) location.reload();
        else router.push('/');
      });
    }
  }
});


export default store;