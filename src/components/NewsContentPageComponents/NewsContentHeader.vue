<script setup>
import { defineProps, ref, shallowReactive, computed } from 'vue';
import { format } from 'date-fns';
import {
    VueFlux,
    FluxCaption,
    FluxControls,
    FluxIndex,
    FluxPagination,
    FluxPreloader,
    Img,
    Slide,
} from 'vue-flux';
import 'vue-flux/style.css';

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
    newsImages: {
        type: Array,
        required: true, // Убедимся, что пропс обязателен
    },
});

const transitions = shallowReactive([
    {
        component: Slide,
        options: shallowReactive({
            totalDuration: 1400,
            easing: 'ease-in-out',
        }),
    },
]);

const $vueFlux = ref();

const vfOptions = shallowReactive({
    autoplay: true,
});

// Создаем массив ресурсов из пропсов с динамически генерируемыми URL
const vfRscs = computed(() =>
    newsHeaderData.newsImages.map((image) => {
        const imageUrl = `https://security-jwt.onrender.com/api/v1/image?fileName=${image.filename}&imageType=NewsImage`;

        return new Img(imageUrl); // Используем сформированный URL вместо импортированного пути
    }),
);
</script>

<template>
    <div class="header-container bg-[#0C2340] dark:bg-[#181818]">
        <div class="header-box1">
            <div class="title-news1">
                <div class="news-title-text">
                    {{ newsHeaderData.newsHeaderHeadline }}
                </div>
                <div class="header-box2">
                    <div class="news-teg1-container">
                        <div class="news-teg1">
                            {{
                                `${newsHeaderData.newsHeaderCategory}, ${format(newsHeaderData.newsHeaderDate, 'dd/MM/yyyy')}`
                            }}
                        </div>
                    </div>
                    <!-- <div class="news-date1-container">
                        <div class="news-date1">{{}}</div>
                    </div> -->
                </div>
            </div>

            <!--  -->
            <div class="photo-slider">
                <VueFlux
                    ref="$vueFlux"
                    :options="vfOptions"
                    :rscs="vfRscs"
                    :transitions="transitions"
                >
                    <template #preloader="preloaderProps">
                        <FluxPreloader v-bind="preloaderProps" />
                    </template>

                    <template #caption="captionProps">
                        <FluxCaption v-bind="captionProps" />
                    </template>

                    <template #controls="controlsProps">
                        <FluxControls v-bind="controlsProps" />
                    </template>

                    <template #pagination="paginationProps">
                        <FluxPagination v-bind="paginationProps" />
                    </template>

                    <template #index="indexProps">
                        <FluxIndex v-bind="indexProps" />
                    </template>
                </VueFlux>
            </div>

            <div class="text-news">
                <div
                    class="text-news-text"
                    v-html="newsHeaderData.newsHeaderMainInfo"
                ></div>
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
    border-bottom: solid 1px #2b2b2b;
    /* display: flex; */
    /* flex-direction: row; */
}

.header-box2 {
    width: 100%;
    height: 15%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    /* border-bottom: solid 1px #2b2b2b; */
}

.title-news1 {
    width: 100%;
    /* min-height: 400px; */
    background-color: #1449b3;
    background-image: url('../../assets/NewsContent/blue-wave.svg');
    background-size: 100% auto; /* Растягивает по ширине, сохраняет пропорции высоты */
    background-repeat: no-repeat;
}

.news-title-text {
    padding: 3rem;
    font-family: Rubik;
    font-weight: 600;
    font-size: 2.5rem;
}

.text-news {
    width: 100%;
}

.text-news-text {
    padding: 3rem;
    padding-top: 0;
    font-family: Calibri;
    font-size: 28px;
}

.news-teg1-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.news-teg1 {
    font-family: Nunito;
    font-size: 24px;
    padding: 1rem;
    padding-right: 3rem;
    padding-left: 3rem;
}

.news-date1-container {
    width: 50%;
    display: flex;
    justify-content: center;
}

.news-date1 {
    font-family: Nunito;
    font-size: 24px;
    padding: 10px;
}

:deep(.visible ul) {
    background-color: #000000c7;
}
:deep(.visible li) {
    opacity: 1 !important;
}

.photo-slider {
    width: 70%;
    margin: 0 auto;
    padding-top: 3rem;
    padding-bottom: 3rem;
}

:deep(.flux-button:hover > svg polyline) {
    stroke: #1e66f5;
}
:deep(.flux-button:hover > svg line) {
    stroke: #1e66f5;
}
:deep(.flux-button:hover > svg rect) {
    fill: #1e66f5;
}
</style>
