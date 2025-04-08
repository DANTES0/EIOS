<script setup>
import { ref, reactive } from 'vue';
import ProgressSpinner from 'primevue/progressspinner';
import SectionTitle from './SectionTitle.vue';
import NumberColumn from './NumberColumn.vue';

let prop = defineProps({
    id_photo: Number,
    photo: Array,
    isLoading: Boolean,
    isLoaded: Boolean,
});

let first = ref(0);
let second = ref(1);
let third = ref(2);
let array_size = ref(
    prop.photo ? Object.keys(prop.photo).filter((key) => !isNaN(key)).length : 0,
);
let prevFirst = ref(array_size.value - 1); // Левая доп. фотка
let nextThird = ref(3); // Правая доп. фотка

const gradientActive = ref(false);
const gradientActiveLeft = ref(false);

const next_photo = () => {
    prevFirst.value = (prevFirst.value + 1) % array_size.value;
    first.value = (first.value + 1) % array_size.value;
    second.value = (second.value + 1) % array_size.value;
    third.value = (third.value + 1) % array_size.value;
    nextThird.value = (nextThird.value + 1) % array_size.value;
};

const prev_photo = () => {
    prevFirst.value = (prevFirst.value - 1 + array_size.value) % array_size.value;
    first.value = (first.value - 1 + array_size.value) % array_size.value;
    second.value = (second.value - 1 + array_size.value) % array_size.value;
    third.value = (third.value - 1 + array_size.value) % array_size.value;
    nextThird.value = (nextThird.value - 1 + array_size.value) % array_size.value;
};

const loadedImages = reactive([
    ref(false),
    ref(false),
    ref(false),
    ref(false),
    ref(false),
]);

const imageIsLoaded = (index) => {
    loadedImages[index].value = true;
    console.log('обновил');
};
</script>

<template>
    <div ref="wrapper" class="wrapper-gallery">
        <NumberColumn
            :item-height="36"
            :vertical-padding="15"
            :horizontal-padding="5"
            :gap="0"
            :max-numbers="50"
            :observe-target="wrapper"
        />
        <div class="content-gallery-wrapper bg-white dark:bg-[#1f1f1f]">
            <SectionTitle title="ФОТОГАЛЕРЕЯ" :base-length="7" />

            <div v-if="isLoading" class="spinner-container">
                <progress-spinner class="custom-spinner" />
            </div>

            <div v-else-if="isLoaded" class="content-wrapper-gallery">
                <div class="gallery-image-block">
                    <div
                        class="gallery-image-arrow back-image-arrow"
                        @click="prev_photo"
                    ></div>

                    <img
                        v-if="prevFirst >= 0"
                        v-lazy="photo[prevFirst]"
                        class="gallery-image hidden-image"
                        style="left: -15%"
                    />

                    <div
                        v-show="!loadedImages[1].value"
                        class="image-placeholder"
                        style="left: 15%"
                    ></div>
                    <img
                        v-show="loadedImages[1].value"
                        v-lazy="photo[first]"
                        class="gallery-image"
                        style="left: 15%"
                        loading="eager"
                        @load="imageIsLoaded(1)"
                    />

                    <div
                        v-show="!loadedImages[2].value"
                        class="image-placeholder main-image-placeholder"
                    ></div>
                    <img
                        v-show="loadedImages[2].value"
                        v-lazy="photo[second]"
                        class="gallery-image main-image-gallery"
                        loading="eager"
                        @load="imageIsLoaded(2)"
                    />

                    <div
                        v-show="!loadedImages[3].value"
                        class="image-placeholder"
                        style="right: 15%"
                    ></div>
                    <img
                        v-show="loadedImages[3].value"
                        v-lazy="photo[third]"
                        class="gallery-image"
                        style="right: 15%"
                        loading="eager"
                        @load="imageIsLoaded(3)"
                    />

                    <img
                        v-if="nextThird < array_size"
                        v-lazy="photo[nextThird]"
                        class="gallery-image hidden-image"
                        style="right: -15%"
                        loading="eager"
                    />

                    <div
                        class="gallery-image-arrow next-image-arrow"
                        @click="next_photo"
                    ></div>
                </div>

                <div
                    class="line-gradient bg-gradient-to-r from-[#ccc] via-[#1f1f1f] to-[#1f1f1f] dark:from-[#000000] dark:via-[#ffffff] dark:to-[#ffffff]"
                    :class="{
                        'gradient-active': gradientActive,
                        'gradient-active-left': gradientActiveLeft,
                    }"
                ></div>
            </div>

            <div v-else class="error-message">
                <p>Ошибка загрузки данных. Попробуйте позже.</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.image-placeholder {
    width: 500px;
    height: 360px;
    position: absolute;
}

.main-image-placeholder {
    width: 750px;
    height: 500px;
    z-index: 99;
    opacity: 1;
    transition: 0.3s ease;
}

.main-image-placeholder:hover {
    transform: scale(1.22);
}

.hidden-image {
    display: none;
}

.error-message {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    font-size: 18px;
    font-family: Nunito;
    font-weight: 200;

    min-height: 58.5vh;
    padding-bottom: 120px;
}

.spinner-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 6rem;
}

.custom-spinner {
    --p-progressspinner-color-1: rgb(0, 84, 255);
    --p-progressspinner-color-2: rgb(0, 84, 255);
    --p-progressspinner-color-3: rgb(0, 84, 255);
    --p-progressspinner-color-4: rgb(0, 84, 255);
}

.line-gradient {
    height: 2px;
    width: 300px;
    background-size: 400% 400%;
}

.gallery-image-arrow:hover {
    filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(3534%)
        hue-rotate(146deg) brightness(70%) contrast(60%);
    cursor: pointer;
}

.back-image-arrow {
    background-image: url('../../assets/PrepodavateliKafedri/arrow_back.svg');
    width: 70px;
    height: 81px;
    background-repeat: no-repeat;
    background-size: contain;
}

.main-gallery-image {
    width: 330px;
    height: 330px;
}

.next-image-arrow {
    background-image: url('../../assets/PrepodavateliKafedri/arrow_next.svg');
    width: 70px;
    height: 81px;
    background-repeat: no-repeat;
    background-size: contain;
}

.wrapper-gallery {
    /* height: 850px; */
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
}

.main-image-gallery {
    width: 750px;
    height: 500px;
    z-index: 99;
    opacity: 1;
    transition: 0.3s ease;
}

.main-image-gallery:hover {
    transform: scale(1.22);
}

/* Основные стили для контейнеров */
.content-gallery-wrapper {
    width: 100%;
    min-height: 550px; /* Минимальная высота */
}

:deep(.p-progressspinner-spin) {
    position: static !important;
}

.content-wrapper-gallery {
    width: 90%;
    max-width: 1450px;
    margin: 0 auto;
    border-top: 1px solid #1e66f5;
    border-bottom: 1px solid #1e66f5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
}

.gallery-image-block {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    min-height: 500px; /* Минимальная высота блока */
}

/* Стили для изображений */
.gallery-image {
    position: absolute;
    object-fit: cover;
    opacity: 0.33;
    transition: all 0.3s ease;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    /* Базовые размеры и соотношение */
    width: 25%;
    height: auto;
    aspect-ratio: 500/360;
}

.main-image-gallery {
    width: 40%;
    aspect-ratio: 750/500;
    z-index: 10;
    opacity: 1;
}

/* Позиционирование изображений */
.gallery-image:nth-child(1) {
    left: 0;
    transform: translateX(-30%);
}
.gallery-image:nth-child(2) {
    left: 15%;
}
.gallery-image:nth-child(3) {
    left: 50%;
    transform: translateX(-50%);
}
.gallery-image:nth-child(4) {
    right: 15%;
}
.gallery-image:nth-child(5) {
    right: 0;
    transform: translateX(30%);
}

/* Стили для стрелок */
.gallery-image-arrow {
    position: absolute;
    z-index: 20;
    cursor: pointer;
    width: 70px;
    height: 81px;
    background-repeat: no-repeat;
    background-size: contain;
    transition: transform 0.3s ease;
}

.back-image-arrow {
    left: 8%;
    background-image: url('../../assets/PrepodavateliKafedri/arrow_back.svg');
}

.next-image-arrow {
    right: 8%;
    background-image: url('../../assets/PrepodavateliKafedri/arrow_next.svg');
}

.gallery-image-arrow:hover {
    transform: scale(1.1);
}

@media (max-width: 1440px) {
    .gallery-image {
        width: 20%;
        aspect-ratio: 400/288;
    }

    .main-image-gallery {
        width: 35%;
        aspect-ratio: 600/400;
    }

    .gallery-image-arrow {
        width: 60px;
        height: 70px;
    }
}

@media (max-width: 1024px) {
    .content-wrapper-gallery {
        width: 95%;
    }

    .gallery-image {
        width: 25%;
        opacity: 0.6;
    }

    .main-image-gallery {
        width: 40%;
        opacity: 1;
    }

    .gallery-image-arrow {
        width: 50px;
        height: 60px;
    }
}

@media (max-width: 768px) {
    .gallery-image-block {
        min-height: 400px;
    }

    .gallery-image {
        width: 80%;
        position: static;
        margin: 10px auto;
        opacity: 1;
        display: none;
    }

    .main-image-gallery {
        width: 90%;
        display: block !important;
        margin: 0 auto;
        position: relative;
        left: auto !important;
        right: auto !important;
        transform: none !important;
    }

    .gallery-image-arrow {
        width: 40px;
        height: 50px;
    }

    .back-image-arrow {
        left: 10px;
    }

    .next-image-arrow {
        right: 10px;
    }
}

@media (max-width: 480px) {
    .main-image-gallery {
        width: 95%;
    }

    .gallery-image-arrow {
        width: 30px;
        height: 40px;
    }
}
</style>
