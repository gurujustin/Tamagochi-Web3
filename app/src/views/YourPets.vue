<template>
  <div>
    <div class="pets">
      <tamagochi-card
        v-for="pet in pets"
        :key="pet.id"
        @petFeed="fetchData"
        :petId="pet.id"
        :imageUrl="pet.image"
        :timeLeft="pet.timeLeft"
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
      this.pets = [];
      this.loading = true;
      try {
        const _petsIDs = await this.$store.getters.PetContract.petsOf(
          this.$store.getters.userAddress
        );
        let tokenURIs = [];

        for (const petId of _petsIDs) {
          let [timeLeft, tokenURI] = await Promise.all([
            this.$store.getters.PetContract.starve(petId),
            this.$store.getters.PetContract.tokenURI(petId),
          ]);
          timeLeft = Number(timeLeft) * 1000 - new Date().getTime();
          if (timeLeft > 0) {
            this.pets.push({
              id: petId,
              timeLeft,
            });
            tokenURIs.push(tokenURI);
          }
        }

        // optimized fetching
        const fetchedTokenURIs = await Promise.all(
          tokenURIs.map((tokenURI) => {
            return fetch(tokenURI);
          })
        );
        const parsedTokenURIs = await Promise.all(
          fetchedTokenURIs.map((fetchedTokenURI) => {
            return fetchedTokenURI.json();
          })
        );

        for (let i = 0; i < parsedTokenURIs.length; i++) {
          this.pets[i].image = parsedTokenURIs[i].properties.image;
        }
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