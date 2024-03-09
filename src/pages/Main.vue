<script setup>
import WelomTitle from '../components/WelomTitle.vue';
import DepartamentInNumbers from '../components/DepartamentInNumbers.vue';
import BriefNews from '../components/BriefNews.vue';
import {useFetch} from '@vueuse/core'
import { computed, ref } from 'vue';
import { onMounted } from 'vue';
const url = computed(( () =>  {
  return `http://25.61.98.183:8080/news/1`
}))
const extractedId = ref(null);
const text = ref(null);
const date = ref(null);
const category = ref(null);
const urls = ref(null);

const aboba = async()  => { const response = await useFetch(url).json();
    extractedId.value = response.data.value.id
    console.log(response.data.value)
    console.log(extractedId.value)
    text.value = response.data.value.headLine
    date.value = response.data.value.date
    category.value = response.data.value.category
    urls.value = response.data.value.urls
    console.log(text.value);
    console.log(JSON.parse(JSON.stringify(urls.value)));
};


// console.log(aboba());
// a = ref(aboba())
//console.log(a.value);
//let id = 5;
//console.log(id)
onMounted(() => {
  aboba();
});

//console.log(text)
</script>

<template>
    <div class="Main-page">
        {{ extractedId, text }}
        <div class="container">
            <WelomTitle></WelomTitle>
            <DepartamentInNumbers></DepartamentInNumbers>
            <BriefNews :id = extractedId
                       :headLine = text
                       :date = date
                       :category = category
                       :urls = urls></BriefNews>
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