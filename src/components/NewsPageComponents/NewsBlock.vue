<script setup>
import { defineProps, ref } from 'vue';
import { format } from 'date-fns';

const newsData = defineProps({
    newsTag: { type: String, default: 'Мероприятия' },
    newsDate: { type: Date, default: new Date() },
    newsImage: {
        type: String,
        default:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlY50ssdieUXOuZGHTd9cYVYM7A3smEU4aXY4X_36f3g&s',
    }, // картинка в img ../assets/news.png передаётся если прописать путь в src, а не :src
    newsShowSummary: { type: Boolean, default: true },
    newsTitle: {
        type: String,
        default: 'Международная олимпиала в сфере ИКТ "ИТ-Планета 2024"',
    },
    newsDescription: {
        type: String,
        default:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet porttitor eget dolor morbi non arcu risus quis varius Amet porttitor eget dolor morbi non arcu risus quis variuAmet porttitor eget dolor morbi non arcu risus quis variu',
    },

    blockWidth: { type: String, default: '100%' },
    blockHeight: { type: String, default: '319px' },
    foregroundWidth: { type: String, default: '85%' },
    foregroundHeight: { type: String, default: '85%' },
    fontSize: { type: String, default: '16px' },
});

const processedDescription = () => {
    const maxLength = 216; // Максимальная длина описания

    if (newsData.newsDescription.length > maxLength) {
        let truncatedText = newsData.newsDescription.slice(0, maxLength);

        truncatedText = truncatedText.slice(
            0,
            Math.min(truncatedText.length, truncatedText.lastIndexOf(' ')),
        ); // Обрезаем текст до последнего пробела

        return truncatedText + '...';
    } else {
        return newsData.newsDescription;
    }
};

const processedTitle = () => {
    const maxLength = 75; // Максимальная длина заголовка

    if (newsData.newsTitle.length > maxLength) {
        let truncatedTitle = newsData.newsTitle.slice(0, maxLength);

        truncatedTitle = truncatedTitle.slice(
            0,
            Math.min(truncatedTitle.length, truncatedTitle.lastIndexOf(' ')),
        ); // Обрезаем заголовок до последнего пробела

        return truncatedTitle + '...';
    } else {
        return newsData.newsTitle;
    }
};

const isImageLoaded = ref(false);

const imageLoaded = () => {
    isImageLoaded.value = true;
};
</script>

<template>
    <div @click="$emit('click')">
        <div
            class="news-block-wrapper text-black dark:text-white"
            :style="{ width: newsData.blockWidth, height: newsData.blockHeight }"
        >
            <div class="news-block-tag-and-date-wrapper text-black dark:text-white">
                <div class="news-block-tag">
                    <img src="../../assets/News/image.svg" alt="" class="tag-icon" />
                    <div class="tag" :style="{ fontSize: newsData.fontSize }">
                        {{ newsData.newsTag }}
                    </div>
                </div>

                <div class="news-block-date" :style="{ fontSize: newsData.fontSize }">
                    {{ format(newsData.newsDate, 'dd/MM/yyyy') }}
                </div>
            </div>
            <!-- @click="$router.push('/newsContent')" -->
            <div class="news-block-image">
                <div v-show="!isImageLoaded" class="image-placeholder"></div>
                <img
                    v-show="isImageLoaded"
                    :src="newsData.newsImage"
                    alt=""
                    class="news-block-image-background"
                    @load="imageLoaded()"
                />
                <img
                    v-show="isImageLoaded"
                    :src="newsData.newsImage"
                    alt=""
                    class="news-block-image-foreground"
                    :style="{
                        maxWidth: newsData.foregroundWidth,
                        maxHeight: newsData.foregroundHeight,
                    }"
                    @load="imageLoaded()"
                />
            </div>
        </div>

        <div v-if="newsData.newsShowSummary" class="news-block-summary">
            <div class="news-block-title text-black dark:text-white">
                {{ processedTitle() }}
            </div>

            <div class="news-block-description text-black dark:text-white">
                {{ processedDescription() }}
            </div>
        </div>
    </div>
</template>

<style scoped>
@font-face {
    font-family: JetBrainsMono;
    src: url('../../assets/JetBrainsMono.ttf');
}
@font-face {
    font-family: Rubik;
    src: url('../../assets/Rubik.ttf');
}
/* размеры блока */
.news-block {
    transition:
        width 0.3s ease,
        height 0.3s ease;
}
.news-block-wrapper {
    /* margin-right: 71px; */

    /* устанавливается высота и ширина здесь */
    width: 100%;
    height: 319px;

    display: flex;
    flex-direction: column;
    border: solid 1px;
}
.news-block-tag-and-date-wrapper {
    height: 48px;
    width: 100%;
    border-bottom: 1px solid;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 78px;
}
.news-block-tag {
    display: flex;
    align-items: center;
    gap: 12px;
}
.tag-icon {
    width: 24px;
    height: 24px;
    margin-left: 12px;
}
.tag {
    font-family: Rubik;
    font-size: 18px;
    font-weight: 800;
}
.news-block-date {
    margin-top: 3px;
    font-family: Rubik;
    font-size: 18px;
    font-weight: 800;
    margin-right: 53px;
}
.news-block-image {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
}
.news-block-image-background {
    width: 100%;
    height: 100%;
    filter: blur(6px) brightness(50%);
    transform: scale(1.4);
    object-fit: cover;
}
/* картинка на переднем плане */
.news-block-image-foreground {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    margin: auto auto;
}
.image-placeholder {
    width: 100%;
    height: 100%;
    background: transparent;
}
.news-block-title {
    font-family: JetBrainsMono;
    font-size: 20px;
    font-weight: 700;
    line-height: 27px;
    letter-spacing: -1px;
    text-align: left;

    margin-top: 10px;
}
.news-block-description {
    font-family: JetBrainsMono;
    font-size: 17px;
    font-weight: 700;
    line-height: 27px;
    letter-spacing: -1px;
    text-align: justify;

    margin-top: 10px;
}
@media (min-width: 1024px) and (max-width: 1920px) {
}
</style>
