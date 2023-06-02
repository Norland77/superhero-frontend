<script setup>

import VHeader from "@/components/VHeader/VHeader.vue";
</script>

<template>
  <div class="app">
    <VHeader></VHeader>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.app {
  width: 100%;
}
</style>
