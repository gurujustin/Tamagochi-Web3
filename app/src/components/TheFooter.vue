<template>
  <footer class="footer">
    <span class="footer-link" @click="openSourceCode">© All right reserved 2022</span>
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
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0, 0, 31);
  color: white;
  text-decoration: underline;
  padding: 0.2rem 0;
  box-shadow: 0 0 5px 4px rgb(0, 0, 31);
}

.footer-link {
  cursor: pointer;
}
</style>