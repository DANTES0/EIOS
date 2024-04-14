<script setup></script>
<template>
  <div class="wrapper-prepod">
    <div class="numbers-wrapper">
      <div class="numbers" v-for="i in 25">{{ i }}</div>
    </div>
    <div id="prepod" class="content-prepod-wrapper">
      <div class="title-prepod-wrapper">
        <h1 class="title-prepod">
          <span style="color: #1e66f5">#</span>ПРЕПОДАВАТЕЛИ КАФЕДРЫ
        </h1>
        <label class="line-dashed">----------------------------</label>
      </div>
      <div class="content-wrapper-prepod">
        <div class="prepod-image-block">
          <div style="" class="prepod-image-arrow back-image-arrow"></div>
          <img src="../assets/news.png" alt="" class="prepod-image" />
          <img
            src="../assets/news.png"
            alt=""
            class="prepod-image main-prepod-image"
          />
          <img src="../assets/news.png" alt="" class="prepod-image" />
          <div class="prepod-image-arrow next-image-arrow"></div>
        </div>
        <div class="prepod-description-block">
          <h1 class="name-prepod">Мажайцев Евгений Александрович</h1>
          <h2 style="margin-bottom: 21px" class="spec-prepod info-prepod">
            Преподаватель
          </h2>
          <h2 class="stepen-prepod info-prepod">Доцент технических наук</h2>
        </div>
        <div class="prepod-circle-block">
          <div v-for="i in 4" class="circle-prepod"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
@font-face {
  font-family: JetBrainsMono;
  src: url("../assets/JetBrainsMono.ttf");
}
.prepod-image-arrow:hover {
  filter: brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(3534%)
    hue-rotate(146deg) brightness(122%) contrast(120%);
  cursor: pointer;
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
  font-size: 36;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 39px;
}
.info-prepod {
  font-family: JetBrainsMono;
  font-size: 30;
  color: #999999;
  font-weight: 300;
}
.prepod-description-block {
  margin-top: 40px;
  width: 642px;
  height: 218px;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.prepod-image {
  width: 238px;
  height: 238px;
  border-radius: 100%;
}
.back-image-arrow {
  background-image: url("../assets/PrepodavateliKafedri/arrow_back.svg");
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
  background-image: url("../assets/PrepodavateliKafedri/arrow_next.svg");
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
.content-wrapper-prepod {
  height: 700px;
  width: 1450px;
  border-top: 1px solid #1e66f5;
  border-bottom: 1px solid #1e66f5;
  margin-left: 52px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.wrapper-prepod {
  height: 900px;
  background-color: #1f1f1f;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  margin-top: 20px;
}
.title-prepod {
  font-size: 48px;
  font-family: JetBrainsMono;
  font-weight: 200;
  color: white;
  margin-left: 128px;
  margin-top: 18px;
  width: 650px;
}
.title-prepod-wrapper {
  width: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
