<script setup>

defineProps({
  id: Number,
  headLine: String,
  date: String,
  category: String,
  urls: Array
})

</script>

<template>
    <div class="wrapper-brief-news">
        <h1 class="title-brief-news">НОВОСТИ</h1>
        <div class="content-brief-news-wrapper">
            <div class="prev btn-news" style="margin-right: 58px;">{</div>
            <div class="content-brief-news-container">
                <div class="image-block-brief-news" :style="{ backgroundImage: 'url(' +urls+ ')' }">
                    <div class="date-block-brief-news">
                        <label class="text-date-block-brief-news">{{ date }}</label>
                    </div>
                </div>
                <div class="text-brief-news-container">
                    <h2 class="description-text-brief-news">{{ headLine }}</h2>
                    <he class="teg-text-brief-news">{{category}}</he>
                </div>
            </div>
            <div class="next btn-news" style="margin-left: 58px;">}</div>
        </div>
    </div>
</template>

<style>
.wrapper-brief-news {
    width: 100%;
    max-width: 1390px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 272px;
    flex-direction: column;
}
.title-brief-news {
    font-size: 64px;
    font-weight: 700;
    letter-spacing: 32px;
    text-shadow: 0px 8px #000000;
}
.content-brief-news-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
}
.btn-news {
    font-size: 212px;
    cursor: pointer;
    margin-top: 40px;
}
.content-brief-news-container {
    width: 1120px;
    height: 374px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 85px;
}
.image-block-brief-news {
    background-image: url(${urls});
    background-size: cover;
    width: 572px;
    height: 374px;
    border: 5px solid #408AFA;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: end;
    background-repeat: no-repeat;
}
.date-block-brief-news {
    width: 195px;
    height: 50px;
    border: 3px solid #408AFA;
    background-color: #151A31;
    opacity: 88%;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 27px
}
.text-date-block-brief-news {
    color: white;
    font-size: 25px;
    font-weight: 400;
}
.text-brief-news-container {
    width: 529px;
    height: 280px;
    margin-left: 19px;
    line-height: 34px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.description-text-brief-news {
    font-size: 33px;
    font-weight: 400;
    color: white;
}

.teg-text-brief-news {
    font-size: 41px;
    font-weight: 600;
    margin-bottom: 13px;
}
</style>