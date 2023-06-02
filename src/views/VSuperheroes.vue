<template>
  <div class="superheroes">
    <div class="superheroes__list">
      <div class="superheroes__item" v-for="item of store.superheroes" :key="item._id">
        <img v-if="item.images[0]" class="superheroes__img" :src="`http://localhost:3000/heroImg/${item.images[0].name}`" alt="">
        <div class="superheroes__notFound" v-else>Picture not found</div>
        <router-link :to="{ name: 'superhero', params: { id: item._id } }" class="superheroes__name">{{ item.nickname }}</router-link>
        <button v-on:click="deleteHero(item._id)" class="superheroes__delete">Delete Hero</button>
      </div>
    </div>
    <div class="superheroes__buttons">
      <button v-on:click="prev">Prev</button>
      <button v-on:click="next">Next</button>
    </div>
    <VFormCreate></VFormCreate>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import VFormCreate from "../components/VFormCreate/VFormCreate.vue";

const store = reactive({
  offset: 0,
  total: 0,
  superheroes: [],
});

onMounted(async () => {
  await getAllHeroes(store.offset);
});

async function getAllHeroes(offset: number) {
  const response = await fetch(`http://localhost:3000/superhero?limit=5&offset=${offset}`, {
    method: "GET",
  });
  const result = await response.json();
  store.total = result.total;
  store.superheroes = result.superhero;
}

async function deleteHero(id: string) {
  await fetch(`http://localhost:3000/superhero/${id}`, {
    method: "DELETE",
  });
  await getAllHeroes(0)
}

function prev() {
  if (store.offset > 0) {
    const newOffset = store.offset - 5;
    store.offset = newOffset;
    getAllHeroes(newOffset);
  }
  console.log(store.offset)
}

function next() {
  if (store.offset + 5 < store.total) {
    const newOffset = store.offset + 5;
    store.offset = newOffset;
    getAllHeroes(newOffset);
  }
  console.log(store.offset)
}
</script>

<style scoped lang="scss">
.superheroes {
  margin: 50px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  &__list {
    width: 80%;
    margin: 25px;
    padding: 50px;
    border: solid black 1px;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__item {
    max-height: 100px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 25px;
    text-align: center;
    align-items: center;
  }

  &__img {
    width: 150px;
    height: 100px;
  }

  &__notFound {
    width: 150px;
    height: 100px;
    border: black solid 1px;
    border-radius: 25px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  &__name {
    font-size: 24px;
    font-weight: bold;
    color: black;
  }

  &__delete {
    width: 30%;
    height: 40px;
    background: none;
    border: solid black 1px;
    border-radius: 25px;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.5);
      transition-duration: .3s;
    }
  }

  &__buttons {
    width: 30%;
    margin: 15px;
    display: flex;
    justify-content: space-between;
    button {
      width: 30%;
      height: 40px;
      background: none;
      border: solid black 1px;
      border-radius: 25px;
      font-weight: bold;
      font-size: 20px;
      cursor: pointer;
      &:hover {
        background: rgba(0, 0, 0, 0.5);
        transition-duration: .3s;
      }
    }
  }
}
</style>