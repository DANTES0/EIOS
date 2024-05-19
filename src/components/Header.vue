<script setup>
import HeaderAnchor from "./HeaderAnchor.vue"
import { authState } from '../authState';
import { useStore } from 'vuex';

const store = useStore();

function isLoggedIn () {
  console.log(store.getters.isLoggedIn)
  // return store.getters.isLoggedIn;
}

const toggleAuthVisibility = () => {
  authState.isVisible = !authState.isVisible;
  console.log(authState.isVisible)
};
const emit = defineEmits(['toggle-auth'])
</script>

<template>
  <div class="header-wrapper"  :style="{ width: $route.path === '/newsContent' ? 'auto' : '' }">
    <div class="header-wrapper-container">
      <!-- <div class="title" @click="$router.push('/')">О<span style="color:#408AFA">7</span></div> -->
      <div class="page-header">
        <a
          class="page"
          id="main"
          data-title="Главная страница"
          @click="$router.push('/')"
        ></a>
        <a
          class="page"
          id="q"
          data-title="Новости"
          @click="$router.push('/news')"
        ></a>
        <a
          class="page"
          id="w"
          data-title="Расписание"
          @click="$router.push('/timetable')"
        ></a>
        <a
          class="page"
          id="e"
          data-title="Комиссия"
          @click="$router.push('/admin')"
        ></a>

        <a class="page" id="t" @click="$router.push('/gallery')"></a>
      </div>
      <div class="page-header-bottom">
        <a @click="toggleAuthVisibility" class="page" id="profile" data-title="Профиль"></a>
        <a @click="() => store.dispatch('logout')" class="page" id="moodle" data-title="moodle"></a>
      </div>
    </div>
    <div class="header-wrapper-anchor-container" v-if="$route.path !== '/newsContent' ">
      <div class="pum">
        <a class="title" @click="$router.push('/')"
        >Кафедра <span style="color: white">О</span>7</a
        >
        <!-- <img src="../assets/voenmeh2.svg" alt="" class="voenmeh-title"> -->
        <a href="https://www.voenmeh.ru/" class="voen">
          <img
              style="transform: scale(1.6)"
              src="../assets/header/voenmeh.svg"
              class="page"
              id="r"
          />
        </a>
      </div>
      <HeaderAnchor></HeaderAnchor>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: Russo-One;
  src: url("../assets/RussoOne-Regular.ttf");
}

#main {
  background-image: url("../assets/header/home.svg");
  filter: invert(54%) sepia(1%) saturate(0%) hue-rotate(341deg) brightness(93%)
    contrast(89%);
  margin-top: 15px;
}
.page:hover::after {
  content: attr(data-title);
  position: absolute; /* Абсолютное позиционирование */
  left: 50px;
  top: 5%; /* Положение подсказки */
  z-index: 19; /* Отображаем подсказку поверх других элементов */
  background-color: #ffffff; /* Полупрозрачный цвет фона */
  font-family: Russo-One, sans-serif; /* Гарнитура шрифта */
  font-size: 12px; /* Размер текста подсказки */
  padding: 5px 10px; /* Поля */
  border: 1px solid #333; /* Параметры рамки */
  border-radius: 10px;

  color: #838383;
  width: 150px;
  height: 15px;
  text-align: center;
  filter: invert(11%) sepia(0%) saturate(1%) hue-rotate(112deg) brightness(98%)
    contrast(85%);
}
.page:hover::before {
  content: "";
  position: absolute;
  left: 45px;
  bottom: 13px;
  width: 13px;
  height: 13px;
  background: #ffffff;
  transform: rotate(41deg);
  /* box-shadow: inset 1px -1px  rgb(0, 0, 0); */
  filter: invert(11%) sepia(0%) saturate(1%) hue-rotate(112deg) brightness(98%)
    contrast(85%);
  z-index: 999;
  border-left: 1px solid #000;
  border-bottom: 1px solid #000;
}
.pum {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
#q:hover::after {
  width: 100px;
}
#moodle {
  background-image: url("../assets/header/bottom/moodle.svg");
  background-size: contain;
  transform: scale(1.3);
  filter: invert(54%) sepia(1%) saturate(0%) hue-rotate(341deg) brightness(93%)
    contrast(89%);
}
#profile {
  background-image: url("../assets/header/bottom/profile.svg");
  background-size: contain;
  /* transform: scale(1); */
  filter: invert(54%) sepia(1%) saturate(0%) hue-rotate(341deg) brightness(93%)
    contrast(89%);
}
#q {
  background-image: url("../assets/header/second.svg");
  filter: invert(54%) sepia(1%) saturate(0%) hue-rotate(341deg) brightness(93%)
    contrast(89%);
}
.page-header-bottom {
  display: flex;
  flex-direction: column;
}
#w {
  background-image: url("../assets/header/third.svg");
  filter: invert(54%) sepia(1%) saturate(0%) hue-rotate(341deg) brightness(93%)
    contrast(89%);
}
#e {
  background-image: url("../assets/header/fourth.svg");
  filter: invert(54%) sepia(1%) saturate(0%) hue-rotate(341deg) brightness(93%)
    contrast(89%);
}
#r {
  /* background-image: url("../assets/voenmeh3.svg"); */
  transform: scale(2.5);
  filter: invert(63%) sepia(92%) saturate(7299%) hue-rotate(215deg)
    brightness(99%) contrast(94%);
  /* filter: invert(54%) sepia(1%) saturate(0%) hue-rotate(341deg) brightness(93%) contrast(89%); */
}
#r:hover {
  filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg)
    brightness(100%) contrast(110%);
}
#moodle:hover {
  filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg)
    brightness(100%) contrast(110%);
}
#profile:hover {
  filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg)
    brightness(100%) contrast(110%);
}
#e:hover::after {
  width: 100px;
}
#w:hover::after {
  width: 100px;
}
#moodle:hover::after {
  width: 100px;
}
#main:hover {
  filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg)
    brightness(100%) contrast(110%);
}
#q:hover {
  filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg)
    brightness(100%) contrast(110%);
}
#w:hover {
  filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg)
    brightness(100%) contrast(110%);
}
#e:hover {
  filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg)
    brightness(100%) contrast(110%);
}
.header-wrapper {
  /* position: fixed; */
  border-right: 1px solid #2b2b2b;
  position: sticky;
  top: 0;
  left: 0;
  width: 320px;
  height: 100vh;
  background-color: #0d101f;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  font-family: Russo-One;
}
.header-wrapper-container {
  background-color: #181818;
  width: 58px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 31px;
  font-weight: 700;
  font-family: Jost;
  color: white;
  border-right: 1px solid #2b2b2b;
}
.header-wrapper-anchor-container {
  width: 262px;
  height: 100%;
  background-color: #181818;
}
.title {
  font-size: 24px;
  cursor: pointer;
  text-decoration: none;
  color: #1e66f5;
  user-select: none;
  margin-left: 20px;
  margin-bottom: 20px;
}
.page-header {
  display: flex;
  flex-direction: column;
}
.page {
  cursor: pointer;
  font-weight: 300;
  width: 35px;
  height: 35px;
  margin-bottom: 20px;
}
.voenmeh-title {
  width: 40px;
  height: 40px;
}
</style>
