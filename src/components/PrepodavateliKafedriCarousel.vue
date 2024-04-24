<script setup>
import { useFetch } from "@vueuse/core"
import { computed, ref } from "vue"
import { onMounted } from "vue"
import PrepodavateliKafedriItem from './PrepodavateliKafedriItem.vue'
let flag = ref(false)
const prepod_url = computed(() => {
  return `http://25.61.98.183:8080/teachers/getAll`
})
let prepod = ref(null)
const fetchPrepod = async() => {
  const response_prepod = await useFetch(prepod_url).json()
  
  prepod.value = response_prepod.data.value
  prepod.value.sort((a, b) => a.id - b.id);
  console.log(prepod.value)
  console.log(response_prepod)
}
function next_prepodavatel() {
flag.value = true
setTimeout(() => {
    flag.value = false; // Удаляем класс .anima
  }, 2000); // Короткий интервал времени
}
let currentIndex = ref(1)
const next = () => {
    currentIndex.value = (currentIndex.value + 1) % prepod.value.length
//   console.log(currentGalleryIndex.value)
}

const prev = () => {
  if (currentIndex.value == 0) {
    currentIndex.value = prepod.value.length - 1
  } else {
    currentIndex.value = Math.abs(
      (currentIndex.value - 1) % prepod.value.length
    )
  }
//   console.log(currentGalleryIndex.value)
}
// const currentNews = computed(() =>
// prepod.value ? prepod.value[currentIndex.value] : null
// )
onMounted(() => {
    fetchPrepod();
})
</script>
<template>
    <div class="content-wrapper-prepod">
        <div class="prepod-image-block">
          <div style="" class="prepod-image-arrow back-image-arrow"></div>
          <div class="PrepodavateliKafedriItem-wrap">
          <PrepodavateliKafedriItem v-for="{id, name, photo, post, rank} in prepod"
          :id = "id"
          :name = "name"
          :photo="photo"
          :post="post"
          :rank="rank"
          ></PrepodavateliKafedriItem>
        </div>
          <!-- <PrepodavateliKafedriItem
          :active="true"></PrepodavateliKafedriItem>
          <PrepodavateliKafedriItem></PrepodavateliKafedriItem> -->
          
          <!-- <img src="../assets/news.png" alt="" class="prepod-image" />
          <img
            src="../assets/news.png"
            alt=""
            class="prepod-image main-prepod-image"
          />
          <img src="../assets/news.png" alt="" class="prepod-image" /> -->
          <div class="prepod-image-arrow next-image-arrow" @click="next_prepodavatel"></div>
        </div>
        <!-- <div class="prepod-description-block">
          <h1 class="name-prepod"></h1>
          <h2 style="margin-bottom: 21px" class="spec-prepod info-prepod">
           
          </h2>
          <h2 class="stepen-prepod info-prepod" ></h2>
        </div> -->
        <div class="line-anima" :class="{'setup': flag}" ></div>
        <!-- @animationend="resetAnimation" -->
        <!-- <div class="prepod-circle-block">
          <div v-for="i in 4" class="circle-prepod"></div>
        </div> -->
      </div>
</template>
<style scoped>
.setup {
  animation: anima 2s ease !important;
  /* opacity: 0; */
}
.PrepodavateliKafedriItem-wrap {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: row;
}

@keyframes anima {
  0% {
    opacity: 1;
    width: 300px;
  }
  50% {
    opacity: 0.5;
    width: 100px;
  }
  100% {
    opacity: 0;
    width: 0px;
  }
}
.line-anima {
  width: 300px;
  height: 2px;
  background-color: #1e66f5;
  /* transition: anima 2s linear; */
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
  height: 80%;
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
  /* overflow-x: hidden; */
}
</style>