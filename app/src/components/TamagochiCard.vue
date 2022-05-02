<template>
  <div class="card">
    <img class="card-image" :src="imageUrl" />
    <div class="card-options">
      <button class="card-options-feed">Feed</button>
      <div class="card-options-timer">03:59:59</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["imageUrl"],
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  margin: 2rem;
  border-radius: 3rem;
  overflow: hidden;
  background-color: rgb(0, 0, 0, 0.5);
  box-shadow: 0 0 6px 3px rgb(0, 0, 0, 0.5);
}

.card-image {
  height: 80%;
}

.card-options {
  display: grid;
  grid-template-areas: "feed timer";
  align-content: stretch;
  height: 20%;
  width: 100%;
  box-shadow: 0 0 5px 2px rgb(0, 0, 0);
}

.card-options-feed {
  grid-area: feed;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: rgba(27, 0, 20, 0.65);
  border: none;
  border-right: 2px solid white;
  color: white;
  font-size: 1.2rem;
  max-width: 100%;
  transition: all 0.2s ease-in-out;
  -webkit-tap-highlight-color: transparent;
}

.card-options-feed:hover {
  font-size: 1.3rem;
  background-color: rgba(27, 0, 20, 0.75);
}

.card-options-timer {
  display: flex;
  align-items: center;
  color: white;
  text-shadow: 1px 1px black;
  justify-content: center;
  grid-area: timer;
}
</style>


