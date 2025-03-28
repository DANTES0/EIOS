<script setup xmlns="http://www.w3.org/1999/html">
import config from '../../config';
import NewsBlock from '../NewsPageComponents/NewsBlock.vue';
import { useFetch } from '@vueuse/core';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import NewsPage from '../../pages/NewsPage.vue';
import News from '../MainPageComponents/News.vue';

const newsData = ref([]);
let newsTotal = 0;
const currentPage = ref(1);
const newsPerPage = 2; // Отображаем одну новость на странице
const isLoading = ref(false); // Добавляем состояние загрузки
const areLoaded = ref(false); // Добавляем состояние загрузки
const route = useRoute();
const router = useRouter();
const selectMode = ref(false);
const editMode = ref(false);
const forceDelete = ref(false);

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

const toggleSelectMode = () => {
    console.log(selectMode.value);
    selectMode.value = !selectMode.value;
};

const toggleEditMode = () => {
    console.log(editMode.value);
    editMode.value = !editMode.value;
};

const toggleForceDelete = () => {
    console.log('forceDelete');
    console.log(forceDelete.value);
    forceDelete.value = !forceDelete.value;
};

function addNews() {
    router.push(`/news/get/admin`);
}
</script>

<template>
    <div class="news-page-container">
        <div class="button1">
            <button class="addNews" @click="addNews">Добавить новость</button>
        </div>
        <button v-if="!selectMode" class="addNews" @click="toggleSelectMode">
            Редактировать новость
        </button>
        <button v-if="!selectMode" class="addNews" @click="toggleSelectMode, toggleEditMode">
            Удаление новостей
        </button>
        <div v-if="selectMode && !editMode" class="button3 flex gap-4">
            <button class="addNews" @click="toggleSelectMode">Отменить</button>
            <button
                class="addNews"
                @click="
                    () => {
                        toggleSelectMode();
                        toggleForceDelete();
                    }
                "
            >
                Подтвердить
            </button>
        </div>
    </div>
    <div class="news-list">
        <news-page
            v-model:select-mode="selectMode"
            v-model:force-delete="forceDelete"
            :show-tabs="false"
        />
    </div>
</template>

<style scoped>
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

.news-page-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 78px;
}

.button3 {
    display: flex;
}

.content-header h1 {
    font-family: 'JetBrains Mono', monospace;
    margin-left: 20px;
    font-size: 1.5em;
    color: white;
}
</style>
