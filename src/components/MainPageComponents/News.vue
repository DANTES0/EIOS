<script setup>
import ProgressSpinner from 'primevue/progressspinner';
import { defineProps, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue';
import NewsBlock from '/src/components/NewsPageComponents/NewsBlock.vue';
import { useRouter } from 'vue-router';
import theme from 'tailwindcss/defaultTheme.js';
import SectionTitle from './SectionTitle.vue';
import NumberColumn from './NumberColumn.vue';

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
        fontSize.value = '16px';
    } else if (window.matchMedia('(min-width: 1441px) and (max-width: 1920px)').matches) {
        blockWidth.value = '410px';
        blockHeight.value = '280px';
        fontSize.value = '18px';
    } else {
        blockWidth.value = '540px';
        blockHeight.value = '395px';
        fontSize.value = '22px';
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
    <div ref="wrapper" class="news-wrapper bg-gray-200 dark:bg-[#181818]">
        <NumberColumn
            :item-height="36"
            :vertical-padding="15"
            :horizontal-padding="5"
            :gap="0"
            :max-numbers="50"
            :observe-target="wrapper"
        />
        <div id="news" class="content-news-wrapper">
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
                        <div class="description-news text-[#0c2340] dark:text-white">
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
                                <button
                                    class="btn-news back border-[1px] border-[#006AFF] dark:border-[#999999]"
                                    @click="$emit('prev')"
                                >
                                    НАЗАД
                                </button>
                                <button
                                    class="btn-news next border-[1px] border-[#006AFF] dark:border-[#999999]"
                                    @click="$emit('next')"
                                >
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
    height: 550px;
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
    /* height: 700px; */
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
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
    align-items: center;
}

@media (min-width: 1024px) {
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

    .general-block-description-news {
        width: 15rem;
        height: 6.7rem;
    }

    .description-text-news-wrapper {
        width: 15rem;
        height: 6rem;
        padding-left: 1.5rem;
    }

    .capybara_NewsBlock-wrapper {
        gap: 1rem;
    }
    .btn-next-back-wrapper button {
        font-size: 0.85rem;
        width: 4.5rem;
    }
    .back {
        margin-left: 28px;
    }
    .news-block {
        font-size: 10px;
    }
}

@media (min-width: 1279px) {
    .capybara_wrapper img {
        height: 14rem;
        width: 14rem;
    }

    .description-news {
        margin: 2.8rem 0 0 0;
        font-size: 0.5rem;
    }

    .description-text-news {
        font-size: 0.85rem;
    }

    .general-block-description-news {
        width: 18rem;
        height: 8rem;
    }

    .description-text-news-wrapper {
        width: 18rem;
        height: 8rem;
        padding-left: 2.5rem;
        padding-right: 0.5rem;
    }

    .back {
        margin-left: 30px;
    }

    .capybara_NewsBlock-wrapper {
        gap: 1.75rem;
    }

    .btn-next-back-wrapper button {
        font-size: 1.2rem;
        width: 6rem;
    }
    .back {
        margin-left: 32px;
    }
}

@media (min-width: 1440px) {
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
        gap: 2rem;
    }
}

@media (min-width: 1920px) {
    .capybara_wrapper img {
        height: 18rem;
        width: 18rem;
    }

    .description-news {
        margin: 4rem 0 0 0;
        font-size: 1rem;
    }

    .description-text-news {
        font-size: 1rem;
    }

    .general-block-description-news {
        width: 22rem;
        height: 9.9rem;
    }

    .description-text-news-wrapper {
        width: 20.4rem;
        height: 10rem;
        padding-left: 3.4rem;
        padding-right: 0rem;
    }

    .back {
        margin-left: 38px;
    }

    .capybara_NewsBlock-wrapper {
        gap: 2.5rem;
    }

    .btn-next-back-wrapper button {
        font-size: 1.35rem;
        width: 7rem;
    }
}

@media (min-width: 1921px) {
    .capybara_wrapper img {
        height: 23rem;
        width: 23rem;
    }

    .description-news {
        margin: 5rem 0 0 0;
        font-size: 1rem;
    }

    .description-text-news {
        font-size: 1.25rem;
        width: 85%;
    }

    .general-block-description-news {
        width: 28rem;
        height: 13rem;
    }

    .description-text-news-wrapper {
        width: 28rem;
        height: 12rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-left: 3.4rem;
        padding-right: 0rem;
    }

    .back {
        margin-left: 50px;
    }

    .capybara_NewsBlock-wrapper {
        gap: 3.5rem;
    }

    .btn-next-back-wrapper button {
        font-size: 1.7rem;
        width: 8rem;
    }
}
</style>
