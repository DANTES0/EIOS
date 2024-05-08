<script setup>
    import {ref, computed} from "vue"
    import CustomCheckbox from "./CustomCheckbox.vue"
    import VueDatePicker from '@vuepic/vue-datepicker'
    import '@vuepic/vue-datepicker/dist/main.css'

    const dateStart = ref(new Date().setMonth(new Date().getMonth() - 1))
    const dateEnd = ref(new Date())

    const format = (date) => {
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

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
    ])

    const selectedCategories = ref(Array(categories.value.length).fill(false));

    const isShowFilters = ref(true)
    const isShowCategories = ref(true)
    const isShowData = ref(true)

    const filtersContentHeight = computed(() => {
        let height = 0
        if (!isShowData.value && !isShowCategories.value) {
            height += 60
        }
        else if (isShowData.value && !isShowCategories.value) {
            height += 213
        }
        else if (!isShowData.value && isShowCategories.value) {
            height += 391
        }
        else if (isShowData.value && isShowCategories.value) {
            height += 543.5
        }
        return height
    })

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
        <img src="../../assets/header/NewsFilters/filter-square.svg" alt=""/>
        <label class="dropdown-button-text"> Фильтры </label>
    </div>

    <!-- фильтры -->
    <div v-if="isShowFilters" class="filters">
        <div class="filters-line" :style="{ height: filtersContentHeight + 'px' }"></div>

        <div class="filters-content"> 

            <!-- кнопка отрытия категорий -->
            <div @click="showCategories" class="dropdown-button">
                <img class="arrow-down-button" src="../../assets/header/arrow_down.svg" alt="" :class="{ 'rotated': isShowCategories }"/>
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
            <div @click="showData" class="dropdown-button" id="showDataButton">
                <img class="arrow-down-button" src="../../assets/header/arrow_down.svg" alt="" :class="{ 'rotated': isShowData }"/>
                <label class="dropdown-button-text"> Дата </label>
            </div>

            <!-- дата -->
            <div v-if="isShowData" class="data">
                <div class="data-line"></div>
                <div class="data-content">
                     <span class="data-start">С</span>
                     <VueDatePicker v-model="dateStart" 
                        dark 
                        :enable-time-picker="false" 
                        :format="format" 
                        locale="ru" 
                        cancel-text="Отмена" 
                        select-text="Выбрать" 
                        input-class-name="datapicker-input"
                        calendar-class-name="dp-custom-calendar"
                        calendar-cell-class-name="dp-custom-cell"
                        hide-input-icon>

                        <!-- убрать предварительную дату -->
                        <template #action-preview="">
                        </template>

                    </VueDatePicker>

                     <span class="data-end">По</span>
                     <VueDatePicker v-model="dateEnd" 
                        dark 
                        :enable-time-picker="false" 
                        :format="format" 
                        locale="ru" 
                        cancel-text="Отмена" 
                        select-text="Выбрать" 
                        input-class-name="datapicker-input"
                        calendar-class-name="dp-custom-calendar"
                        calendar-cell-class-name="dp-custom-cell"
                        hide-input-icon>

                        <!-- убрать предварительную дату -->
                        <template #action-preview="">
                        </template>

                    </VueDatePicker>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    @font-face {
        font-family: Nunito;
        src: url("../../assets/Nunito.ttf");
    }

    :root {
        --blue-color: rgb(0, 84, 255);
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
        background-color: var(--blue-color);
    }
    .data-line {
        margin-left: 21.5px;
        width: 1px;
        height: 148px;
        background-color: var(--blue-color);
    }


    /* стили для кнопки */
    .dropdown-button {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer; 
        user-select: none;
    }
    #showDataButton {
        margin-top:5px;
    }
    .dropdown-button:hover {
        filter: brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(100%)
            hue-rotate(146deg) brightness(100%) contrast(100%);
    }
    .dropdown-button img {
        padding-left: 10px;
    }
    .dropdown-button-text {
        color: #cccccc;
        font-family: Nunito;
        font-weight: 200;
        font-size: 16px;
        cursor: pointer;
        margin-left: 4px;
    }


    /* стили для контейнеров */
    .filters {
        margin-top: 3px;
        display: flex;
        min-width: 161px;
    }

    .categories {
        display: flex;
        min-width: 160px;
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


    /* стили для даты */
    .data {
        display: flex;
    }

    .data-content {
        margin-left: 16px;
        display:flex;
        flex-direction: column;
        gap:10px;
    }

    .data-content span {
        color: #cccccc;
        font-family: Nunito;
        font-weight: 200;
        font-size: 16px;
    }

    .datapicker-input {
        color: #cccccc;
        font-family: Rubik;
        font-size: 16px;
        font-weight: 300;
        width:156px;
        height:37px;
        border-radius: 0px;
    }

    .datapicker-input:hover {
        border-color: var(--blue-color);
    }

    .dp-custom-calendar .dp__calendar_item {
        font-family: Rubik;
    }

    .dp-custom-cell:hover {
        background-color: var(--blue-color);
    }

    .dp__theme_dark {
        --dp-primary-color: var(--blue-color);
        --dp-text-color: #cccccc;
        --dp-secondary-color: #787878;
        --dp-border-color: rgb(128, 128, 128);
    }

    :root {
        --dp-font-family: Nunito;
        --dp-font-size: 0.75rem;
        --dp-border-radius: 0px;
        --dp-cell-border-radius: 0px;
        --dp-cell-size: 30px;
        --dp-menu-min-width: 225px;
    }

    .dp__action_button {
        --dp-action-button-height: 25px;
    }

    .arrow-down-button {
        transform-origin: 65% 50%;
        width:25px;
        transform: rotate(-90deg);
        transition: transform 0.25s ease;
    }

    .rotated {
        transform: rotate(0deg);
    }
</style>