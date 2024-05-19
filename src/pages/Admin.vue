<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';
import { authState } from '../authState';
import useAuthenticatedFetch from '../fetchInterceptor';
let visible = ref(false)
const store = useStore();

async function fetchData() {

// await fetch('http://25.59.204.137:8080/admin', {
//     method: 'GET',
//     headers: {Authorization: `Bearer`+' eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJha2l6YXIiLCJleHAiOjE3MTYwNjQ0NDYsInJvbGVzIjpbeyJpZCI6MSwibmFtZSI6IlJPTEVfQURNSU4ifV19.VoMXIWD-RxJjbRGHd3BosqAIvIXEfQ5vLM6P1z-3hrP7LLvNHfGqErtlH8-xkIRPe6fOsvKmk_A8mN9nHxQAjA'}
// })
  const { data, error, isFetching, statusCode } = await useAuthenticatedFetch('http://25.61.98.183:8080/admin').get();
  console.log(statusCode)
  console.log(store.getters.accessToken)
  if (statusCode.value =='403' || (statusCode.value == '401' && !store.getters.accessToken))
    {
      authState.isVisible = true
        visible.value = false
    } else {
      visible.value = true
    }
  if (error.value) {
    // console.error('Failed to fetch data:', error.value);
  } else {
    
    console.log('Data:', data.value);
  }
  if (!store.getters.isLoggedIn) {
        authState.isVisible = true
        visible.value = false
    }
}
fetchData()
</script>

<template>
    <div v-if="visible" style="color:aliceblue; font-size:30px" class="Admin-page">
        ADMIN
    </div>
</template>

<style>
</style>