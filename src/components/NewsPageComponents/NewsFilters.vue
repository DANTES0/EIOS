<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import CustomCheckbox from './CustomCheckbox.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import { useRouter, useRoute } from 'vue-router';
import '@vuepic/vue-datepicker/dist/main.css';

const dateStart = ref(null);
const dateEnd = ref(null);

const dateStartURL = ref(null);
const dateEndURL = ref(null);

const categories = ref([
    'Важные',
    'Конференции',
    'Конкурсы, гранты',
    'Мероприятия',
    'Наука',
    'Достижения',
    'Спорт',
    'Конференции орг.',
    'Объявления',
    'Приемная комиссия',
    'Другие',
]);

const selectedCategories = ref(Array(categories.value.length).fill(false));

const isShowFilters = ref(true);
const isShowCategories = ref(true);
const isShowData = ref(true);

const router = useRouter();
const route = useRoute();

const filtersContentHeight = computed(() => {
    let height = 0;

    if (!isShowData.value && !isShowCategories.value) {
        height += 60;
    } else if (isShowData.value && !isShowCategories.value) {
        height += 213;
    } else if (!isShowData.value && isShowCategories.value) {
        height += 391;
    } else if (isShowData.value && isShowCategories.value) {
        height += 543.5;
    }

    return height;
});

function showFilters() {
    isShowFilters.value = !isShowFilters.value;
}

function showCategories() {
    isShowCategories.value = !isShowCategories.value;
}

function showData() {
    isShowData.value = !isShowData.value;
}

function applyFilters() {
    const selectedCategoriesNames = selectedCategories.value
        .map((isChecked, index) => (isChecked ? categories.value[index] : null))
        .filter((category) => category !== null)
        .join(';');

    const query = {};

    if (dateStartURL.value != null) {
        query.startDate = dateStartURL.value;
    }

    if (dateEndURL.value != null) {
        query.endDate = dateEndURL.value;
    }

    if (selectedCategoriesNames !== '') {
        query.categories = selectedCategoriesNames;
    }

    router.push({ name: 'NewsPage', query }).catch((err) => console.error(err));
}

const handleStartDate = (modelData) => {
    dateStart.value = modelData;
    dateStartURL.value = formatDateDots(modelData);
    applyFilters();
};

const handleEndDate = (modelData) => {
    dateEnd.value = modelData;
    dateEndURL.value = formatDateDots(modelData);
    applyFilters();
};

watch(
    selectedCategories,
    () => {
        applyFilters();
    },
    { deep: true },
);

onMounted(() => {
    loadFiltersFromUrl();
    router.afterEach(loadFiltersFromUrl);
});

function loadFiltersFromUrl() {
    const query = route.query;

    if (query.startDate) {
        dateStart.value = parseDate(query.startDate);
        dateStartURL.value = formatDateDots(dateStart.value);
    }

    if (query.endDate) {
        dateEnd.value = parseDate(query.endDate);
        dateEndURL.value = formatDateDots(dateEnd.value);
    }

    if (query.categories) {
        const selectedCategoriesArray = query.categories.split(';');

        for (let i = 0; i < selectedCategoriesArray.length; i++) {
            const category = selectedCategoriesArray[i];
            const index = categories.value.indexOf(category);

            if (index !== -1) {
                selectedCategories.value[index] = true;
            }
        }
    } else {
        selectedCategories.value.fill(false);
    }
}

function formatDateDots(date) {
    if (date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    } else {
        return null;
    }
}

function parseDate(dateStr) {
    const [day, month, year] = dateStr.split('.').map(Number);

    return new Date(year, month - 1, day);
}
</script>

<template>
    <!-- кнопка отрытия фильтров -->
    <div class="dropdown-button" @click="showFilters">
        <img src="../../assets/header/NewsFilters/filter-square.svg" alt="" />
        <label class="dropdown-button-text"> Фильтры </label>
    </div>

    <!-- фильтры -->
    <div v-if="isShowFilters" class="filters">
        <div class="filters-line" :style="{ height: filtersContentHeight + 'px' }"></div>

        <div class="filters-content">
            <!-- кнопка отрытия категорий -->
            <div class="dropdown-button" @click="showCategories">
                <img
                    class="arrow-down-button"
                    src="../../assets/header/arrow_down.svg"
                    alt=""
                    :class="{ rotated: isShowCategories }"
                />
                <label class="dropdown-button-text"> Категории </label>
            </div>

            <!-- категории -->
            <div v-if="isShowCategories" class="categories">
                <div class="categories-line"></div>
                <div class="categories-content">
                    <div v-for="(category, index) in categories" :key="index">
                        <CustomCheckbox
                            v-model="selectedCategories[index]"
                            :label="category"
                            class="categories-content-item"
                        />
                    </div>
                </div>
            </div>

            <!-- кнопка отрытия даты -->
            <div id="showDataButton" class="dropdown-button" @click="showData">
                <img
                    class="arrow-down-button"
                    src="../../assets/header/arrow_down.svg"
                    alt=""
                    :class="{ rotated: isShowData }"
                />
                <label class="dropdown-button-text"> Дата </label>
            </div>

            <!-- дата -->
            <div v-if="isShowData" class="data">
                <div class="data-line"></div>
                <div class="data-content">
                    <span class="data-start">С</span>
                    <VueDatePicker
                        v-model="dateStart"
                        dark
                        :enable-time-picker="false"
                        :format="format"
                        locale="ru"
                        cancel-text="Отмена"
                        select-text="Выбрать"
                        input-class-name="datapicker-input"
                        calendar-class-name="dp-custom-calendar"
                        calendar-cell-class-name="dp-custom-cell"
                        hide-input-icon
                        @update:model-value="handleStartDate"
                    >
                        <!-- убрать предварительную дату -->
                        <template #action-preview=""> </template>
                    </VueDatePicker>

                    <span class="data-end">По</span>
                    <VueDatePicker
                        v-model="dateEnd"
                        dark
                        :enable-time-picker="false"
                        :format="format"
                        locale="ru"
                        cancel-text="Отмена"
                        select-text="Выбрать"
                        input-class-name="datapicker-input"
                        calendar-class-name="dp-custom-calendar"
                        calendar-cell-class-name="dp-custom-cell"
                        hide-input-icon
                        @update:model-value="handleEndDate"
                    >
                        <!-- убрать предварительную дату -->
                        <template #action-preview=""> </template>
                    </VueDatePicker>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
    background-color: rgb(0, 84, 255);
}
.data-line {
    margin-left: 21.5px;
    width: 1px;
    height: 148px;
    background-color: rgb(0, 84, 255);
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
    margin-top: 5px;
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
    display: flex;
    flex-direction: column;
    gap: 10px;
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
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.data-content span {
    color: #cccccc;
    font-family: Nunito;
    font-weight: 200;
    font-size: 16px;
}

:deep(.datapicker-input) {
    color: #cccccc;
    font-family: Rubik;
    font-size: 16px;
    font-weight: 300;
    width: 156px;
    height: 37px;
    border-radius: 0px;
}

:deep(.datapicker-input:hover) {
    border-color: rgb(0, 84, 255);
}

:deep(.dp-custom-calendar .dp__calendar_item) {
    font-family: Rubik;
}

:deep(.dp-custom-cell:hover) {
    background-color: rgb(0, 84, 255);
}

:deep(.dp__action_button) {
    --dp-action-button-height: 25px;
}

.arrow-down-button {
    transform-origin: 65% 50%;
    width: 25px;
    transform: rotate(-90deg);
    transition: transform 0.25s ease;
}

.rotated {
    transform: rotate(0deg);
}
</style>
