<template>
  <div class="superhero">
    <div class="superhero__body">
      <div class="superhero__image-list">
        <img v-for="item of store.superhero.images" class="superhero__img" :src="`http://localhost:3000/heroImg/${item.name}`" alt="">
      </div>
      <div class="superhero__info">
        <p class="superhero__text">nickname: {{store.superhero.nickname}}</p>
        <p class="superhero__text">real name: {{store.superhero.real_name}}</p>
        <p class="superhero__text">origin description: {{store.superhero.origin_description}}</p>
        <p class="superhero__text">superpowers: {{store.superhero.superpowers}}</p>
        <p class="superhero__text">catch phrase: {{store.superhero.catch_phrase}}</p>
      </div>
    </div>
    <VFormUpdate :id="route.params.id" :getHero="getHero"></VFormUpdate>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, reactive} from "vue";
import VFormUpdate from "../components/VFormUpdate/VFormUpdate.vue";

const store = reactive({
  superhero: {},
})

const route = useRoute()
onMounted( () => {
  getHero();
})
async function getHero() {
  const response = await fetch(`http://localhost:3000/superhero/${route.params.id}`, {
    method: "GET",
  })
  const result = await response.json();
  console.log(result)
  store.superhero = result
}


</script>

<style scoped lang="scss">
.superhero {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  &__body {
    width: 100%;
    border: solid black 1px;
    border-radius: 25px;
  }
  &__image-list {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
  &__img {
    width: 20%;
  }
  &__info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
    align-items: center;
  }
  &__text {
    font-size: 24px;
    font-weight: bold;
  }
}
</style>