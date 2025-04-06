<script setup>
import { ref } from 'vue';

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
        <div
            v-if="id === currentIndex"
            class="prepod-description-block text-[#0c2340] dark:text-white border-l-[1px] border-r-[1px] border-gray-300 dark:border-white"
        >
            <h1 class="name-prepod">{{ name }}</h1>
            <h2 class="spec-prepod info-prepod text-[#0c2340] text-opacity-75 dark:text-white dark:text-opacity-75" style="margin-bottom: 10px">
                {{ post }}
            </h2>
            <h2 class="stepen-prepod info-prepod text-[#0c2340] text-opacity-75 dark:text-white dark:text-opacity-75">{{ rank }}</h2>
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
    font-size: 1.5rem;
    font-weight: 600;
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
.wrap-destroy {
    display: none;
}
.spec-prepod,
.stepen-prepod {
    font-size: 1.25rem;
}
@media (max-width: 1786px) {
    .prepod-image {
        width: 11rem;
        height: 11rem;
    }

    .main-prepod-image {
        width: 16rem;
        height: 16rem;
    }

    .prepod-description-block {
        width: 420px;
    }

    .name-prepod {
        font-size: 1.15rem;
    }

    .spec-prepod,
    .stepen-prepod {
        font-size: 1rem;
    }
}

@media (max-width: 1440px) {
    .prepod-image {
        width: 9rem;
        height: 9rem;
    }

    .main-prepod-image {
        width: 13.2rem;
        height: 13.2rem;
    }

    .prepod-description-block {
        width: 375px;
    }

    .name-prepod {
        font-size: 0.95rem;
    }

    .spec-prepod,
    .stepen-prepod {
        font-size: 0.85rem;
    }
}
</style>
