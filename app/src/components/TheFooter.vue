<template>
  <footer class="footer">
    <span class="footer-link" @click="openSourceCode"
      >© All right reserved 2022</span
    >
  </footer>
</template>

<script>
export default {
  methods: {
    openSourceCode() {
      window.open(
        "https://github.com/GeorgiGeorgiev7/Tamagochi-Web3",
        "_blank"
      );
    },
  },
};
</script>


<style scoped>
.footer {
  position: fixed;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-99%);
  width: 25rem;
  max-width: 65%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    135deg,
    rgba(2, 0, 36, 1) 15%,
    rgb(49, 1, 43) 100%
  );
  color: white;
  text-decoration: underline;
  padding: 0.2rem 0;
  box-shadow: 0 0 5px 4px rgb(0, 0, 31);
  z-index: 1000;
  border-radius: 4rem 4rem 0 0;
}

.footer-link {
  cursor: pointer;
}
</style>