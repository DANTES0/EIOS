<script setup>
import config from '../../config';
import NewsBlock from '../NewsPageComponents/NewsBlock.vue';
import { useFetch } from '@vueuse/core';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
let news = ref([]);
const flag = ref(false);
const route = useRoute();
const router = useRouter();
const loadNews = async () => {
    const response = await useFetch(`${config.KirURL}/news/get/all`).json();
    news.value = response.data.value;
    console.log(response.data.value);
};
loadNews();

watch(route, () => {
    loadNews();
});

async function navigateToNews(newsId) {
    if (flag.value == true) {
        await useFetch(`${config.KirURL}/news/delete/${newsId}`, {
            method: 'POST',
        });
        flag.value = !flag.value;
        loadNews();
    } else {
        router.push(`/news/get/admin/${newsId}`);
    }
}

function addNews() {
    router.push(`/news/get/admin`);
}
</script>

<template>
    <div class="content-news-admin">
        <header class="content-header">
            <div class="line"></div>
            <h1>Новости</h1>
        </header>

        <div class="content-wrap-news">
            <button @click="addNews" class="addNews">Добавить новость</button>
            <button
                @click="() => (flag = !flag)"
                class="addNews"
                style="margin-left: 900px"
            >
                Удаление новостей
            </button>
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
    src: url('../../assets/JetBrainsMono.ttf');
}

.addNews {
    font-family: JetBrainsMono;
    font-size: 24px;
    color: white;
    font-weight: 400;
    border: 1px solid #cccccc;
    border-radius: 6px;
    padding: 10px;
    margin-bottom: 40px;
    transition: 0.3s ease;
}
.addNews:hover {
    background-color: #222222;
    border-color: #1e66f5;
}

.addNews:active {
    background-color: #333333;
    border-color: #1e66f5;
}

.news-block {
    cursor: pointer;
    width: 425px;
    height: 532px;
    transition: transform 0.2s ease-in-out;
}
.news-page-content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 50px 74px;

    padding-bottom: 50px;
}
.content-wrap-news {
    display: block;
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
    border-bottom: solid 1px #2b2b2b;
    /* border-left: solid 1px #2B2B2B; */

    background-color: #181818;
}

.line {
    width: 1px;
    height: 100%;
    background-color: #2b2b2b;
}

.content-header h1 {
    font-family: 'JetBrains Mono', monospace;
    margin-left: 20px;
    font-size: 1.5em;
    color: white;
}
</style>
