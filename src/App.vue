<script setup>
import NavBar from "./components/Header.vue"
import Auth from "./components/Auth.vue";
import { authState } from './authState';
import useAuthenticatedFetch from './fetchInterceptor';
import config from "./config";

const fetch = async () => {
 const {statusCode} = await useAuthenticatedFetch(`${config.KirURL}/api/v1/admin`).get()
 console.log(statusCode)
 if (statusCode.value == '200') {
  authState.isAccess = true
  console.log(authState.isAccess)
 } 
  console.log('ЗАПРОС')
}
fetch();

// function visibleAuth () 
// { 
  
//   isVisible.value = !isVisible.value
//   console.log(isVisible.value)
// }


</script>

<template>
  <div class="wrap">
    <Auth v-if="authState.isVisible"></Auth>
    <NavBar v-if="$route.path != '/admin' && $route.path != `/news/get/admin/${$route.params.id}` && $route.path != `/news/get/admin`" ></NavBar>
    
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
