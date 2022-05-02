<template>
  <div>
    <header :class="{ header: true, mobile: showMobileHeader && mobileMode }">
      <router-link
        @click="toggle"
        :class="{ 'router-link': true, active: path == '/' }"
        to="/"
        ><span>Your Pets</span></router-link
      >
      <router-link
        @click="toggle"
        :class="{ 'router-link': true, active: path == '/mint/food' }"
        to="/mint/food"
        ><span>Buy $FOOD</span></router-link
      >
      <router-link
        @click="toggle"
        :class="{ 'router-link': true, active: path == '/mint/pet' }"
        to="/mint/pet"
        ><span>Create</span></router-link
      >
      <user-address class="userAddress" :userAddress="userAddress" />
      <router-link v-if="!userAddress" class="router-link" to="/"
        >Connect</router-link
      >
    </header>
    <header
      v-if="!showMobileHeader && mobileMode"
      class="toggle"
      @click="toggle"
    >
      <div class="toggle-line"></div>
      <div class="toggle-line"></div>
      <div class="toggle-line"></div>
    </header>
    <div
      class="backdrop"
      @click="toggle"
      v-if="showMobileHeader && mobileMode"
    ></div>
  </div>
</template>

<script>
import UserAddress from "./UserAddress.vue";

export default {
  components: { UserAddress },
  data() {
    return {
      userAddress: "0xeb76da1a8a49673be0922645205c78d993a86758",
      mobileMode: window.innerWidth < 648,
      showMobileHeader: false,
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.mobileMode = window.innerWidth < 648;
    });
  },
  methods: {
    toggle() {
      if (!this.mobileMode) return;
      this.showMobileHeader = !this.showMobileHeader;
    },
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
};
</script>

<style scoped>
.header {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    135deg,
    rgba(2, 0, 36, 1) 15%,
    rgba(91, 3, 80, 1) 100%
  );
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 42rem;
  border-radius: 0 0 2rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem 0;
  box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.75);
  z-index: 1000;
}

.router-link {
  text-decoration: none;
  color: rgb(200, 200, 200);
  text-shadow: 2px 2px black;
  font-size: 1.7rem;
}

.toggle,
.mobile,
.backdrop {
  display: none;
}

.active {
  color: white;
}

@media only screen and (max-width: 672px) {
  .header {
    display: none;
  }

  .toggle {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 100%;
    transform: translateX(-100%);
    align-items: center;
    justify-content: space-evenly;
    padding: 0.5rem;
    background-color: rgba(0, 0, 0, 0.05);
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 2px 0 2px 10px;
    cursor: pointer;
    z-index: 1;
  }

  .toggle-line {
    width: 80%;
    height: 10%;
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
  }

  .mobile {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 85vw;
    left: calc(50% - 7.5vw);
    background: rgb(58, 0, 58);
    box-shadow: 0 0 25px 20px rgb(0, 0, 0);
    z-index: 1001;
    height: 100vh;
  }

  .router-link {
    font-size: 1.6rem;
    text-shadow: 2px 2px black;
    padding: 2rem 0;
  }

  .router-link span {
    widows: auto;
    cursor: pointer;
  }

  .userAddress {
    display: none;
  }

  .backdrop {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgb(0, 0, 0, 0.5);
    cursor: pointer;
    z-index: 10;
  }
}
</style>