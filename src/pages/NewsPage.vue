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
const editMode = defineModel('editMode', { type: Boolean });
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
    } else if (editMode.value) {
        router.push(`/news/get/admin/${newsId}`);
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
    <Tabs title="Новости кафедры" :show-icon="false" />
    <div class="news-page-container">
        <div
            v-show="!isLoading && areLoaded && newsData.length"
            class="select-pages-amount"
        >
            <div class="select-pages-amount-wrapper">
                <label class="text-[#0c2340] dark:text-[#ffff]"
                    >Новостей на странице</label
                >
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
    font-size: clamp(16px, 2vw, 18px);
    font-family: Nunito;
    font-weight: 200;
    padding: 20px;
    text-align: center;
}

.news-page-container {
    width: 90%;
    max-width: 1422px;
    margin: 30px auto 78px;
    min-height: calc(100vh - 200px);
}

.news-page-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, 425px);
    justify-content: center;
    gap: 30px;
    padding: 20px 0;
    width: 100%;
}

.news-block {
    cursor: pointer;
    width: 100%;
    max-width: 425px;
    height: auto;
    min-height: 400px;
    transition: transform 0.2s ease-in-out;
    break-inside: avoid;
}

.news-block:hover {
    transform: scale(1.02);
}

.pagination-wrapper {
    width: 100%;
    max-width: 1064px;
    height: 92px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.news-select {
    margin-left: 10px;
}

.news-select {
    margin-left: 10px;

    --p-select-color: #0c2340;
    --p-select-focus-border-color: #9d9da6;
    --p-select-hover-border-color: #0c2340;
    --p-select-background: transparent;
    --p-select-border-radius: 0;
    --p-select-overlay-background: red;
    --p-select-overlay-border-radius: 0;
    --p-select-overlay-border-color: red;
    --p-select-option-selected-background: red;
    --p-select-option-focus-background: red;
    --p-select-option-selected-focus-background: red;
    --p-overlay-select-background: red;
    --p-select-option-group-background: 0;
    --p-select-option-border-radius: 0;
}

html.dark .news-select {
    --p-select-color: #ececec;
    --p-select-focus-border-color: #9d9da6;
    --p-select-hover-border-color: #9d9da6;
    --p-select-background: transparent;
    --p-select-border-radius: 0;
    --p-select-overlay-background: #1f1f1f;
    --p-select-overlay-border-radius: 0;
    --p-select-overlay-border-color: #9d9da6;
    --p-select-option-selected-background: rgb(0, 84, 255);
    --p-select-option-focus-background: #343437;
    --p-select-option-selected-focus-background: rgb(0, 84, 255);
    --p-overlay-select-background: #27272a;
    --p-select-option-group-background: 0;
    --p-select-option-border-radius: 0;
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
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 25px;
}

.select-pages-amount-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
}

.select-pages-amount-wrapper label {
    font-family: Nunito;
    font-weight: 300;
    font-size: clamp(14px, 1.5vw, 16px);
}

/* Адаптация для планшетов */
@media (max-width: 1024px) {
    .news-page-content {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }
}

/* Адаптация для мобильных устройств */
@media (max-width: 768px) {
    .news-page-container {
        width: 95%;
        margin: 20px auto 50px;
    }

    .select-pages-amount {
        justify-content: center;
    }

    .select-pages-amount-wrapper {
        flex-direction: column;
        align-items: center;
        gap: 5px;
    }

    .news-select {
        margin-left: 0;
    }
}

@media (max-width: 480px) {
    .news-page-content {
        grid-template-columns: 1fr;
    }

    .news-block {
        min-height: 350px;
    }

    .pagination-wrapper {
        height: auto;
        padding: 20px 0;
    }
}
</style>
