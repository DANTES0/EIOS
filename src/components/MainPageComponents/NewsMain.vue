<script setup>
// import NewsBlock from "./News.vue"
</script>

<template>
    <div class="news-wrapper">
        <div class="numbers-wrapper">
            <div v-for="i in 18" :key="i" class="numbers">{{ i }}</div>
        </div>
        <div id="news" class="content-news-wrapper">
            <div class="title-news-wrapper">
                <h1 class="title-news"><span style="color: #1e66f5">#</span>НОВОСТИ</h1>
                <label class="line-dashed">----------</label>
            </div>
            <div class="container-news">
                <img
                    src="../../assets/News/kapybars_in_circle.png"
                    alt=""
                    class="kapybaras"
                />
                <div class="description-news">
                    <div class="general-block-description-news">
                        <div class="description-text-news">
                            Началась регистрация участников юбилейной XV Международной
                            олимпиады в сфере информационных технологий «IT-Планета 2024»
                        </div>
                    </div>
                    <div class="btn-next-back-wrapper">
                        <button class="btn-news back">НАЗАД</button>
                        <button class="btn-news next">ВПЕРЕД</button>
                    </div>
                </div>

                <!-- <NewsBlock
          :blockWidth="'540px'" 
          :blockHeight="'395px'" 
          :foregroundWidth="'402px'"
          :foregroundHeight="'276px'"
        >
        </NewsBlock> -->
            </div>
        </div>
    </div>
</template>

<style>
@font-face {
    font-family: JetBrainsMono;
    src: url('../../assets/JetBrainsMono.ttf');
}
@font-face {
    font-family: Rubik;
    src: url('../../assets/Rubik.ttf');
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

.back {
    margin-left: 50px;
}
.btn-next-back-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
    margin-top: 50px;
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
    height: 664px;
    width: 100%;
    background-color: #191919;
    margin-top: 50px;
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
</style>
