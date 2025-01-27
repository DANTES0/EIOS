<script setup>
import ProgressSpinner from 'primevue/progressspinner';

const props = defineProps({
    id: Number,
    headline: String,
    category: String,
    date: String,
    url: String,
    isFinished: Boolean,
});
</script>

<template>
    <div class="news-wrapper">
        <div class="numbers-wrapper">
            <div v-for="i in 18" :key="i" class="numbers">{{ i }}</div>
        </div>
        <div id="news" class="content-news-wrapper">
            <div class="title-news-wrapper">
                <h1 class="title-news"><span style="color: #1e66f5">#</span>НОВОСТИ</h1>
                <label class="line-dashed">---------</label>
            </div>
            <div v-if="!props.isFinished" class="spinner-container">
                <progress-spinner class="custom-spinner" />
            </div>
            <!-- <div class="spinner-container">
                <progress-spinner class="custom-spinner" />
            </div> -->
            <!-- вот это вот надо скрывать если ниче не грузит-->

            <div v-else class="container-news">
                <img
                    src="../../assets/News/kapybars_in_circle.png"
                    alt=""
                    class="kapybaras"
                />
                <div class="description-news">
                    <div class="general-block-description-news">
                        <div class="description-text-news">
                            {{ headline }}
                        </div>
                    </div>
                    <div class="btn-next-back-wrapper">
                        <button class="btn-news back" @click="$emit('prev')">
                            НАЗАД
                        </button>
                        <button class="btn-news next" @click="$emit('next')">
                            ВПЕРЕД
                        </button>
                    </div>
                </div>
                <div class="card-news-block">
                    <div class="card-news-up-block">
                        <div class="card-news-up-tags">
                            <img
                                src="../../assets/News/image.svg"
                                alt=""
                                class="img-tags"
                            />
                            <div class="tags-title">{{ category }}</div>
                        </div>
                        <div class="card-news-up-date">{{ date }}</div>
                    </div>
                    <div class="card-news-down-tags">
                        <img
                            src=""
                            alt=""
                            class="card-news-down-tags-blur"
                            :style="{
                                backgroundImage:
                                    'url(' +
                                    `https://security-jwt.onrender.com/api/v1/image?fileName=${url[0].filename}&imageType=NewsImage` +
                                    ')',
                            }"
                        />
                        <div
                            class="card-news-down-tags-image"
                            :style="{
                                backgroundImage:
                                    'url(' +
                                    `https://security-jwt.onrender.com/api/v1/image?fileName=${url[0].filename}&imageType=NewsImage` +
                                    ')',
                            }"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
    width: 301px;
    height: 297px;
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
    color: #cccccc;
    width: 100px;
    height: 29x;
    border: 1px solid #999999;
    background-color: transparent;
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
    margin-left: 45px;
    display: flex;
    align-items: center;
    margin-top: -10px;
    width: 350px;
    height: 200px;
    font-size: 20px;
    font-weight: 700;
    color: #999999;
    text-align: center;
}
.general-block-description-news {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 450px;
    height: 210px;
    background-image: url('../../assets/News/border.png');
    background-size: 100%;
    background-repeat: no-repeat;
}
.container-news {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.news-wrapper {
    height: 700px;
    width: 100%;
    background-color: #191919;
    margin-top: 120px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
}
.title-news {
    font-size: 48px;
    font-family: JetBrainsMono;
    font-weight: 200;
    color: white;
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
    color: white;
    letter-spacing: 8px;
    user-select: none;
}
</style>
