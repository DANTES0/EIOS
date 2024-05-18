<script setup>
import { ref, computed } from 'vue';
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
let flag = ref(false)
const props = defineProps({
  id: Number,
  name: String,
  photo: String,
  post: String,
  rank: String,
  active: Boolean,
  currentIndex: Number,
  length: Number,
  nextId: Number,
  prevId: Number
})
// console.log(props.countObject)
function next_prepodavatel() {
flag.value = true
setTimeout(() => {
    flag.value = false; // Удаляем класс .anima
  }, 2000); // Короткий интервал времени
}
const resetAnimation = () => {
  flag.value = false;
  
};
let temp = ref(0)
</script>
<template>
    <div class="wrappper">
          <img
            :src="photo"
            alt=""
            class="prepod-image" :class="{'main-prepod-image': id==currentIndex}"
          />
        <div class="prepod-description-block" v-if="id==currentIndex">
          <h1 class="name-prepod">{{name }}</h1>
          <h2 style="margin-bottom: 21px" class="spec-prepod info-prepod">
           {{ post }}
          </h2>
          <h2 class="stepen-prepod info-prepod" >{{ rank}}</h2>
        </div>
    </div>
</template>
<style scoped>
.wrappper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.setup {
  animation: anima 2s ease !important;
  /* opacity: 0; */
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
  object-fit: cover;
  /* object-position: -5% 0%; */

}
.back-image-arrow {
  background-image: url("../../assets/PrepodavateliKafedri/arrow_back.svg");
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
  background-image: url("../../assets/PrepodavateliKafedri/arrow_next.svg");
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
.wrap-destroy {
    display: none;
}
</style>