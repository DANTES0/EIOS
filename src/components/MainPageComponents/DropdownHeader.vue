<script setup>
import { ref } from 'vue';
import IconBase from '../Icons/IconBase.vue';
import IconHtml from '../Icons/Icon/IconHtml.vue';
import IconCss from '../Icons/Icon/IconCss.vue';
import IconPy from '../Icons/Icon/IconPy.vue';
import IconC from '../Icons/Icon/IconC.vue';
import IconJs from '../Icons/Icon/IconJs.vue';
import IconTs from '../Icons/Icon/IconTs.vue';

const isShowDropDown = ref(true);

function showDropDown() {
    isShowDropDown.value = !isShowDropDown.value;
}
</script>

<template>
    <div class="drop-btn-container" @click="showDropDown">
        <img
            src="../../assets/header/arrow_down.svg"
            alt=""
            class="arrow_down aspect-square w-[2vw] desktop:w-[24px]"
            :class="{ rotated: isShowDropDown }"
        />
        <img
            src="../../assets/header/folder.svg"
            alt=""
            class="w-[1.8vw] desktop:w-[24px] aspect-square"
        />
        <label id="dropbtn" class="dropbtn text-[1.3vw] text-white dark:text-[#cccccc]">
            Главная страница
        </label>
    </div>
    <Transition name="slide-fade">
        <div v-if="isShowDropDown" id="myDropdown" class="dropdown-content">
            <div class="dropdown-content-line"></div>
            <div
                class="dropdown-content-content text-white dark:text-[#cccccc] text-[0.95vw] desktop:text-[18px]"
            >
                <a href="#kafedra" class="dropdown-content-a">
                    <img
                        src="../../assets/anchor_header/html.svg"
                        alt=""
                        class="anchor-img"
                        style="transform: scale(0.7)"
                    />

                    <label class="label">о_кафедре.html</label>
                </a>
                <a href="#news" class="dropdown-content-a">
                    <img
                        src="../../assets/anchor_header/css.svg"
                        alt=""
                        class="anchor-img"
                    />

                    <label class="label">главные_новости.css</label>
                </a>
                <a href="#prepod" class="dropdown-content-a">
                    <img
                        src="../../assets/anchor_header/py.svg"
                        alt=""
                        class="anchor-img"
                    />

                    <label class="label">работники_кафедры.py</label>
                </a>
                <a href="#cifri" class="dropdown-content-a">
                    <img
                        src="../../assets/anchor_header/c++.svg"
                        alt=""
                        class="anchor-img"
                        style="transform: scale(1.4)"
                    />

                    <label class="label">кафедра_в_цифрах.cpp</label>
                </a>
                <a href="#gallery" class="dropdown-content-a">
                    <img
                        src="../../assets/anchor_header/js.svg"
                        alt=""
                        class="anchor-img"
                    />

                    <label class="label">фотогалерея.js</label>
                </a>
                <a href="#footer" class="dropdown-content-a">
                    <img
                        src="../../assets/anchor_header/ts.svg"
                        alt=""
                        class="anchor-img"
                        style="transform: scale(0.7)"
                    />

                    <label class="label">контакты.ts</label>
                </a>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.dropdown-content-content {
    /* margin-left: 10px; */
}
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}

.label {
    margin-left: 7px;
    cursor: pointer;
}
.anchor-img {
    width: 1.4vw;
    margin-left: 1.8vw;
}
@media (min-width: 1920px) {
    .anchor-img {
        width: 23px;
        height: 23px;
        margin-left: 1.8vw;
    }
}
.dropdown-content-line {
    margin-left: 21px;
    width: 2px;
    height: calc(28px * 6 + 10px);
    background-color: #787878;
}
.arrow_down {
    /* padding-left: 10px; */
    margin-left: 10px;
    transform: rotate(-90deg);
    transition: 0.3s ease;
    /* aspect-ratio: 1;
    width: 2vw; */
}

.arrow_down:hover,
.arrow_down:focus {
    filter: brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(3534%)
        hue-rotate(146deg) brightness(122%) contrast(120%);
}
.rotated {
    transform: rotate(0deg);
}
.drop-btn-container {
    display: flex;
    /* justify-content: space-between; */
    gap: 7px;
    align-items: center;
    flex-direction: row;
}
.dropbtn {
    /* color: #cccccc; */
    font-family: Nunito;
    font-weight: 200;
    font-size: 1.2vw;
    border: none;
    cursor: pointer;
    /* padding-right: 56px; */
    user-select: none;
}

.dropbtn:hover,
.dropbtn:focus {
    color: #ffffff;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
    align-items: center;
    background-color: transparent;
    min-width: 160px;
    overflow: hidden;
    z-index: 99;
}

.dropdown-content-a {
    /* width: 220px; */
    height: 32px;
    display: flex;
    /* flex-direction: row;
    justify-content: start;*/
    align-items: center;
    /* color: #cccccc; */
    /* padding-bottom: 7px; */
    text-decoration: none;
    font-family: Nunito;
    font-weight: 200;

    /* margin-right: 15px; */
    cursor: pointer;
}

@media screen and (min-width: 1921px) {
    .dropdown-content-a {
        height: 1.4vw;
    }
}
d .dropdown-content-a:hover {
    color: #ffffff;
    background-color: #1f1f21;
}

.dropdown-content-a:hover {
    color: #ddd;
}

.show {
    display: block;
}
</style>
