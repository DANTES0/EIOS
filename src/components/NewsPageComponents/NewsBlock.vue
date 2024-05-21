<script setup>
    import { defineProps } from "vue";
    import { format } from 'date-fns';


    const newsData = defineProps({
        newsTag: { type: String, default: "Мероприятия"},
        newsDate: { type: Date, default: new Date() },
        newsImage: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlY50ssdieUXOuZGHTd9cYVYM7A3smEU4aXY4X_36f3g&s"}, // картинка в img ../assets/news.png передаётся если прописать путь в src, а не :src
        newsShowSummary: {type: Boolean, default: true},
        newsTitle: {type: String, default: 'Международная олимпиала в сфере ИКТ "ИТ-Планета 2024"'},
        newsDescription: {type: String, default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet porttitor eget dolor morbi non arcu risus quis varius Amet porttitor eget dolor morbi non arcu risus quis variuAmet porttitor eget dolor morbi non arcu risus quis variu"},
        
        blockWidth: { type: String, default: "100%" },
        blockHeight: { type: String, default: "319px" },
        foregroundWidth: { type: String, default: "85%" },
        foregroundHeight: { type: String, default: "85%" },
    });

    const processedDescription = () => {
        const maxLength = 216 // Максимальная длина описания
        if (newsData.newsDescription.length > maxLength) {
            let truncatedText = newsData.newsDescription.slice(0, maxLength)
            truncatedText = truncatedText.slice(0, Math.min(truncatedText.length, truncatedText.lastIndexOf(" "))) // Обрезаем текст до последнего пробела
            return truncatedText + '...'
        } else {
            return newsData.newsDescription
        }
    };

    const processedTitle = () => {
        const maxLength = 75 // Максимальная длина заголовка
        if (newsData.newsTitle.length > maxLength) {
            let truncatedTitle = newsData.newsTitle.slice(0, maxLength)
            truncatedTitle = truncatedTitle.slice(0, Math.min(truncatedTitle.length, truncatedTitle.lastIndexOf(" "))) // Обрезаем заголовок до последнего пробела
            return truncatedTitle + '...'
        } else {
            return newsData.newsTitle
        }
    };
</script>

<template>
    <div class="news-block-wrapper" :style="{ width: newsData.blockWidth, height: newsData.blockHeight }">

        <div class="news-block-tag-and-date-wrapper">
            <div class="news-block-tag">
                <img src="../../assets/News/image.svg" alt="" class="tag-icon"  />
                <div class="tag">{{newsData.newsTag}}</div>
            </div>

            <div class="news-block-date">{{format(newsData.newsDate, 'dd/MM/yyyy')}}</div>

        </div>

        <div class="news-block-image" @click="$router.push('/newsContent')">
            <img
                :src="newsData.newsImage"
                alt=""
                class="news-block-image-background"
            />
            <img
                :src="newsData.newsImage"
                alt=""
                class="news-block-image-foreground"
                :style="{ 
                        maxWidth: newsData.foregroundWidth,
                        maxHeight: newsData.foregroundHeight,
                    }"
            />
        </div>
    </div>

    <div class="news-block-summary" v-if="newsData.newsShowSummary"> 

        <div class="news-block-title" @click="$router.push('/newsContent')"> 
            {{ processedTitle() }}
        </div>

        <div class="news-block-description"> 
            {{ processedDescription() }}
        </div>

    </div>
</template>

<style>
    @font-face {
        font-family: JetBrainsMono;
        src: url("../../assets/JetBrainsMono.ttf");
    }

    @font-face {
        font-family: Rubik;
        src: url("../../assets/Rubik.ttf");
    }

    /* размеры блока */
    .news-block-wrapper {
        margin-right: 71px;

        /* устанавливается высота и ширина здесь */
        width: 100%;
        height: 319px;

        display: flex;
        flex-direction: column;
        border: solid 1px #999999;
    }

    .news-block-tag-and-date-wrapper {
        height: 48px;
        width: 100%;
        border-bottom: 1px solid #999999;
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
        font-size: 18;
        font-weight: 800;
        /* color: #1e66f5;*/
        color: #cccccc;
    }
    
    .news-block-date {
        margin-top:3px;
        font-family: Rubik;
        font-size: 18px;
        font-weight: 800;
        color: #cccccc;
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

        /* устанавливается высота и ширина здесь */
        /* width: 315px;
        height: 216px; */

        margin: auto auto;
    }

    .news-block-title {
        color: rgb(255, 255, 255);
        font-family: JetBrainsMono;
        font-size: 20px;
        font-weight: 700;
        line-height: 27px;
        letter-spacing: -1px;
        text-align: left;

        margin-top: 10px;
    }

    .news-block-description{
        color: rgba(255, 255, 255, 0.6);
        font-family: JetBrainsMono;
        font-size: 17px;
        font-weight: 700;
        line-height: 27px;
        letter-spacing: -1px;
        text-align: justify;

        margin-top: 10px;
    }
</style>