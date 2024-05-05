<script setup>
    import { defineProps } from "vue";

    const props = defineProps({
    blockWidth: { type: String, default: "100%" },
    blockHeight: { type: String, default: "319px" },
    foregroundWidth: { type: String, default: "315px" },
    foregroundHeight: { type: String, default: "216px" }
  });
</script>

<template>
    <div class="news-block-wrapper" :style="{ width: props.blockWidth, height: props.blockHeight }">

        <div class="news-block-tag-and-date-wrapper">

            <div class="news-block-tag">
                <img src="../assets/News/image.svg" alt="" class="tag-icon" />
                <div class="tag">Мероприятия</div>
            </div>

            <div class="news-block-date">25/02/2024</div>

        </div>

        <div class="news-block-image">
            <img
                src="../assets/news.png"
                alt=""
                class="news-block-image-background"
            />
            <img
                src="../assets/news.png"
                alt=""
                class="news-block-image-foreground"
                :style="{ width: props.foregroundWidth, height: props.foregroundHeight }"
            />
        </div>
    </div>
</template>

<style>
    @font-face {
        font-family: JetBrainsMono;
        src: url("../assets/JetBrainsMono.ttf");
    }

    @font-face {
        font-family: Rubik;
        src: url("../assets/Rubik.ttf");
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
        color: #1e66f5;
    }
    
    .news-block-date {
        margin-top:3px;
        font-family: Rubik;
        font-size: 18px;
        font-weight: 800;
        color: #cccccc;
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
        filter: blur(6px);
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
        width: 315px;
        height: 216px;

        margin: auto auto;
    }
</style>