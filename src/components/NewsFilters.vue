<script setup>
    import {ref, computed} from "vue"
    import CustomCheckbox from "./CustomCheckbox.vue"

    const categories = ref([
        "Важные",
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

    const isShowFilters = ref(false)
    const isShowCategories = ref(false)
    const isShowData = ref(false)

    const filtersContentHeight = computed(() => {
        let height = 0
        // if (isShowCategories.value) {
        //     height += 380
        // }
        // if (isShowData.value) {
        //     height += 130
        // }
        if (isShowData.value == false && isShowCategories.value == false) {
            height += 58
        }
        if (isShowData.value == true && isShowCategories.value == false) {
            height += 180
        }
        if (isShowData.value == false && isShowCategories.value == true) {
            height += 388
        }
        if (isShowData.value == true && isShowCategories.value == true) {
            height += 508
        }
        return height
    });

    function showFilters() {
        isShowFilters.value = !isShowFilters.value
    } 

    function showCategories() {
        isShowCategories.value = !isShowCategories.value
    } 

    function showData() {
        isShowData.value = !isShowData.value
    } 
</script>
<template>
    <div @click="showFilters" class="drop-btn-container">
        <img src="../assets/header/NewsFilters/filter-square.svg" alt="" id="arrow_down" />
        <label class="dropbtn" id="dropbtn"> Фильтры </label>
    </div>

    <div v-if="isShowFilters" class="dropdown-content">
        <div class="filters-content-line" :style="{ height: filtersContentHeight + 'px' }"></div>

        <div class="dropdown-content-content">

            <div @click="showCategories" class="drop-btn-container">
                <img src="../assets/header/arrow_down.svg" alt="" id="arrow_down" />
                <label class="dropbtn" id="dropbtn"> Категории </label>
            </div>
            <div v-if="isShowCategories" id="categoriesDropdown" class="categories-dropdown-content">
                <div class="categories-content-line"></div>
                <div class="categories-dropdown-content-checkboxes">
                    <div class="category-checkbox" v-for="(category, index) in categories" :key="index">
                        <CustomCheckbox :label="category" v-model="selectedCategories[index]" />
                    </div>
                </div>
            </div>

            <div @click="showData" class="drop-btn-container">
                <img src="../assets/header/arrow_down.svg" alt="" id="arrow_down" />
                <label class="dropbtn" id="dropbtn"> Дата </label>
            </div>
            <div v-if="isShowData" id="dataDropdown" class="data-dropdown-content">
                <div class="data-content-line"></div>
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
    .filters-content-line {
        margin-left: 22px;
        width: 1px;
        /* высота должна меняться */
        /* height: 550px; */
        background-color: #787878;
    }
    .dropdown-content-line {
        margin-left: 22px;
        width: 2px;
        height: 200px;
        background-color: #787878;
    }
    .categories-content-line {
        margin-left: 21.5px;
        width: 1px;
        height: 330px;
        background-color: rgb(0, 84, 255);;
    }
    .data-content-line {
        margin-left: 21.5px;
        width: 1px;
        height: 120px;
        background-color: rgb(0, 84, 255);;
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
        /* display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: transparent; */
        /* min-width: 161px;
        overflow: auto;
        z-index: 99; */
    }
    
    .show {
        display: block;
    }
    
    .categories-dropdown-content {
        display: flex;
        min-width: 160px;
        overflow: auto;
        z-index: 99;
    }

    .category-checkbox {
        margin-left: 12px;
    }

    .categories-dropdown-content-checkboxes {
        margin-top: 10px;
        display:flex;
        flex-direction: column;
        gap:10px;
    }
</style>