<template>
  <div class="view">Click the button in the heading :)</div>
</template>

<script>
export default {
  created() {
  },
};
</script>

<style scoped>
.view {
  position: absolute;
  color: white;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-size: 3rem;
  text-align: center;
  text-shadow: 2px 2px black;
}
</style>