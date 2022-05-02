<template>
  <div class="userAddress">{{ userAddress }}</div>
</template>

<script>
export default {
  props: ["userAddress"],
};
</script>

<style scoped>
.userAddress {
  color: white;
  font-size: 1.6rem;
  text-align: center;
  text-shadow: 2px 2px black;
  border: none;
  border-radius: 2rem;
  max-width: 8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.4rem 0.6rem 0.4rem 0.8rem;
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 5px black;
  cursor: default;
  transition: all 0.33s ease-in-out;
}

.userAddress:hover {
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.3);
}
</style>