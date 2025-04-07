<script setup>
import { defineProps } from 'vue';
import { format } from 'date-fns';

const newsHeaderData = defineProps({
    newsHeaderHeadline: {
        type: String,
        default: 'Красивый цветной заголовок, а справа будет основная мысль новости',
    },
    newsHeaderMainInfo: {
        type: String,
        default:
            'И нет сомнений, что активно развивающиеся страны третьего мира и по сей день остаются уделом либералов, которые жаждут быть в равной степени предоставлены сами себе. Однозначно, базовые сценарии поведения пользователей неоднозначны и будут описаны максимально подробно. Лишь стремящиеся вытеснить традиционное производство, нанотехнологии, превозмогая сложившуюся непростую экономическую ситуацию, ассоциативно распределены по отраслям.',
    },
    newsHeaderCategory: { type: String, default: '#кринж' },
    newsHeaderDate: { type: Date, default: new Date() },
});
</script>

<template>
    <div class="header-container bg-[#0C2340] dark:bg-[#181818]">
        <div class="header-box1">
            <div class="title-news1">
                <div class="news-title-text">
                    {{ newsHeaderData.newsHeaderHeadline }}
                </div>
            </div>
            <div class="text-news">
                <div class="text-news-text" v-html="newsHeaderData.newsHeaderMainInfo"></div>
            </div>
        </div>
        <div class="header-box2">
            <div class="news-teg1-container">
                <div class="news-teg1">
                    {{ newsHeaderData.newsHeaderCategory }}
                </div>
            </div>
            <div class="news-date1-container">
                <div class="news-date1">
                    {{ format(newsHeaderData.newsHeaderDate, 'dd/MM/yyyy') }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header-container {
    width: 90%;
    height: auto; /* 400px */
    border: solid 1px #2b2b2b;
    display: flex;
    flex-direction: column;
}

.header-box1 {
    height: 85%;
    border-bottom: solid 1px white;
    display: flex;
    flex-direction: row;
}

.header-box2 {
    height: 15%;
    display: flex;
    flex-direction: row;
}

.title-news1 {
    width: 45%;
    min-height: 400px;
    border-right: solid 1px #555555;
    background-image: url('../../assets/NewsContent/blue-wave.svg');
    background-size: contain;
    background-repeat: no-repeat;
}

.news-title-text {
    justify-content: flex-start;
    margin: 40px;
    font-family: Calibri;
    font-weight: bold;
    font-size: 44px;
}

.text-news {
    width: 55%;
}

.text-news-text {
    margin: 40px 30px 40px 30px;
    font-family: Calibri;
    font-size: 28px;
}

.news-teg1-container {
    width: 45%;
    display: flex;
    justify-content: flex-end;
}

.news-teg1 {
    border-right: solid 1px #555555;
    font-family: Nunito;
    font-size: 24px;
    padding: 10px;
}

.news-date1-container {
    width: 55%;
    display: flex;
    justify-content: flex-end;
}

.news-date1 {
    border-right: solid 1px #2b2b2b;
    font-family: Nunito;
    font-size: 24px;
    padding: 10px;
}
</style>
