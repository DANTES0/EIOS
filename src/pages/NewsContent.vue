<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import NewsContentHeader from '../components/NewsContentPageComponents/NewsContentHeader.vue';
import NewsContentBase from '../components/NewsContentPageComponents/NewsContentBase.vue';
import NewsContentPageSlider from '../components/NewsContentPageComponents/NewsContentPageSlider.vue';
import config from '../config';

const newsData = ref(null);
const route = useRoute();
const IPAddress = '25.61.98.183'; // Используйте здесь тот же IP, что и в News.vue

async function loadNewsContent() {
    const newsId = route.params.id;
    const requestAddress = `${config.KirURL}/news/get/${newsId}`;

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
    <div v-if="newsData" class="page-container">
        <div class="page-container-header">
            <NewsContentHeader
                :news-header-headline="newsData.headline"
                :news-header-main-info="newsData.mainInfo"
                :news-header-category="newsData.category"
                :news-header-date="newsData.date"
            />
        </div>

        <div class="page-container-base">
            <NewsContentBase :news-full-info="newsData.fullInfo" />
        </div>

        <div class="page-container-base-slider">
            <NewsContentPageSlider :news-images="newsData.images" />
        </div>
    </div>
    <div v-else>
        <p />
    </div>
</template>

<style scoped>
.page-container-header {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
}

.page-container-base {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
}
.page-container-base-slider {
    padding-top: 40px;
    width: 90%;
    background-color: #181818;
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    margin: 0 auto;
    padding-bottom: 50px;
    margin-bottom: 50px;
}
</style>
