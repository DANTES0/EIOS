<script setup>

</script>

<template>

  <div class="header-container">
    <div class="header-box1">
      <div class="title-news1">
          <div class="news-title-text">Красивый цветной заголовок, а справа будет основная мысль новости </div>
      </div>
      <div class="text-news">
        <div class="text-news-text">И нет сомнений, что активно развивающиеся страны третьего мира и по сей день остаются уделом либералов,
          которые жаждут быть в равной степени предоставлены сами себе. Однозначно, базовые сценарии поведения
          пользователей неоднозначны и будут описаны максимально подробно.
          Лишь стремящиеся вытеснить традиционное производство, нанотехнологии, превозмогая сложившуюся непростую
          экономическую ситуацию, ассоциативно распределены по отраслям.
        </div>
      </div>
    </div>
    <div class="header-box2">
      <div class = "news-teg1-container"><div class="news-teg1">#кринж</div></div>
      <div class = "news-date1-container"><div class="news-date1">20/09/24</div></div>
    </div>
  </div>

</template>

<style scoped>

@font-face {
  font-family: JetBrainsMono;
  src: url("../../assets/JetBrainsMono.ttf");
}

@font-face {
  font-family: Rubik;
  src: url("../../assets/Rubik.ttf");
}

@font-face {
  font-family: Nunito;
  src: url("../../assets/Nunito.ttf");
}

.header-container{
  width: 90%;
  height: auto; /* 400px */
  border: solid 1px #2B2B2B;
  display: flex;
  flex-direction: column;
  background-color: #181818;
}

.header-box1 {
  height: 85%;
  border-bottom: solid 1px white;
  display: flex;
  flex-direction: row;
}

.header-box2{
  height: 15%;
  display: flex;
  flex-direction: row;
}

.title-news1 {
  width: 35%;
  border-right: solid 1px #2B2B2B;
  background-image: url("../../assets/NewsContent/blue-wave.svg");
  background-size: contain;
  background-repeat: no-repeat;
}

.news-title-text{
  justify-content: flex-start;
  margin: 40px;
  font-family: Calibri;
  font-weight: bold;
  color: white;
  font-size: 48px;
}

.text-news{
  width: 65%;
}

.text-news-text{
  margin: 40px 30px 40px 30px; ;
  font-family: Calibri;
  color: white;
  font-size: 28px;
}

.news-teg1-container{
  width: 35%;
  display: flex;
  justify-content: flex-end;
}

.news-teg1{
  border-right: solid 1px #2B2B2B;
  font-family: Nunito;
  font-size: 24px;
  padding: 10px;
  color: white;
}

.news-date1-container{
  width: 65%;
  display: flex;
  justify-content: flex-end;
}

.news-date1{
  border-right: solid 1px #2B2B2B;
  font-family: Nunito;
  font-size: 24px;
  padding: 10px;
  color: white;
}

</style>