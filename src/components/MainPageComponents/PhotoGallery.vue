<script setup>
import { ref, onMounted } from 'vue';

onMounted(() => {
    console.log(document.querySelector('.circle_gallery'));
});

let prop = defineProps({
    id_photo: Number,
    photo: Array,
});
let j = ref(0);
let first = ref(0);
let second = ref(1);
let third = ref(2);
let flag = ref(0);
let array_size = ref(Object.keys(prop.photo).filter((key) => !isNaN(key)).length);
const gradientActive = ref(false);
const next_photo = () => {
    gradientActive.value = !gradientActive.value;
    console.log(gradientActive.value);
    setTimeout(() => (gradientActive.value = !gradientActive.value), 800);
    //   let count = 0;

    // for (let key in prop.photo) {
    //   if (typeof prop.photo[key] === "string") {
    //     count++;
    //   }
    // }
    // console.log(count)
    // console.log(Object.keys(prop.photo).length)
    if (third.value == 1) {
        first.value = -1;
        // flag.value = 1;
    }

    first.value++;

    if (first.value == array_size.value - 1) {
        second.value = -1;
        // flag.value = 1;
    }

    // console.log(first.value)
    second.value++;

    if (second.value == array_size.value - 1) {
        third.value = -1;
    }

    // console.log(second.value)
    third.value++;

    // console.log(third.value)
};

const gradientActiveLeft = ref(false);
const prev_photo = () => {
    gradientActiveLeft.value = !gradientActiveLeft.value;
    console.log(gradientActiveLeft.value);
    setTimeout(() => (gradientActiveLeft.value = !gradientActiveLeft.value), 800);
    third.value--;

    if (third.value == 0) {
        second.value = array_size.value;
        // flag.value = 1;
    }

    second.value--;

    if (second.value == 0) {
        first.value = array_size.value;
    }

    first.value--;

    if (second.value == array_size.value - 2) {
        third.value = array_size.value - 1;
        // flag.value = 1;
    }

    console.log(first.value);
    console.log(second.value);
    console.log(third.value);
};

let show = ref(true);
const c = () => {};

let circle = ref(null);
let array = [];
</script>

<template>
    <div class="wrapper-gallery">
        <div class="numbers-wrapper">
            <div v-for="i in 22" :key="i" class="numbers">{{ i }}</div>
        </div>
        <div id="gallery" class="content-gallery-wrapper">
            <div class="title-gallery-wrapper">
                <h1 class="title-gallery">
                    <span style="color: #1e66f5">#</span>ФОТОГАЛЕРЕЯ
                </h1>
                <label class="line-dashed-gallery">-------------</label>
            </div>
            <div class="content-wrapper-gallery">
                <div class="gallery-image-block">
                    <div
                        style=""
                        class="gallery-image-arrow back-image-arrow"
                        @click="prev_photo"
                    ></div>
                    <div
                        src=""
                        alt=""
                        class="gallery-image"
                        :style="{
                            backgroundImage: 'url(' + photo[first] + ')',
                        }"
                        style="left: 5%"
                    ></div>
                    <div
                        src=""
                        alt=""
                        class="gallery-image main-image-gallery"
                        :style="{
                            backgroundImage: 'url(' + photo[second] + ')',
                        }"
                        style="left: 24%"
                    ></div>
                    <div
                        src=""
                        alt=""
                        class="gallery-image"
                        :style="{
                            backgroundImage: 'url(' + photo[third] + ')',
                        }"
                        style="right: 5%"
                    ></div>
                    <div
                        class="gallery-image-arrow next-image-arrow"
                        @click="next_photo"
                    ></div>
                </div>
                <!-- @click="$emit('next_photo')" -->
                <div
                    class="line-gradient"
                    :class="{
                        'gradient-active': gradientActive,
                        'gradient-active-left': gradientActiveLeft,
                    }"
                ></div>
                <!-- <div  class="gallery-circle-block">
          <div @click="c" ref="circle"class="circle_gallery" v-for="i in 6" ></div>
        </div> -->
            </div>
        </div>
    </div>
</template>

<style scoped>
.line-gradient {
    height: 2px;
    width: 300px;
    /* background-color: #1e66f5; */
    /* background: linear-gradient(to right, red, yellow); */
    background: linear-gradient(-45deg, #ccc, #1f1f1f, #1f1f1f);
    background-size: 400% 400%;
}
.gradient-active-left {
    animation: gradient-left 1s ease;
}
.gradient-active {
    /* animation: gradientAnimation 0.5s ease forwards; */
    animation: gradient 1s ease;
}
@keyframes gradient {
    0% {
        background-position: 0% 0%;
    }
    50% {
        background-position: -100% 0%;
    }
    100% {
        background-position: 0% 0%;
    }
}
@keyframes gradient-left {
    0% {
        background-position: -100% 0%;
    }
    50% {
        background-position: 0% 0%;
    }
    100% {
        background-position: -100% 0%;
    }
}
@keyframes gradientAnimation {
    0% {
        background: linear-gradient(to right, red, yellow);
    }
    50% {
        background: linear-gradient(to right, red, yellow);
    }
    100% {
        background: linear-gradient(to left, red, yellow);
    }
}
.gallery-image-arrow:hover {
    filter: brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(3534%)
        hue-rotate(146deg) brightness(122%) contrast(120%);
    cursor: pointer;
}
.circle_gallery_active {
    width: 16px;
    height: 16px;
    border-radius: 100%;
    margin-right: 5px;
    background-color: blue;
}
.circle_gallery {
    width: 16px;
    height: 16px;
    border-radius: 100%;
    border: 1px solid white;
    margin-right: 5px;
    background-color: transparent;
}
.gallery-circle-block {
    width: auto;
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
    width: 500px;
    height: 360px;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    opacity: 0.33;
}
.back-image-arrow {
    background-image: url('../../assets/PrepodavateliKafedri/arrow_back.svg');
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
    background-image: url('../../assets/PrepodavateliKafedri/arrow_next.svg');
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
    height: 450px;
    /* margin-top: 30px; */
    position: relative;
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
    left: -85px;
    font-size: 48px;
    font-weight: 500;
    color: white;
    letter-spacing: 8px;
    user-select: none;
}
.main-image-gallery {
    width: 750px;
    height: 500px;
    z-index: 99;
    opacity: 1;
    transition: 0.3s ease;
}
.main-image-gallery:hover {
    transform: scale(1.35);
}
</style>
