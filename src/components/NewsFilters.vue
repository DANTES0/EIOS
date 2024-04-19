<script setup>
    import {ref} from "vue"
    import CustomCheckbox from "./CustomCheckbox.vue"

    const categories = ref([
        "Конференции",
        "Конкурсы, гранты",
        "Мероприятия",
        "Наука",
        "Достижения",
        "Спорт",
        "Конференции орг.",
        "Объявления",
        "Приемная комиссия",
        "Другие"
    ]);

    const selectedCategories = ref(Array(categories.value.length).fill(false));

    const isShowFilters = ref(null)
    const isShowCategories = ref(null)

    function showFilters() {
        isShowFilters.value = !isShowFilters.value
        isShowCategories.value = false
    } 

    function showCategories() {
        isShowCategories.value = !isShowCategories.value
    } 
</script>
<template>
    <div @click="showFilters" class="drop-btn-container">
        <img src="../assets/header/NewsFilters/filter-square.svg" alt="" id="arrow_down" />
        <label class="dropbtn" id="dropbtn"> Фильтры </label>
    </div>

    <div v-if="isShowFilters" id="myDropdown" class="dropdown-content">
        <div class="dropdown-content-line"></div>
        <div class="dropdown-content-content">
            <div @click="showCategories" class="drop-btn-container">
                <img src="../assets/header/arrow_down.svg" alt="" id="arrow_down" />
                <label class="dropbtn" id="dropbtn"> Категории </label>
            </div>
            <div v-if="isShowCategories" id="categoriesDropdown" class="categories-dropdown-content">
                <div class="dropdown-content-line"></div>
                <div class="categories-dropdown-content-checkboxes">
                    <div class="category-checkbox" v-for="(category, index) in categories" :key="index">
                        <CustomCheckbox :label="category" v-model="selectedCategories[index]" />
                    </div>
                </div>
            </div>

            <div>
                <a href="#kafedra" class="dropdown-content-a">
                    <img
                    src="../assets/anchor_header/html.svg"
                    alt=""
                    class="anchor-img"
                    style="transform: scale(0.7)"
                    />
                    <label class="label">о_кафедре.html</label></a
                >
                <a href="#news" class="dropdown-content-a">
                    <img
                    src="../assets/anchor_header/css.svg"
                    alt=""
                    class="anchor-img"
                    />
                    <label class="label">главные_новости.css</label>
                </a>
                <a href="#prepod" class="dropdown-content-a">
                    <img src="../assets/anchor_header/py.svg" alt="" class="anchor-img" />
                    <label class="label">работники_кафедры.py</label></a
                >
                <a href="#cifri" class="dropdown-content-a">
                    <img
                    src="../assets/anchor_header/c++.svg"
                    alt=""
                    class="anchor-img"
                    />
                    <label class="label">кафедра_в_цифрах.cpp</label> </a
                ><a href="#gallery" class="dropdown-content-a">
                    <img src="../assets/anchor_header/js.svg" alt="" class="anchor-img" />
                    <label class="label">фотогалерея.js</label></a
                >
                <a href="#footer" class="dropdown-content-a">
                    <img
                    src="../assets/anchor_header/ts.svg"
                    alt=""
                    class="anchor-img"
                    style="transform: scale(0.7)"
                    />
                    <label class="label">контакты.ts</label>
                </a>
            </div>
        </div>
    </div>
</template>
<style>
    @font-face {
        font-family: Nunito;
        src: url("../assets/Nunito.ttf");
    }
    .label {
        margin-left: 7px;
        cursor: pointer;
        user-select: none;
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
    #arrow_down {
        padding-left: 10px;
    }
    #arrow_down:hover, #arrow_down:focus {
        filter: brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(3534%)
            hue-rotate(146deg) brightness(122%) contrast(120%);
    }
    .drop-btn-container {
        display: flex;
        justify-content: flex-start;
        cursor: pointer;
        user-select: none;
    }
    .dropbtn {
        color: #cccccc;
        font-family: Nunito;
        font-weight: 200;
        font-size: 16px;
        border: none;
        cursor: pointer;
        margin-left: 4px;
    }
    .drop-btn-container:hover{
        filter: brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(3534%)
            hue-rotate(146deg) brightness(122%) contrast(120%);
        color: #ffffff;
    }
    .dropdown {
        position: relative;
        display: inline-block;
    }
    .dropdown-content {
        margin-top: 3px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: transparent;
        min-width: 160px;
        overflow: auto;
        z-index: 99;
    }
    
    .show {
        display: block;
    }
    
    .categories-dropdown-content {
        margin-top: 3px;
        display: flex;
        min-width: 160px;
        overflow: auto;
        z-index: 99;
    }

    .category-checkbox {
        display:flex;
        align-items:center;
        margin-left: 12px;
        cursor: pointer;
    }

</style>