<script setup>
    import Tabs from '../components/Tabs.vue'
    import NewsBlock from "../components/NewsPageComponents/NewsBlock.vue"
    import { ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    
    const newsData = ref([])

    const route = useRoute()
    const selectedCategories = ref([])
    const dateStart = ref(new Date())
    const dateEnd = ref(new Date())

    async function loadNews() {
        const categories = route.query.categories ? route.query.categories.split(',') : []
        const startDate = route.query.s ? new Date(parseInt(route.query.s)) : null
        const endDate = route.query.po ? new Date(parseInt(route.query.po)) : null

        // const response = await fetch(`url`);
        // const data = await response.json();
        // newsData.value = data;

        console.log(categories)
        console.log(startDate)
        console.log(endDate)
    }

    loadNews()

    watch(route, () => {
        loadNews()
    });
</script>

<template>
    <Tabs></Tabs>

    <!-- Отображаем новости -->
    <!-- <div v-for="newsItem in newsData" :key="newsItem.id">
        <NewsBlock :newsItem="newsItem" />
    </div> -->

    <div class="news-page-container">

        <!-- вот тут должна формироваться страница -->
        <div class="news-page-content">

            <div class="news-block">
                <NewsBlock></NewsBlock>
            </div>
            <div class="news-block">
                <NewsBlock 
                    :newsTag="'Конференции'" 
                    :newsTitle="'FUNNY CAT MEMES COMPILATION OF 2023 V09 FUNNY CAT MEMES COMPILATION OF 2023 V09 FUNNY CAT MEMES COMPILATION OF 2023 V09 FUNNY CAT MEMES COMPILATION OF 2023 V09'" 
                    :newsImage="'https://i.ytimg.com/vi/1M_oZgVBknw/maxresdefault.jpg'"
                    :newsDescription="'Try Not To Laugh Challenge is a hilarious compilation of Funny and cute Animal Videos, featuring some of the funniest cats memes around! With so many cute and funny animals in one place, you re sure to be entertained for hours on end. So why not sit back, relax, and watch some of the funniest animals around? Try Not To Laugh Challenge is a hilarious compilation of Funny and cute Animal Videos, featuring some of the funniest cats memes around! With so many cute and funny animals in one place, you re sure to be entertained for hours on end. So why not sit back, relax, and watch some of the funniest animals around?'"
                ></NewsBlock>

            </div>
            <div class="news-block">
                <NewsBlock
                    :newsImage="'https://24ai.tech/en/wp-content/uploads/sites/3/2023/10/01_product_1_sdelat-izobrazhenie-1-1-3-scaled.jpg'"
                ></NewsBlock>
            </div>

            <div class="news-block">
                <NewsBlock
                    :newsImage="'https://images.unsplash.com/photo-1603486002664-a7319421e133?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8MTYlM0E5fGVufDB8fDB8fHww'"
                ></NewsBlock>
            </div>
            <div class="news-block">
                <NewsBlock></NewsBlock>
            </div>
            <div class="news-block">
                <NewsBlock></NewsBlock>
            </div>

            <div class="news-block">
                <NewsBlock></NewsBlock>
            </div>
            <div class="news-block">
                <NewsBlock></NewsBlock>
            </div>
            <div class="news-block">
                <NewsBlock></NewsBlock>
            </div>


            <div class="news-block">
                <NewsBlock></NewsBlock>
            </div>
            <div class="news-block">
                <NewsBlock></NewsBlock>
            </div>
            <div class="news-block">
                <NewsBlock></NewsBlock>
            </div>

        </div>

        <!-- тут компонент для переключения страниц -->
        <div class="pagination-component">
            
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

    .pagination-component {
        margin: 0 auto;
        background-color: yellow;
        width: 1064px;
        height: 92px;
    }
</style>