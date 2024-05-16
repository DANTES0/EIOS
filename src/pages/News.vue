<script setup>
    import Tabs from '../components/Tabs.vue'
    import NewsBlock from "../components/NewsPageComponents/NewsBlock.vue"
    import Pagination from "../components/NewsPageComponents/Pagination.vue"
    import { ref, watch} from 'vue';
    import { useRoute } from 'vue-router';
    
    const newsData = ref([])
    const route = useRoute()

    async function loadNews() {
        let requestAddress = `http://25.61.98.183:8080/news/get/all`

        const categories = route.query.categories ? route.query.categories.split(';') : []
        const startDate = route.query.startDate ? route.query.startDate : null
        const endDate = route.query.endDate ? route.query.endDate : null

        if (categories.length === 0 && !startDate && !endDate) {
            requestAddress = `http://25.61.98.183:8080/news/get/all`
        } else if (categories.length === 0 && startDate && endDate) {
            requestAddress = `http://25.61.98.183:8080/news/get/all?startDate=${startDate}&endDate=${endDate}`
        } else if (categories.length > 0 && !startDate && !endDate) {
            requestAddress = `http://25.61.98.183:8080/news/get/all?categories=${categories.join(';')}`
        } else if (categories.length > 0 && startDate && endDate) {
            requestAddress = `http://25.61.98.183:8080/news/get/all?categories=${categories.join(';')}&startDate=${startDate}&endDate=${endDate}`
        }

        console.log(categories)
        console.log(startDate)
        console.log(endDate)

        try {
            const response = await fetch(requestAddress)
            if (response.ok) {
                const data = await response.json()
                newsData.value = data
                console.log(newsData.value)
            } else {
                console.error('Ошибка при загрузке данных:', response.statusText)
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error)
        }
    }


    loadNews()

    watch(route, () => {
        loadNews()
    });
</script>

<template>
    <Tabs></Tabs>

    <div class="news-page-container">

        <div class="news-page-content">

            <div v-for="newsItem in newsData" :key="newsItem.id" class="news-block">
                <NewsBlock 
                    :newsTag="newsItem.category"
                    :newsTitle="newsItem.headline"
                    :newsDate="newsItem.date"
                    :newsImage="newsItem.images[0]"
                    :newsDescription="newsItem.fullInfo"
                />
            </div>

        </div>

        <!-- тут компонент для переключения страниц -->
        <div class="pagination-wrapper">
            <Pagination class="pagination"/>
        </div>

    </div>
</template>

<style>
    .news-page-container {
        display:block;
        margin: auto auto;
        /* background-color: blueviolet; */
        width: 1422px;
 
        min-height: 674px;
        max-height: 2420px;

        margin-top: 30px;
        margin-bottom: 78px;
    }

    .news-page-content {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 50px 74px;

        padding-bottom: 50px;
    }

    .news-block {
        cursor:pointer;
        width: 425px;
        height: 532px;
        transition: transform 0.20s ease-in-out;
        /* background-color: black; */
    }

    .news-block:hover{
        transform: scale(1.04);
    }

    .pagination-wrapper {
        margin: 0 auto;
        background-color: yellow;
        width: 1064px;
        height: 92px;
        display:flex;
        justify-content: center;
        align-items: center;
    }
</style>