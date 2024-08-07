<script setup>
import Tabs from '../components/Tabs.vue';
import NewsBlock from '../components/NewsPageComponents/NewsBlock.vue';
import VPagination from '../components/NewsPageComponents/VPagination.vue';
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import config from '../config';
import ProgressSpinner from 'primevue/progressspinner';

const newsData = ref([]);
const currentPage = ref(1);
const newsPerPage = 12; // Отображаем одну новость на странице
const isLoading = ref(false); // Добавляем состояние загрузки
const route = useRoute();
const router = useRouter();

async function loadNews() {
    isLoading.value = true; // Начало загрузки

    const urlAddress = config.ServerURL;

    let requestAddress = `${urlAddress}/news/get/all`;

    const categories = route.query.categories ? route.query.categories.split(';') : [];
    const startDate = route.query.startDate ? route.query.startDate : null;
    const endDate = route.query.endDate ? route.query.endDate : null;

    if (categories.length === 0 && !startDate && !endDate) {
        requestAddress = `${urlAddress}/news/get/all`;
    } else if (categories.length === 0 && startDate && endDate) {
        requestAddress = `${urlAddress}/news/get/all?startDate=${startDate}&endDate=${endDate}`;
    } else if (categories.length > 0 && !startDate && !endDate) {
        requestAddress = `${urlAddress}/news/get/all?categories=${categories.join(';')}`;
    } else if (categories.length > 0 && startDate && endDate) {
        requestAddress = `${urlAddress}/news/get/all?categories=${categories.join(';')}&startDate=${startDate}&endDate=${endDate}`;
    } else if (categories.length === 0 && startDate && !endDate) {
        requestAddress = `${urlAddress}/news/get/all?startDate=${startDate}`;
    } else if (categories.length > 0 && startDate && !endDate) {
        requestAddress = `${urlAddress}/news/get/all?categories=${categories.join(';')}&startDate=${startDate}`;
    } else if (categories.length === 0 && !startDate && endDate) {
        requestAddress = `${urlAddress}/news/get/all?endDate=${endDate}`;
    } else if (categories.length > 0 && !startDate && endDate) {
        requestAddress = `${urlAddress}/news/get/all?categories=${categories.join(';')}&endDate=${endDate}`;
    }

    try {
        const response = await fetch(requestAddress);

        if (response.ok) {
            const data = await response.json();

            newsData.value = data;
        } else {
            console.error('Ошибка при загрузке данных:', response.statusText);
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    } finally {
        isLoading.value = false; // Окончание загрузки
    }
}

loadNews();

watch(route, () => {
    loadNews();
});

function navigateToNews(newsId) {
    router.push(`/news/get/${newsId}`);
}

const paginatedNews = computed(() => {
    const start = (currentPage.value - 1) * newsPerPage;
    const end = start + newsPerPage;

    console.log(newsData.value.slice(start, end));

    return newsData.value.slice(start, end);
});
</script>

<template>
    <Tabs />

    <div class="news-page-container">
        <div v-if="isLoading" class="spinner-container">
            <ProgressSpinner />
        </div>

        <div class="news-page-content">
            <div v-for="newsItem in paginatedNews" :key="newsItem.id" class="news-block">
                <NewsBlock
                    :news-tag="newsItem.category"
                    :news-title="newsItem.headline"
                    :news-date="newsItem.date"
                    :news-image="newsItem.images[0]"
                    :news-description="newsItem.fullInfo"
                    @click="navigateToNews(newsItem.id)"
                />
            </div>
        </div>

        <div v-show="!isLoading" class="pagination-wrapper">
            <VPagination
                v-model:modelValue="currentPage"
                :total-records="newsData.length"
                :rows-per-page="newsPerPage"
            />
        </div>
    </div>
</template>

<style scoped>
.news-page-container {
    display: block;
    margin: auto auto;
    width: 1422px;

    min-height: 674px;
    max-height: 2420px;

    margin-top: 30px;
    margin-bottom: 78px;
}
.news-page-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px 74px;

    padding-bottom: 50px;
}
.news-block {
    cursor: pointer;
    width: 425px;
    height: 532px;
    transition: transform 0.2s ease-in-out;
}
.news-block:hover {
    transform: scale(1.04);
}
.pagination-wrapper {
    margin: 0 auto;
    width: 1064px;
    height: 92px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.spinner-container {
    min-height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
