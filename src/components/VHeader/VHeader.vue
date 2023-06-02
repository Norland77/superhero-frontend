<template>
  <div class="header">
    <router-link :to="{name: 'home'}" class="header__logo"> SUPERHERO </router-link>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
  .header {
    height: 80px;
    width: 100%;
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
    justify-content: center;
    &__logo {
      font-family: 'Liberation Sans',sans-serif;
      font-style: italic;
      font-weight: 400;
      font-size: 48px;
      line-height: 25px;
      color: black;
    }
  }
</style>