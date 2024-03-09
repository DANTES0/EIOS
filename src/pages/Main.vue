<script setup>
import WelomTitle from '../components/WelomTitle.vue';
import DepartamentInNumbers from '../components/DepartamentInNumbers.vue';
import BriefNews from '../components/BriefNews.vue';
import {useFetch} from '@vueuse/core'
import { computed, ref } from 'vue';
const url = computed(( () =>  {
  return `http://25.61.98.183:8080/news/1`
}))
const aboba = async(id)  => { const response = await useFetch(url).json();
    console.log(response.data.value)
    id = response.data.value.id
return response.data.value};
let a;
//console.log(aboba());
a = ref(aboba())
console.log(a.value);

//console.log(id)
</script>

<template>
    <div class="Main-page">
        {{ id }}
        <div class="container">
            <WelomTitle></WelomTitle>
            <DepartamentInNumbers></DepartamentInNumbers>
            <BriefNews :id = id></BriefNews>
        </div>
    </div>
</template>

<style>
.container {
    margin-top: 71px;
    max-width: 1390px;
    margin: 0 auto;
    font-family: Jost;
    color: #408AFA;
}
</style>