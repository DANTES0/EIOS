<script setup>
import { ref } from 'vue';
import PrepodavateliKafedriCarousel from './PrepodavateliKafedriCarousel.vue';
let flag = ref(false);
const props = defineProps({
	id: Number,
	name: String,
	photo: String,
	post: String
}); 
function next_prepodavatel() {
	flag.value = true;
	setTimeout(() => {
		flag.value = false; // Удаляем класс .anima
	}, 2000); // Короткий интервал времени
}
const resetAnimation = () => {
	flag.value = false;
  
};
</script>
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
      <PrepodavateliKafedriCarousel></PrepodavateliKafedriCarousel>
    </div>
  </div>
</template>
<style>
@font-face {
  font-family: JetBrainsMono;
  src: url("../../assets/JetBrainsMono.ttf");
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
