<script setup>
import ProgressSpinner from 'primevue/progressspinner';
import { defineProps, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue';
import NewsBlock from '/src/components/NewsPageComponents/NewsBlock.vue';
import { useRouter } from 'vue-router';
import theme from 'tailwindcss/defaultTheme.js';
import SectionTitle from './SectionTitle.vue';

const blockWidth = ref('540px');
const blockHeight = ref('395px');
const fontSize = ref('18px');

function updateDimensions() {
    if (window.matchMedia('(min-width: 1024px) and (max-width: 1279px)').matches) {
        blockWidth.value = '300px';
        blockHeight.value = '210px';
        fontSize.value = '13px';
    } else if (window.matchMedia('(min-width: 1280px) and (max-width: 1440px)').matches) {
        blockWidth.value = '340px';
        blockHeight.value = '240px';
    } else if (window.matchMedia('(min-width: 1441px) and (max-width: 1920px)').matches) {
        blockWidth.value = '410px';
        blockHeight.value = '280px';
    } else {
        blockWidth.value = '540px';
        blockHeight.value = '395px';
    }
}

const router = useRouter();
const currentTheme = ref(localStorage.getItem('theme') || 'light'); // Инициализация из localStorage
const props = defineProps({
    id: String,
    headline: String,
    category: String,
    date: String,
    url: Array,
    areLoading: Boolean,
    areLoaded: Boolean,
});

function navigateToNews(newsId) {
    router.push(`/news/get/${newsId}`);
}

// Автоматическое отслеживание изменений
watchEffect(() => {
    document.documentElement.classList.toggle('dark', currentTheme.value === 'dark');
});

// Обработчик изменений в localStorage
const handleStorageChange = (event) => {
    if (event.key === 'theme') {
        currentTheme.value = event.newValue || 'light';
    }
};

// Обработчик кастомного события смены темы
const handleThemeChange = () => {
    currentTheme.value = localStorage.getItem('theme') || 'light';
};

onMounted(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('theme-changed', handleThemeChange); // Слушаем кастомное событие
});

onBeforeUnmount(() => {
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('theme-changed', handleThemeChange);
    window.removeEventListener('resize', updateDimensions);
});
</script>

<template>
    <div class="news-wrapper text-[#0C2340] dark:text-[#999999]">
        <div class="numbers-wrapper text-[#0C2340] dark:text-[#999999]">
            <div v-for="i in 18" :key="i" class="numbers">{{ i }}</div>
        </div>
        <div id="news" class="content-news-wrapper bg-white dark:bg-[#1f1f1f]">
            <SectionTitle title="НОВОСТИ" />
            <div v-if="areLoading" class="spinner-container">
                <progress-spinner class="custom-spinner" />
            </div>

            <div v-else-if="areLoaded" class="container-news">
                <div class="capybara_NewsBlock-wrapper">
                    <div class="capybara_wrapper">
                        <img
                            v-if="currentTheme !== 'dark'"
                            src="../../assets/News/kapybars_in_circle_dark.png"
                        />
                        <img v-else src="../../assets/News/kapybars_in_circle.png" />
                        <div class="description-news text-black dark:text-white">
                            <div
                                class="general-block-description-news"
                                :class="
                                    currentTheme !== 'dark'
                                        ? 'dark-theme-bg'
                                        : 'light-theme-bg'
                                "
                            >
                                <div class="description-text-news-wrapper">
                                    <div class="description-text-news">
                                        {{ headline }}
                                    </div>
                                </div>
                            </div>
                            <div
                                class="btn-next-back-wrapper text-[#006AFF] dark:text-white"
                            >
                                <button class="btn-news back" @click="$emit('prev')">
                                    НАЗАД
                                </button>
                                <button class="btn-news next" @click="$emit('next')">
                                    ВПЕРЕД
                                </button>
                            </div>
                        </div>
                    </div>
                    <NewsBlock
                        :key="id"
                        class="news-block"
                        :news-tag="category"
                        :news-title="headline"
                        :news-date="date"
                        :news-image="
                            url && url.length > 0
                                ? `https://security-jwt.onrender.com/api/v1/image?fileName=${url[0].filename}&imageType=NewsImage`
                                : ''
                        "
                        :news-description="''"
                        :news-show-summary="false"
                        :block-width="blockWidth"
                        :block-height="blockHeight"
                        :font-size="fontSize"
                        @click="navigateToNews(id)"
                    />
                </div>
            </div>

            <div v-else class="error-message">
                <p>Ошибка загрузки данных. Попробуйте позже.</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.news-block {
    cursor: pointer;
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
.card-news-down-tags-blur {
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(6px);
    transform: scale(1.4);
    object-fit: cover;
    background-repeat: no-repeat;
    background-size: cover;
}
.card-news-down-tags-image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 460px;
    height: 300px;
    margin: auto auto;
    background-repeat: no-repeat;
    /* background-size: 100% 100%; */
    background-position: 50%;
    background-size: contain;
}
.card-news-down-tags {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
}
.card-news-up-date {
    font-family: Rubik;
    font-size: 18px;
    font-weight: 800;
    color: #cccccc;
    margin-right: 160px;
}
.img-tags {
    width: 24px;
    height: 24px;
    margin-left: 12px;
}
.card-news-up-tags {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 165px;
}
.tags-title {
    width: 129px;
    height: 22px;
    font-family: Rubik;
    font-size: 18;
    font-weight: 800;
    color: #1e66f5;
    margin-left: 12px;
}
.card-news-up-block {
    height: 48px;
    width: 100%;
    border-bottom: 1px solid #999999;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.kapybaras {
    /* width: 301px; */
    height: 18vw;
    aspect-ratio: 1;
    margin-left: 66px;
    margin-top: 74px;
}
.content-news-wrapper {
    width: 100%;
}
.card-news-block {
    margin-right: 71px;
    width: 540px;
    height: 395px;
    display: flex;
    flex-direction: column;
    border: solid 1px #999999;
}
.back {
    margin-left: 50px;
}
.btn-next-back-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* justify-content: end;
    gap: 20px; */
    align-items: center;
    margin-top: 10px;
}
.btn-news {
    font-family: JetBrainsMono;
    font-size: 24px;
    width: 100px;
    height: 29x;
    border: 1px solid #999999;
    text-align: center;
    cursor: pointer;
}

.btn-news:hover {
    color: #ffffff;
}
.description-news {
    margin-right: 100px;
    margin-top: 98px;
    display: flex;
    flex-direction: column;
}
.description-text-news {
    font-family: JetBrainsMono;
    /* padding-left: 45px; */
    display: flex;
    align-items: center;
    padding-top: -10px;
    width: 350px;
    height: 200px;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
}
.general-block-description-news {
    width: 450px;
    height: 210px;
    background-size: 100%;
    background-repeat: no-repeat;
}
.description-text-news-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 210px;
    background-size: 100%;
    background-repeat: no-repeat;
}
.container-news {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
}
.news-wrapper {
    height: 700px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
}
.title-news {
    font-size: 48px;
    font-family: JetBrainsMono;
    font-weight: 200;
    margin-left: 128px;
    margin-top: 18px;
    width: 230px;
}
.title-news-wrapper {
    width: 230px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.line-dashed {
    position: relative;
    top: -38px;
    left: 70px;
    font-size: 48px;
    font-weight: 500;
    letter-spacing: 8px;
    user-select: none;
}
.light-theme-bg {
    background-image: url('../../assets/News/border.png');
}

.dark-theme-bg {
    background-image: url('../../assets/News/border_light.png');
}
.capybara_wrapper {
    display: flex;
}
.capybara_NewsBlock-wrapper {
    display: flex;
    gap: 8rem;
}

@media (min-width: 1024px) and (max-width: 1279px) {
    .capybara_wrapper img {
        height: 12rem;
        width: 12rem;
    }

    .description-news {
        margin: 2.5rem 0 0 0;
        font-size: 0.5rem;
    }

    .description-text-news {
        font-size: 0.65rem;
    }

    .title-news {
        font-size: 2.3rem;
    }

    .line-dashed {
        font-size: 2rem;
        padding: 0.5rem 2.5rem 0 0;
    }

    .general-block-description-news {
        width: 15rem;
        height: 6.8rem;
    }

    .description-text-news-wrapper {
        width: 15rem;
        height: 6rem;
        padding-left: 1.5rem;
    }

    .capybara_NewsBlock-wrapper {
        gap: 1.5rem;
    }
    .btn-next-back-wrapper button {
        font-size: 1rem;
        width: 4rem;
    }
    .back {
        margin-left: 28px;
    }
    .news-block {
        font-size: 10px;
    }
}

@media (min-width: 1280px) and (max-width: 1920px) {
    .capybara_wrapper img {
        height: 16rem;
        width: 16rem;
    }

    .description-news {
        margin: 3.2rem 0 0 0;
        font-size: 0.5rem;
    }

    .description-text-news {
        font-size: 0.9rem;
    }

    .title-news {
        font-size: 2.3rem;
    }

    .line-dashed {
        font-size: 2rem;
        padding: 0.5rem 2.5rem 0 0;
    }

    .general-block-description-news {
        width: 20rem;
        height: 9rem;
    }

    .description-text-news-wrapper {
        width: 20rem;
        height: 9rem;
        padding-left: 2.5rem;
        padding-right: 0.5rem;
    }
    .back {
        margin-left: 35px;
    }
    .capybara_NewsBlock-wrapper {
        gap: 1.5rem;
    }
}

@media (min-width: 1440px) {
    .line-dashed {
        font-size: 3rem;
        padding: 0.5rem 2.5rem 0 0;
        width: 18rem;
    }
    .title-news {
        width: 18rem;
        font-size: 3.3rem;
    }
    .title-news-wrapper {
        padding-left: 3rem;
    }
}

@media (min-width: 1921px) {
    .line-dashed {
        font-size: 3rem;
        padding: 0.5rem 2.5rem 0 0;
        width: 18rem;
    }
    .title-news {
        width: 18rem;
        font-size: 3.3rem;
    }
    .title-news-wrapper {
        padding-left: 3rem;
    }
}
</style>
