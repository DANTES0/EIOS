<script setup>
import { ref, computed } from 'vue';

// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
let flag = ref(false);
const props = defineProps({
    id: Number,
    name: String,
    photo: String,
    post: String,
    rank: String,
    active: Boolean,
    currentIndex: Number,
    length: Number,
    nextId: Number,
    prevId: Number,
});

// console.log(props.countObject)
function next_prepodavatel() {
    flag.value = true;
    setTimeout(() => {
        flag.value = false; // Удаляем класс .anima
    }, 2000); // Короткий интервал времени
}

const resetAnimation = () => {
    flag.value = false;
};

let temp = ref(0);

const isImageLoaded = ref(false);

const imageLoaded = () => {
    isImageLoaded.value = true;
};
</script>

<template>
    <div class="wrappper">
        <div>
            <div
                v-show="!isImageLoaded"
                class="image-placeholder"
                :class="{ 'main-prepod-image': id === currentIndex }"
            ></div>
            <img
                v-show="isImageLoaded"
                :src="photo"
                alt=""
                class="prepod-image"
                :class="{ 'main-prepod-image': id === currentIndex }"
                @load="imageLoaded"
            />
        </div>
        <div v-if="id === currentIndex" class="prepod-description-block text-black dark:text-white border-l-[1px] border-r-[1px] border-gray-300 dark:border-white">
            <h1 class="name-prepod ">{{ name }}</h1>
            <h2 class="spec-prepod info-prepod " style="margin-bottom: 10px">
                {{ post }}
            </h2>
            <h2 class="stepen-prepod info-prepod">{{ rank }}</h2>
        </div>
    </div>
</template>

<style scoped>
.main-image-placeholder {
    width: 330px;
    height: 330px;
}
.image-placeholder {
    width: 238px;
    height: 238px;
    background-color: white;
    border-radius: 100%;
    opacity: 10%;
}
.wrappper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.setup {
    animation: anima 2s ease !important;
    /* opacity: 0; */
}

@keyframes anima {
    0% {
        opacity: 1;
        width: 300px;
    }
    50% {
        opacity: 0.5;
        width: 100px;
    }
    100% {
        opacity: 0;
        width: 0px;
    }
}
.line-anima {
    width: 300px;
    height: 2px;
    background-color: #1e66f5;
    /* transition: anima 2s linear; */
}
.prepod-image-arrow:hover {
    filter: brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(3534%)
        hue-rotate(146deg) brightness(122%) contrast(120%);
    cursor: pointer;
}
.circle-prepod {
    width: 16px;
    height: 16px;
    border-radius: 100%;
    border: 1px solid white;
    background-color: transparent;
}
.prepod-circle-block {
    width: 100px;
    height: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 31px;
}
.name-prepod {
    font-family: JetBrainsMono;
    font-size: 36;
    font-weight: 500;
    margin-bottom: 39px;
}
.info-prepod {
    font-family: JetBrainsMono;
    font-size: 30;
    font-weight: 300;
}
.prepod-description-block {
    padding: 0 10px;
    margin-top: 40px;
    width: 565px;
    height: 218px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.prepod-image {
    width: 238px;
    height: 238px;
    border-radius: 100%;
    object-fit: cover;
    /* object-position: -5% 0%; */
}
.back-image-arrow {
    background-image: url('../../assets/PrepodavateliKafedri/arrow_back.svg');
    width: 103px;
    height: 81px;
    background-repeat: no-repeat;
    background-size: contain;
}
.main-prepod-image {
    width: 330px;
    height: 330px;
}
.next-image-arrow {
    background-image: url('../../assets/PrepodavateliKafedri/arrow_next.svg');
    width: 103px;
    height: 81px;
    background-repeat: no-repeat;
    background-size: contain;
}
.prepod-image-block {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 330px;
}
.content-prepod-wrapper {
    width: 100%;
}
.content-wrapper-prepod {
    height: 700px;
    width: 1450px;
    border-top: 1px solid #1e66f5;
    border-bottom: 1px solid #1e66f5;
    margin-left: 52px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.wrap-destroy {
    display: none;
}
</style>
