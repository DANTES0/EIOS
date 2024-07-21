<script setup>
import { ref, shallowReactive, computed, defineProps } from 'vue';
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

// Импортируем изображения
import pivo1 from '../../assets/NewsContent/pivo1.jpg';
import pivo2 from '../../assets/NewsContent/pivo2.jpg';
import pivo3 from '../../assets/NewsContent/pivo3.jpg';

// Определяем пропсы для компонента с значением по умолчанию
const newsSliderImages = defineProps({
    newsImages: {
        type: Array,
        default: () => [pivo1, pivo2, pivo3],
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

// Создаем массив ресурсов из пропсов
const vfRscs = computed(() => newsSliderImages.newsImages.map((image) => new Img(image)));
</script>

<template>
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

    <!--  <button @click="$vueFlux.show('next')">NEXT</button>-->
</template>

<style scoped>
:deep(.visible ul) {
    background-color: #000000c7;
}
:deep(.visible li) {
    opacity: 1 !important;
}
.photo-slider {
    width: 70%;
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
