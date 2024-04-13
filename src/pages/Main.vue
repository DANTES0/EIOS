<script setup>
import Kafedra from "../components/Kafedra.vue"
import News from "../components/News.vue"
import Tabs from "../components/Tabs.vue"
import DepartamentInNumbers from "../components/DepartamentInNumbers.vue"
import BriefNews from "../components/BriefNews.vue"
import { useFetch } from "@vueuse/core"
import { computed, ref } from "vue"
import { onMounted } from "vue"
const url = computed(() => {
  //return `http://25.61.98.183:8080/news/1`
  return `http://25.61.98.183:8080/news/shorts`
})
const extractedId = ref(null)
const text = ref(null)
const date = ref(null)
const category = ref(null)
const urls = ref(null)

//массив для новостей
let news = ref(null)
const currentNewsIndex = ref(0)

const nextNews = () => {
  currentNewsIndex.value = (currentNewsIndex.value + 1) % news.value.length
  console.log(currentNewsIndex.value)
}

const prevNews = () => {
  if (currentNewsIndex.value == 0) {
    currentNewsIndex.value = news.value.length - 1
  } else {
    currentNewsIndex.value = Math.abs(
      (currentNewsIndex.value - 1) % news.value.length
    )
  }
  console.log(currentNewsIndex.value)
}

const currentNews = computed(() =>
  news.value ? news.value[currentNewsIndex.value] : null
)

// const aboba = async()  => { const response = await useFetch(url).json();
//     extractedId.value = response.data.value.id
//     console.log(response.data.value)
//     console.log(extractedId.value)
//     text.value = response.data.value.headLine
//     date.value = response.data.value.date
//     category.value = response.data.value.category
//     urls.value = response.data.value.urls
//     console.log(text.value);
//     console.log(JSON.parse(JSON.stringify(urls.value)));
// };

const aboba = async () => {
  const response = await useFetch(url).json()
  //если url - новость по индексу
  extractedId.value = response.data.value.id
  text.value = response.data.value.headLine
  //console.log(extractedId.value, text.value)

  //если url - shorts
  news.value = response.data.value
  //console.log(news.value)
}

// console.log(aboba());
// a = ref(aboba())
//console.log(a.value);
//let id = 5;
//console.log(id)
onMounted(() => {
  aboba()
  console.log(news)
  console.log(currentNewsIndex.value)
})

//console.log(text)
</script>

<template>
  <div class="Main-page">
    <!-- <div class="container"> -->
    <Tabs></Tabs>
    <Kafedra></Kafedra>
    <News></News>
    <!-- <DepartamentInNumbers></DepartamentInNumbers> -->
    <!-- <BriefNews :id = extractedId
                       :headLine = text
                       :date = date
                       :category = category
                       :urls = urls></BriefNews> -->
    <div class="clp-cont"></div>
    <BriefNews
      v-if="news && news.length > 1 && currentNewsIndex !== null"
      :id="currentNews.id"
      :headline="currentNews.headline"
      :category="currentNews.category"
      :date="currentNews.date"
      :url="currentNews.url"
      @next="nextNews"
      @prev="prevNews"
    >
    </BriefNews>
    <!-- </div> -->
  </div>
</template>

<style>
.container {
  margin-top: 71px;
  max-width: 1390px;
  margin: 0 auto;
  font-family: Jost;
  color: #408afa;
}
.clp {
  width: 700px;
  height: 700px;
  /* margin: 0 auto; */
}
.clp-cont {
  width: 100%;
  height: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}
</style>
