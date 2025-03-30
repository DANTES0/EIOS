<script setup>
import { ref, reactive } from 'vue';
import ProgressSpinner from 'primevue/progressspinner';
import SectionTitle from './SectionTitle.vue';

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
    <div class="wrapper-gallery text-[#0C2340] dark:text-[#999999]">
        <div class="numbers-wrapper text-[#0C2340] dark:text-[#999999]">
            <div v-for="i in 18" :key="i" class="numbers">{{ i }}</div>
        </div>
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
                        style="left: 5%"
                    ></div>
                    <img
                        v-show="loadedImages[1].value"
                        v-lazy="photo[first]"
                        class="gallery-image"
                        style="left: 5%"
                        loading="eager"
                        @load="imageIsLoaded(1)"
                    />

                    <div
                        v-show="!loadedImages[2].value"
                        class="image-placeholder main-image-placeholder"
                        style="left: 24%"
                    ></div>
                    <img
                        v-show="loadedImages[2].value"
                        v-lazy="photo[second]"
                        class="gallery-image main-image-gallery"
                        style="left: 24%"
                        loading="eager"
                        @load="imageIsLoaded(2)"
                    />

                    <div
                        v-show="!loadedImages[3].value"
                        class="image-placeholder"
                        style="right: 5%"
                    ></div>
                    <img
                        v-show="loadedImages[3].value"
                        v-lazy="photo[third]"
                        class="gallery-image"
                        style="right: 5%"
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
                    class="line-gradient"
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
    min-height: 58.5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 120px;
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
    /* background-color: #1e66f5; */
    /* background: linear-gradient(to right, red, yellow); */
    background: linear-gradient(-45deg, #ccc, #1f1f1f, #1f1f1f);
    background-size: 400% 400%;
}
.gradient-active-left {
    animation: gradient-left 1s ease;
}
.gradient-active {
    /* animation: gradientAnimation 0.5s ease forwards; */
    animation: gradient 1s ease;
}
@keyframes gradient {
    0% {
        background-position: 0% 0%;
    }
    50% {
        background-position: -100% 0%;
    }
    100% {
        background-position: 0% 0%;
    }
}
@keyframes gradient-left {
    0% {
        background-position: -100% 0%;
    }
    50% {
        background-position: 0% 0%;
    }
    100% {
        background-position: -100% 0%;
    }
}
@keyframes gradientAnimation {
    0% {
        background: linear-gradient(to right, red, yellow);
    }
    50% {
        background: linear-gradient(to right, red, yellow);
    }
    100% {
        background: linear-gradient(to left, red, yellow);
    }
}
.gallery-image-arrow:hover {
    filter: brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(3534%)
        hue-rotate(146deg) brightness(122%) contrast(120%);
    cursor: pointer;
}
.circle_gallery_active {
    width: 16px;
    height: 16px;
    border-radius: 100%;
    margin-right: 5px;
    background-color: blue;
}
.circle_gallery {
    width: 16px;
    height: 16px;
    border-radius: 100%;
    border: 1px solid white;
    margin-right: 5px;
    background-color: transparent;
}
.gallery-circle-block {
    width: auto;
    height: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 80px;
}
.name-gallery {
    font-family: JetBrainsMono;
    font-size: 36;
    font-weight: 500;
    margin-bottom: 39px;
}
.info-gallery {
    font-family: JetBrainsMono;
    font-size: 30;
    font-weight: 300;
}
.gallery-description-block {
    margin-top: 40px;
    width: 642px;
    height: 218px;
    border-left: 1px solid #ffffff;
    border-right: 1px solid #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.gallery-image {
    width: 500px;
    height: 360px;
    object-fit: cover; /* Чтобы изображение заполняло блок */
    position: absolute;
    opacity: 0.33;
    will-change: transform, opacity;
    transition:
        transform 0.1s ease-in-out,
        opacity 0.1s ease-in-out;
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
.gallery-image-block {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 450px;
    /* margin-top: 30px; */
    position: relative;
}
.content-gallery-wrapper {
    width: 100%;
}
.content-wrapper-gallery {
    height: 550px;
    width: 1450px;
    border-top: 1px solid #1e66f5;
    border-bottom: 1px solid #1e66f5;
    margin-left: 52px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.wrapper-gallery {
    /* height: 850px; */
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
}
.title-gallery {
    font-size: 48px;
    font-family: JetBrainsMono;
    font-weight: 200;
    margin-left: 128px;
    margin-top: 18px;
    width: 650px;
}
.title-gallery-wrapper {
    width: 650px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.line-dashed-gallery {
    position: relative;
    top: -38px;
    left: -85px;
    font-size: 48px;
    font-weight: 500;
    letter-spacing: 8px;
    user-select: none;
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
</style>
