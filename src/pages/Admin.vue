<script setup>
import { useStore } from 'vuex';
import useAuthenticatedFetch from '../fetchInterceptor';

const store = useStore();

async function fetchData() {

// await fetch('http://25.59.204.137:8080/admin', {
//     method: 'GET',
//     headers: {Authorization: `Bearer`+' eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJha2l6YXIiLCJleHAiOjE3MTYwNjQ0NDYsInJvbGVzIjpbeyJpZCI6MSwibmFtZSI6IlJPTEVfQURNSU4ifV19.VoMXIWD-RxJjbRGHd3BosqAIvIXEfQ5vLM6P1z-3hrP7LLvNHfGqErtlH8-xkIRPe6fOsvKmk_A8mN9nHxQAjA'}
// })
  const { data, error, isFetching } = useAuthenticatedFetch('http://25.59.204.137:8080/admin').get().json();
  
  if (error.value) {
    console.error('Failed to fetch data:', error.value);
  } else {
    console.log('Data:', data.value);
  }
}
fetchData()
</script>

<template>
    <div style="color:aliceblue; font-size:30px" class="Admin-page">
        ADMIN
    </div>
</template>

<style>
</style>