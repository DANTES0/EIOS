<script setup></script>
<template>
  <div class="wrapper-cifri">
    <div class="numbers-wrapper">
      <div class="numbers" v-for="i in 22">{{ i }}</div>
    </div>
    <div id="cifri" class="content-cifri-wrapper">
      <div class="title-cifri-wrapper">
        <h1 class="title-cifri"><span style="color: #1e66f5">#</span>ЦИФРЫ</h1>
        <label class="line-dashed-cifri">--------</label>
      </div>
      <div class="cifri-frame">
        <div class="cifri-block">
          <div class="image-block-cifri">
            <h1 class="title-cifri">1000+</h1>
          </div>
          <h2 style="padding-right: 10px" class="description-cifri">
            студентов
          </h2>
        </div>
        <div class="cifri-block">
          <div class="image-block-cifri">
            <h1 class="title-cifri">110+</h1>
          </div>
          <h2 class="description-cifri">бюджетных мест</h2>
        </div>
        <div class="cifri-block">
          <div class="image-block-cifri">
            <h1 class="title-cifri">43+</h1>
          </div>
          <h2 class="description-cifri">преподавателей</h2>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
@font-face {
  font-family: Ubuntu-Bold;
  src: url("../../assets/Ubuntu-Bold.ttf");
}
@font-face {
  font-family: JetBrainsMono;
  src: url("../../assets/JetBrainsMono.ttf");
}

.description-cifri {
  font-family: JetBrainsMono;
  font-size: 20px;
  font-weight: 700;
  color: #d9d9d9;
  width: 180px;
  height: 41px;
  text-align: center;
  margin-top: 15px;
}
.image-block-cifri h1 {
  /* margin: 0; */
  width: 110px;
  height: 41px;
  font-size: 29px;
  font-family: Ubuntu-Bold;
  margin: 0 auto;
  text-align: center;
}
.image-block-cifri {
  background-image: url("../../assets/KafedraCifri/cifri_file.svg");
  height: 202px;
  width: 168px;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  justify-content: start;
  align-items: center;
}
.cifri-block {
  width: 168px;
  height: 256px;
  margin-right: 70px;
}
.content-cifri-wrapper {
  width: 100%;
}
.cifri-frame {
  width: 1024px;
  height: 482px;
  background-image: url("../../assets/KafedraCifri/frame.png");
  background-size: contain;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.line-dashed-cifri {
  position: relative;
  top: -38px;
  left: -165px;
  font-size: 48px;
  font-weight: 500;
  color: white;
  letter-spacing: 8px;
  user-select: none;
}
.content-cifri-prepod {
  height: 700px;
  width: 100%;
  border-top: 1px solid #1e66f5;
  border-bottom: 1px solid #1e66f5;
  margin-left: 52px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.wrapper-cifri {
  height: 850px;
  background-color: #191919;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  margin-top: 90px;
}
.title-cifri {
  font-size: 48px;
  font-family: JetBrainsMono;
  font-weight: 200;
  color: white;
  margin-left: 128px;
  margin-top: 18px;
  width: 650px;
}
.title-cifri-wrapper {
  width: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
