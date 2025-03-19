<script setup>
import Tabs from '../components/Tabs.vue';
import NewsBlock from '../components/NewsPageComponents/NewsBlock.vue';
import VPagination from '../components/NewsPageComponents/VPagination.vue';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import config from '../config';
import ProgressSpinner from 'primevue/progressspinner';
import Select from 'primevue/select';

const newsData = ref([]);
let newsTotal = 0;
const newsPerPageOptions = [2, 5, 10, 15];
const currentPage = ref(1);
const newsPerPage = ref(newsPerPageOptions[0]);
const isLoading = ref(false);
const areLoaded = ref(false);
const route = useRoute();
const router = useRouter();
const selectMode = defineModel('selectMode', { type: Boolean });
const forceDelete = defineModel('forceDelete', { type: Boolean });
const newsDelete = ref([]);
const urlAddress = config.ServerURL;

async function loadNews() {
    isLoading.value = true;
    areLoaded.value = false;

    const categories = route.query.categories ? route.query.categories.split(';') : [];
    const startDate = route.query.startDate || null;
    const endDate = route.query.endDate || null;

    const params = new URLSearchParams({
        pageSize: newsPerPage.value,
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
        } else {
            console.error('Ошибка при загрузке данных:', response.statusText);
            areLoaded.value = false;
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        areLoaded.value = false;
    } finally {
        isLoading.value = false;
    }
}

loadNews();

watch([route, currentPage, newsPerPage], () => {
    if (newsPerPage.value !== newsPerPageOptions[0]) {
        currentPage.value = 1;
    }

    loadNews();
});

function navigateToNews(newsId) {
    // Явно останавливаем всплытие

    if (!selectMode.value) {
        router.push(`/news/get/${newsId}`);
    } else {
        console.log('test11');

        // Пример проверки: если newsId уже есть в массиве newsDelete, не добавлять его
        if (!newsDelete.value.includes(newsId)) {
            newsDelete.value = [...newsDelete.value, newsId];
        } else {
            newsDelete.value = newsDelete.value.filter((id) => id !== newsId);
        }
    }
}

async function deleteNews() {
    console.log('deleteNews', newsDelete.value);

    for (const item of newsDelete.value) {
        const requestAddress = `${urlAddress}/api/v1/news/${item}`; // исправленный URL

        try {
            const response = await fetch(requestAddress, { method: 'DELETE' });

            if (!response.ok) {
                console.error(
                    `Ошибка ${response.status}: не удалось удалить новость ${item}`,
                );
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    }

    forceDelete.value = false;
    newsDelete.value = [];
    loadNews();
}

watch(forceDelete, (newVal) => {
    console.log('test');

    if (newVal) {
        deleteNews(); // вызываем функцию для удаления новостей
    }
});
</script>

<template>
    <Tabs v-if="showTabs" title="Новости кафедры" :show-icon="false" />
    <div class="news-page-container">
        <div
            v-show="!isLoading && areLoaded && newsData.length"
            class="select-pages-amount"
        >
            <div class="select-pages-amount-wrapper">
                <label>Новостей на странице</label>
                <Select
                    v-model="newsPerPage"
                    :options="newsPerPageOptions"
                    class="news-select"
                />
            </div>
        </div>
        <div v-if="isLoading" class="spinner-container">
            <ProgressSpinner class="custom-spinner" />
        </div>
        <div v-else-if="areLoaded && newsData.length" class="news-page-content">
            <div
                v-for="newsItem in newsData"
                :key="newsItem.id"
                class="news-block"
                :class="{ selected: newsDelete.includes(newsItem.id) }"
                @click="navigateToNews(newsItem.id)"
            >
                <NewsBlock
                    :news-tag="newsItem.category"
                    :news-title="newsItem.headline"
                    :news-date="new Date(newsItem.date)"
                    :news-image="`https://security-jwt.onrender.com/api/v1/image?fileName=${newsItem.images[0].filename}&imageType=NewsImage`"
                    :news-description="newsItem.mainInformation"
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
                v-model:model-value="currentPage"
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

.news-select {
    margin: auto 2%;
}

.selected {
    border: 3px solid lightblue;
    border-radius: 10px;
    transition: border 0.2s ease-in-out;
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
.select-pages-amount {
    left: 10px;
    display: flex;
    justify-content: flex-end; /* Выравниваем по правому краю */
    width: 100%; /* Занимает всю ширину родителя */
    margin-bottom: 25px;
}

.select-pages-amount-wrapper {
    display: flex; /* Делаем flex-контейнером */
    align-items: center; /* Выравниваем элементы по вертикали */
    gap: 10px; /* Отступ между элементами */
}

.select-pages-amount-wrapper label {
    font-family: Nunito;
    width: 180px;
    text-align: right;
    font-weight: 300;
}
</style>
