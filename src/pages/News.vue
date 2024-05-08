<script setup>
    import Tabs from '../components/Tabs.vue'
    import NewsBlock from "../components/NewsPageComponents/NewsBlock.vue"
</script>

<template>
    <div class="news-page">
        <Tabs></Tabs>
        <div class="news-page-container">
            <div class="news-page-content">

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

        padding-bottom: 142px;
    }

    .news-block {
        width: 425px;
        height: 532px;
        /* background-color: black; */
    }


</style>