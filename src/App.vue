<script setup>
import  NavBar from './components/Header.vue';
</script>

<template>
  <NavBar>
  </NavBar>
  <div class="main-background">
    <router-view/>
  </div>
</template>

<style scoped>
* {
  background-color: #151A31;
}

    .text-vo {
      width: 100%;
      max-width: 1336px;
      height: 400px;
    }
</style>
