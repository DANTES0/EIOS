<script setup>
import Tabs from '../components/Tabs.vue';
import NewsBlock from '../components/NewsPageComponents/NewsBlock.vue';
import VPagination from '../components/NewsPageComponents/VPagination.vue';
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import config from '../config';
import ProgressSpinner from 'primevue/progressspinner';

const newsData = ref([]);
let newsTotal = 0;
const currentPage = ref(1);
const newsPerPage = 2; // Отображаем одну новость на странице
const isLoading = ref(false); // Добавляем состояние загрузки
const areLoaded = ref(false); // Добавляем состояние загрузки
const route = useRoute();
const router = useRouter();

async function loadNews() {
    isLoading.value = true; // Начало загрузки
    areLoaded.value = false;

    const urlAddress = config.ServerURL;

    const categories = route.query.categories ? route.query.categories.split(';') : [];
    const startDate = route.query.startDate ? route.query.startDate : null;
    const endDate = route.query.endDate ? route.query.endDate : null;

    // Формируем объект параметров
    const params = new URLSearchParams({
        pageSize: newsPerPage,
        pageNumber: currentPage.value - 1,
        ...(categories.length > 0 && { category: categories.join(',') }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
    });

    const requestAddress = `${urlAddress}/api/v1/news?${params.toString()}`;

    try {
        const response = await fetch(requestAddress);

        if (response.ok) {
            const responseData = await response.json();

            newsData.value = responseData.data;
            newsTotal = responseData.totalCount;
            areLoaded.value = true;

            console.log(newsData.value);
        } else {
            console.error('Ошибка при загрузке данных:', response.statusText);
            areLoaded.value = false;
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        areLoaded.value = false;
    } finally {
        isLoading.value = false; // Окончание загрузки
    }
}

loadNews();

watch(route, () => {
    loadNews();
});

// Следим за изменением текущей страницы
watch(currentPage, () => {
    loadNews();
});

function navigateToNews(newsId) {
    router.push(`/news/get/${newsId}`);
}

// function navigateToNews(newsId) {
//     router.push(`/api/v1/news/${newsId}`);
// }
</script>

<template>
    <Tabs v-if="showTabs" title="Новости кафедры" :show-icon="false" />

    <div class="news-page-container">
        <div v-if="isLoading" class="spinner-container">
            <ProgressSpinner class="custom-spinner" />
        </div>

        <div v-else-if="areLoaded && newsData.length" class="news-page-content">
            <div v-for="newsItem in newsData" :key="newsItem.id" class="news-block">
                <NewsBlock
                    :news-tag="newsItem.category"
                    :news-title="newsItem.headline"
                    :news-date="newsItem.date"
                    :news-image="`https://security-jwt.onrender.com/api/v1/image?fileName=${newsItem.images[0].filename}&imageType=NewsImage`"
                    :news-description="newsItem.mainInformation"
                    @click="navigateToNews(newsItem.id)"
                />
            </div>
        </div>

        <div v-else class="error-message">
            <p>Новости не удалось загрузить. Пожалуйста, попробуйте позже.</p>
        </div>

        <div
            v-show="!isLoading && areLoaded && newsData.length"
            class="pagination-wrapper"
        >
            <VPagination
                v-model:modelValue="currentPage"
                :total-records="newsTotal"
                :rows-per-page="newsPerPage"
            />
        </div>
    </div>
</template>

<style scoped>
.error-message {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    font-size: 18px;
    font-family: Nunito;
    font-weight: 200;

    min-height: inherit;
    max-height: inherit;
}
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
.custom-spinner {
    --p-progressspinner-color-1: rgb(0, 84, 255);
    --p-progressspinner-color-2: rgb(0, 84, 255);
    --p-progressspinner-color-3: rgb(0, 84, 255);
    --p-progressspinner-color-4: rgb(0, 84, 255);
}
</style>
