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

// Определяем пропсы для компонента с значением по умолчанию
const newsSliderImages = defineProps({
    newsImages: {
        type: Array,
        required: true, // Убедимся, что пропс обязателен
    },
});

const transitions = shallowReactive([{
    component: Slide,
    options: shallowReactive({
        totalDuration: 1400,
        easing: 'ease-in-out',
    }),
}]);

const $vueFlux = ref();

const vfOptions = shallowReactive({
    autoplay: true,
});

// Создаем массив ресурсов из пропсов с динамически генерируемыми URL
const vfRscs = computed(() =>
    newsSliderImages.newsImages.map(image => {
        const imageUrl = `https://security-jwt.onrender.com/api/v1/image?fileName=${image.filename}&imageType=NewsImage`;
        return new Img(imageUrl);  // Используем сформированный URL вместо импортированного пути
    })
);
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
