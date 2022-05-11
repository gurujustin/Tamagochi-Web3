<template>
  <div>
    <form class="form" @submit="purchase">
      <label class="form-label" for="amount"
        >Amount of
        <span @click="etherscanFOOD" class="FOOD">$FOOD</span>:</label
      >
      <input class="form-input" type="number" v-model.number="amount" min="0" />
      <div class="form-message">FOOD:ETH ratio = 100:1</div>
      <button class="form-button" type="submit">Buy</button>
    </form>
    <base-loader v-if="loading" />
  </div>
</template>

<script>
import { ethers } from "ethers";

export default {
  data() {
    return {
      amount: 0,
      loading: false,
    };
  },
  methods: {
    async purchase(e) {
      e.preventDefault();
      this.loading = true;
      try {
        console.log(ethers.utils.parseEther(String(this.amount * 0.01)).toString());
        await this.$store.getters.MarketContract.purchaseFood({
          value: ethers.utils.parseEther(String(this.amount * 0.01)).toString(),
        });
      } catch (err) {
        console.log(err.message);
      } finally {
        this.loading = false;
      }
    },
    async etherscanFOOD() {
      console.log(await this.$store.getters.MarketContract.token())
      window.open(
        "https://ropsten.etherscan.io/address/" +
          await this.$store.getters.MarketContract.token(),
        "_blank"
      );
    },
  },
};
</script>


<style scoped>
.form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: rgba(43, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 20rem;
  max-width: 50%;
  padding: 1rem 1.5rem;
  height: 12rem;
  max-height: 75%;
  border-radius: 3rem;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.25);
  color: white;
  text-shadow: 2px 2px black;
}

.form-label {
  font-size: 1.8rem;
  text-align: center;
  padding: 0.4rem 0;
}

.FOOD {
  transition: all 0.5s ease-in-out;
}

.FOOD:hover {
  color: rgb(27, 0, 20);
  cursor: pointer;
  text-shadow: none;
}

.form-input {
  font-size: 1.5rem;
  color: white;
  text-align: center;
  width: 20%;
  background-color: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 10rem;
  padding: 0.2rem 0.8rem;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.6);
  cursor: default;
  transition: all 0.25s ease-in-out;
}

.form-input:hover {
  width: 18%;
}

.form-message {
  font-size: 0.6rem;
  font-family: sans-serif;
  color: rgb(228, 228, 228);
  text-shadow: 1px 1px black;
  transform: translateY(-2px);
  transition: all 0.25s ease-in-out;
}

.form-message:hover {
  font-size: 0.65rem;
}

.form-button {
  cursor: pointer;
  background-color: rgba(27, 0, 20, 0.65);
  border: none;
  color: white;
  font-size: 1.2rem;
  padding: 0.3rem 1rem;
  border-radius: 5px;
  text-shadow: 1px 1px black;
  box-shadow: 2px 2px 5px black;
  transition: all 0.25s ease-in-out;
  -webkit-tap-highlight-color: transparent;
}

.form-button:hover {
  transform: translateY(-2px);
}
</style>