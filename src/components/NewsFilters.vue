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
        if (!isShowData.value && !isShowCategories.value) {
            height += 58
        }
        else if (isShowData.value && !isShowCategories.value) {
            height += 180
        }
        else if (!isShowData.value && isShowCategories.value) {
            height += 388
        }
        else if (isShowData.value && isShowCategories.value) {
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
    <!-- кнопка отрытия фильтров -->
    <div @click="showFilters" class="dropdown-button">
        <img src="../assets/header/NewsFilters/filter-square.svg" alt=""/>
        <label class="dropdown-button-text"> Фильтры </label>
    </div>

    <!-- фильтры -->
    <div v-if="isShowFilters" class="filters">
        <div class="filters-line" :style="{ height: filtersContentHeight + 'px' }"></div>

        <div class="filters-content"> 

            <!-- кнопка отрытия категорий -->
            <div @click="showCategories" class="dropdown-button">
                <img src="../assets/header/arrow_down.svg" alt=""/>
                <label class="dropdown-button-text" > Категории </label>
            </div>

            <!-- категории -->
            <div v-if="isShowCategories" class="categories">
                <div class="categories-line"></div>
                <div class="categories-content">
                    <div class="categories-content-item" v-for="(category, index) in categories" :key="index">
                        <CustomCheckbox :label="category" v-model="selectedCategories[index]" />
                    </div>
                </div>
            </div>

            <!-- кнопка отрытия даты -->
            <div @click="showData" class="dropdown-button">
                <img src="../assets/header/arrow_down.svg" alt=""/>
                <label class="dropdown-button-text"> Дата </label>
            </div>

            <!-- дата -->
            <div v-if="isShowData" class="data">
                <div class="data-line"></div>
            </div>

        </div>
        
    </div>
</template>

<style>
    @font-face {
        font-family: Nunito;
        src: url("../assets/Nunito.ttf");
    }

    /* стили для линий */
    .filters-line {
        margin-left: 22px;
        width: 1px;
        background-color: #787878;
    }
    .categories-line {
        margin-left: 21.5px;
        width: 1px;
        height: 330px;
        background-color: rgb(0, 84, 255);;
    }
    .data-line {
        margin-left: 21.5px;
        width: 1px;
        height: 120px;
        background-color: rgb(0, 84, 255);;
    }


    /* стили для кнопки */
    .dropdown-button {
        display: flex;
        justify-content: flex-start;
        cursor: pointer; 
        user-select: none;
    }
    .dropdown-button:hover {
        filter: brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(100%)
            hue-rotate(146deg) brightness(100%) contrast(100%);
        color: #ffffff;
    }
    .dropdown-button img {
        padding-left: 10px;
    }
    .dropdown-button-text {
        color: #cccccc;
        font-family: Nunito;
        font-weight: 200;
        font-size: 16px;
        border: none;
        cursor: pointer;
        margin-left: 4px;
    }


    .filters {
        margin-top: 3px;
        display: flex;
        min-width: 161px;
    }

    .categories {
        display: flex;
        min-width: 160px;
        overflow: auto;
        z-index: 99;
    }

    .categories-content {
        margin-top: 10px;
        display:flex;
        flex-direction: column;
        gap:10px;
    }

    .categories-content-item {
        margin-left: 12px;
    }
</style>