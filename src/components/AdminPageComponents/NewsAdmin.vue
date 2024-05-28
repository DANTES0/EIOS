<script setup>
import config from '../../config';
import NewsBlock from '../NewsPageComponents/NewsBlock.vue';
import {useFetch} from "@vueuse/core";
import {ref, watch} from 'vue'
import { useRoute, useRouter } from 'vue-router';
let news = ref([])
const route = useRoute()
const router = useRouter()
const loadNews = async () => {
    const response = await useFetch(`${config.KirURL}/news/get/all`).json()
    news.value = response.data.value 
    console.log(response.data.value)
}
loadNews()

watch(route, () => {
    loadNews()
});

function navigateToNews(newsId) {
    router.push(`/news/get/admin/${newsId}`);
}
</script>

<template>
    <div class="content-news-admin">
        <header class="content-header">
        <div class="line"></div>
      <h1>Новости</h1>
    </header>
        <div class="content-wrap-news">
            <div class="news-page-content">
                <div class="news-block" v-for="newsItem in news"> 
                    <NewsBlock 
                        @click="navigateToNews(newsItem.id)"
                        :newsTag="newsItem.category"
                        :newsTitle="newsItem.headline"
                        :newsDate="newsItem.date"
                        :newsImage="newsItem.images[0]"
                        :newsDescription="newsItem.fullInfo"
                    ></NewsBlock>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped> 
@font-face {
  font-family: JetBrainsMono;
  src: url("../../assets/JetBrainsMono.ttf");
}
.news-block {
    cursor:pointer;
        width: 425px;
        height: 532px;
        transition: transform 0.20s ease-in-out;
}
.news-page-content {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 50px 74px;

        padding-bottom: 50px;
    }
.content-wrap-news {
    display:block;
        margin: auto auto;
        /* background-color: blueviolet; */
        width: 1422px;
 
        min-height: 674px;
        max-height: 2420px;

        margin-top: 30px;
        margin-bottom: 78px;
} 
.content-news-admin {
  display: flex;
  flex-direction: column;
  width: 100%;
  
}
.content-header {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  height: 70.5px;
  border-bottom: solid 1px #2B2B2B;
  /* border-left: solid 1px #2B2B2B; */

  background-color: #181818;
}

.line {
    width: 1px;
    height: 100%;
    background-color: #2B2B2B;
}

.content-header h1 {
  font-family: "JetBrains Mono", monospace;
  margin-left: 20px;
  font-size: 1.5em;
  color: white;
}
</style>