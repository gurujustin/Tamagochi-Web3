<template>
  <div class="card">
    <div
      class="card-image"
      :style="{ 'background-image': `url(${imageUrl})` }"
    />
    <div class="card-options">
      <button @click="feed" class="card-options-feed">Feed</button>
      <div class="card-options-timer">
        {{ timerFormat }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["petId", "imageUrl", "timeLeft"],
  emits: ["petFeed"],
  data() {
    return {
      timer: 0,
    };
  },
  created() {
    this.timer = this.timeLeft;
    setInterval(() => {
      if (this.timer > 0) this.timer -= 1000;
    }, 1000);
  },
  computed: {
    timerFormat() {
      return new Date(this.timer).toISOString().slice(11, 19);
    },
  },
  methods: {
    async feed() {
      try {
        await this.$store.getters.FoodContract.feedPet(this.petId);
        this.$emit("petFeed");
      } catch (err) {
        console.log(err.message);
      }
    },
  },
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
  background-repeat: no-repeat;
  background-size: cover;
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
  font-size: 1.1rem;
  justify-content: center;
  text-align: center;
  grid-area: timer;
}
</style>


