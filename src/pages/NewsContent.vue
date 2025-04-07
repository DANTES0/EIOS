<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import NewsContentHeader from '../components/NewsContentPageComponents/NewsContentHeader.vue';
import NewsContentBase from '../components/NewsContentPageComponents/NewsContentBase.vue';
import NewsContentPageSlider from '../components/NewsContentPageComponents/NewsContentPageSlider.vue';
import config from '../config';

const newsData = ref(null);
const route = useRoute();

async function loadNewsContent() {
    const newsId = route.params.id;
    const requestAddress = `${config.ServerURL}/api/v1/news/${newsId}`;

    try {
        const response = await fetch(requestAddress);

        if (response.ok) {
            newsData.value = await response.json();
            console.log(newsData.value);
        } else {
            console.error('Ошибка при загрузке данных:', response.statusText);
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    }
}

onMounted(() => {
    loadNewsContent();
});
</script>

<template>
    <div v-if="newsData" class="page-container bg-gray-200 dark:bg-[#1f1f1f]">
        <!-- Главный обертывающий блок -->
        <div class="content-wrapper">
            <!-- Header -->
            <div class="page-container-header">
                <NewsContentHeader
                    :news-header-headline="newsData.headline"
                    :news-header-main-info="newsData.fullInformation"
                    :news-header-category="newsData.category"
                    :news-header-date="newsData.date"
                />
            </div>

            <!-- Slider -->
            <div class="page-container-base-slider bg-gray-200 dark:bg-[#1f1f1f]">
                <NewsContentPageSlider :news-images="newsData.images" />
            </div>
        </div>
    </div>
    <div v-else>
        <p />
    </div>
</template>

<style scoped>
* {
    box-sizing: border-box;
}

.page-container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.content-wrapper {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: inherit;
}

.page-container-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
}

.page-container-base-slider {
    padding-top: 40px;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    margin: 0 auto;
    padding-bottom: 50px;
    overflow: hidden;
}

@media (max-width: 768px) {
    .page-container-base-slider {
        width: 100%;
        padding-top: 20px;
        padding-bottom: 20px;
    }
}
</style>
