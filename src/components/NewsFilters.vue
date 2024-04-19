<script setup>
    import {ref} from "vue"
    import CustomCheckbox from "./CustomCheckbox.vue"

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
                    <div class="category-checkbox">
                        <CustomCheckbox  :label="`Конференции`" v-model="isSelected"  />
                        <!-- <input type="checkbox" id="important" v-model="important" /> -->
                        <!-- <label for="important"> Конференции </label> -->
                    </div>
                    <div class="category-checkbox">
                        <input type="checkbox" id="important" v-model="important" />
                        <label for="important"> Конкурсы, гранты </label>
                    </div>
                    <div class="category-checkbox">
                        <input type="checkbox" id="important" v-model="important" />
                        <label for="important"> Мероприятия </label>
                    </div>
                    <div class="category-checkbox">
                        <input type="checkbox" id="important" v-model="important" />
                        <label for="important"> Наука </label>
                    </div>
                    <div class="category-checkbox">
                        <input type="checkbox" id="important" v-model="important" />
                        <label for="important"> Достижения </label>
                    </div>
                    <div class="category-checkbox">
                        <input type="checkbox" id="important" v-model="important" />
                        <label for="important"> Спорт </label>
                    </div>
                    <div class="category-checkbox">
                        <input type="checkbox" id="important" v-model="important" />
                        <label for="important"> Конференции организаций </label>
                    </div>
                    <div class="category-checkbox">
                        <input type="checkbox" id="important" v-model="important" />
                        <label for="important"> Объявления </label>
                    </div>
                    <div class="category-checkbox">
                        <input type="checkbox" id="important" v-model="important" />
                        <label for="important"> Приемная комиссия </label>
                    </div>
                    <div class="category-checkbox">
                        <input type="checkbox" id="important" v-model="important" />
                        <label for="important"> Другие </label>
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
    /* .dropdown-content-a {
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
    } */
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
        color: rgb(134, 134, 134);
        font-family: Nunito;
        font-size: 14px;
        font-weight: 300;
        text-align: left;

        display:flex;
        align-items:center;
        margin-left: 12px;
        
        cursor: pointer;
    }
    .category-checkbox label {
        margin-left: 10px;
        user-select: none;
        cursor: pointer;
    }
    .category-checkbox input {
        cursor: pointer;
    }
    .category-checkbox:hover {
        color: #ddd;
    }

</style>