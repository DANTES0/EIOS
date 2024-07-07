<script setup>
import { ref } from 'vue';
const isShowDropDown = ref(true);
function showDropDown() {
    isShowDropDown.value = !isShowDropDown.value;
}
</script>
<template>
    <div @click="showDropDown" class="drop-btn-container">
        <img
            src="../../assets/header/arrow_down.svg"
            alt=""
            class="arrow_down"
            :class="{ rotated: isShowDropDown }"
        />
        <img src="../../assets/header/folder.svg" alt="" class="folder" />
        <label class="dropbtn" id="dropbtn"> Главная страница </label>
    </div>
    <Transition name="slide-fade">
        <div v-if="isShowDropDown" id="myDropdown" class="dropdown-content">
            <div class="dropdown-content-line"></div>
            <div class="dropdown-content-content">
                <a href="#kafedra" class="dropdown-content-a">
                    <img
                        src="../../assets/anchor_header/html.svg"
                        alt=""
                        class="anchor-img"
                        style="transform: scale(0.7)"
                    />
                    <label class="label">о_кафедре.html</label></a
                >
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
                    <label class="label">работники_кафедры.py</label></a
                >
                <a href="#cifri" class="dropdown-content-a">
                    <img
                        src="../../assets/anchor_header/c++.svg"
                        alt=""
                        class="anchor-img"
                    />
                    <label class="label">кафедра_в_цифрах.cpp</label> </a
                ><a href="#gallery" class="dropdown-content-a">
                    <img
                        src="../../assets/anchor_header/js.svg"
                        alt=""
                        class="anchor-img"
                    />
                    <label class="label">фотогалерея.js</label></a
                >
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
<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}

@font-face {
    font-family: Nunito;
    src: url('../../assets/Nunito.ttf');
}
.label {
    margin-left: 7px;
    cursor: pointer;
}
.anchor-img {
    width: 23px;
    height: 23px;
    margin-left: 22px;
}
.dropdown-content-line {
    margin-left: 22px;
    width: 2px;
    height: 200px;
    background-color: #787878;
}
.arrow_down {
    /* padding-left: 10px; */
    margin-left: 10px;
    transform: rotate(-90deg);
    transition: 0.3s ease;
}

.arrow_down:hover,
.arrow_down:focus {
    filter: brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(3534%)
        hue-rotate(146deg) brightness(122%) contrast(120%);
}
.rotated {
    transform: rotate(90deg);
}
.drop-btn-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
}
.dropbtn {
    color: #cccccc;
    font-family: Nunito;
    font-weight: 200;
    font-size: 16px;
    border: none;
    cursor: pointer;
    padding-right: 56px;
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
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    min-width: 160px;
    overflow: hidden;
    z-index: 99;
}

.dropdown-content-a {
    width: 220px;
    height: 28px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    color: #cccccc;
    padding-bottom: 7px;
    text-decoration: none;
    font-family: Nunito;
    font-weight: 200;
    font-size: 16px;
    margin-right: 15px;
    cursor: pointer;
}
.dropdown-content-a:hover {
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
