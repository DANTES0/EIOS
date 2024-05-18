<script setup>
import NavBar from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import Auth from "./components/Auth.vue";
import { ref } from "vue";
import { authState } from './authState';

function visibleAuth () 
{ 
  
  isVisible.value = !isVisible.value
  console.log(isVisible.value)
}


</script>

<template>
  <div class="wrap">
    <Auth v-if="authState.isVisible"></Auth>
    <NavBar></NavBar>
    
    <div class="main-background">
      
      <router-view />
    </div>
  </div>
  <!-- <Footer></Footer> -->
</template>

<style scoped>
* {
  background-color: #1f1f1f;
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
.main-background {
  width: 100vw;
}
</style>
