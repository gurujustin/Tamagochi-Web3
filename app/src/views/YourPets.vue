<template>
  <div>
    <div class="pets">
      <tamagochi-card
        v-for="pet in pets"
        :key="pet.id"
        imageUrl="https://www.mpg.de/18490336/original-1648623768.webp?t=eyJ3aWR0aCI6NzUxLCJmaWxlX2V4dGVuc2lvbiI6IndlYnAiLCJvYmpfaWQiOjE4NDkwMzM2fQ%3D%3D--42a263e13b7525fc56fa8a1a719eb3d2747272b0"
        class="tamagochi-card"
      />
    </div>
    <base-loader v-if="loading" />
  </div>
</template>

<script>
import TamagochiCard from "../components/TamagochiCard.vue";

export default {
  components: { TamagochiCard },
  data() {
    return {
      pets: [],
      loading: false,
    };
  },
  async created() {
    if (this.$store.getters.PetContract) await this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        this.pets = await this.$store.getters.PetContract.petsOf(
          this.$store.getters.userAddress
        );
        console.log(this.pets);
      } catch (err) {
        console.log(err.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.pets {
  position: absolute;
  padding: 0 2rem;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  /* background-color: red; */
  width: 75%;
  max-width: 100rem;
}

.tamagochi-card {
  height: 14rem;
  width: 15rem;
  max-width: 100%;
}

@media only screen and (max-width: 672px) {
  .pets {
    top: 5rem;
    padding-bottom: 5rem;
  }
}
</style>