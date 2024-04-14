<script setup></script>
<template>
  <div class="wrapper-gallery">
    <div class="numbers-wrapper">
      <div class="numbers" v-for="i in 22">{{ i }}</div>
    </div>
    <div id="gallery" class="content-gallery-wrapper">
      <div class="title-gallery-wrapper">
        <h1 class="title-gallery">
          <span style="color: #1e66f5">#</span>ФОТОГАЛЕРЕЯ
        </h1>
        <label class="line-dashed-gallery">---------------</label>
      </div>
      <div class="content-wrapper-gallery">
        <div class="gallery-image-block">
          <div style="" class="gallery-image-arrow back-image-arrow"></div>
          <img src="../assets/news.png" alt="" class="gallery-image" />
          <img src="../assets/news.png" alt="" class="gallery-image" />
          <img src="../assets/news.png" alt="" class="gallery-image" />
          <div class="gallery-image-arrow next-image-arrow"></div>
        </div>
        <div class="gallery-circle-block">
          <div v-for="i in 4" class="circle-gallery"></div>
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
.gallery-image-arrow:hover {
  filter: brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(3534%)
    hue-rotate(146deg) brightness(122%) contrast(120%);
  cursor: pointer;
}
.circle-gallery {
  width: 16px;
  height: 16px;
  border-radius: 100%;
  border: 1px solid white;
  background-color: transparent;
}
.gallery-circle-block {
  width: 100px;
  height: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 80px;
}
.name-gallery {
  font-family: JetBrainsMono;
  font-size: 36;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 39px;
}
.info-gallery {
  font-family: JetBrainsMono;
  font-size: 30;
  color: #999999;
  font-weight: 300;
}
.gallery-description-block {
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
.gallery-image {
  width: 360px;
  height: 360px;
}
.back-image-arrow {
  background-image: url("../assets/PrepodavateliKafedri/arrow_back.svg");
  width: 70px;
  height: 81px;
  background-repeat: no-repeat;
  background-size: contain;
}
.main-gallery-image {
  width: 330px;
  height: 330px;
}
.next-image-arrow {
  background-image: url("../assets/PrepodavateliKafedri/arrow_next.svg");
  width: 70px;
  height: 81px;
  background-repeat: no-repeat;
  background-size: contain;
}
.gallery-image-block {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 330px;
  margin-top: 30px;
}
.content-gallery-wrapper {
  width: 100%;
}
.content-wrapper-gallery {
  height: 550px;
  width: 1450px;
  border-top: 1px solid #1e66f5;
  border-bottom: 1px solid #1e66f5;
  margin-left: 52px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.wrapper-gallery {
  height: 850px;
  background-color: #1f1f1f;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  margin-top: 20px;
}
.title-gallery {
  font-size: 48px;
  font-family: JetBrainsMono;
  font-weight: 200;
  color: white;
  margin-left: 128px;
  margin-top: 18px;
  width: 650px;
}
.title-gallery-wrapper {
  width: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.line-dashed-gallery {
  position: relative;
  top: -38px;
  left: -90px;
  font-size: 48px;
  font-weight: 500;
  color: white;
  letter-spacing: 8px;
  user-select: none;
}
</style>
