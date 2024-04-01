<script setup>
import  NavBar from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="wrap">
  <NavBar>
  </NavBar>
    <div class="main-background">
      <router-view/>
    </div>
  </div>
  <Footer></Footer>
</template>

<style scoped>
  * {
    background-color: #151A31;
    height: 100%;
  }
  .wrap {
    display: flex;
    flex-direction: row;
  }
  .text-vo {
    width: 100%;
    max-width: 1336px;
    height: 400px;
  }
</style>
