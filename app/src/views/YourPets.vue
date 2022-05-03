<template>
  <div class="pets">
    <tamagochi-card
      imageUrl="https://www.mpg.de/18490336/original-1648623768.webp?t=eyJ3aWR0aCI6NzUxLCJmaWxlX2V4dGVuc2lvbiI6IndlYnAiLCJvYmpfaWQiOjE4NDkwMzM2fQ%3D%3D--42a263e13b7525fc56fa8a1a719eb3d2747272b0"
      class="tamagochi-card"
    />
    <tamagochi-card
      imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1tkcBVGQFXZf2SlHJY5l5dDTllQUKllrSxg&usqp=CAU"
       class="tamagochi-card" />
    <tamagochi-card
      imageUrl="https://www.thesprucepets.com/thmb/JPj64QXhXciiXesjdQ_4liIKJD4=/4224x3168/smart/filters:no_upscale()/pet-parrot-on-human-hand-1022424278-5c3ded0ac9e77c00016e6e2b.jpg"
       class="tamagochi-card" />
  </div>
</template>

<script>
import TamagochiCard from "../components/TamagochiCard.vue";

export default {
  components: { TamagochiCard },
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