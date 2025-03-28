<script setup>
import { ref, computed, watch } from 'vue';
import { useFetch } from '@vueuse/core';
import { onMounted } from 'vue';
// import Vuex from "vuex"
// import Vuex from "vuex"
// import { useStore } from "vuex";
import 'vue3-select-component/dist/style.css';
import VueSelect from 'vue3-select-component';
import Multiselect from '@vueform/multiselect';
import eventBus from '../../eventBus.js';
import config from '../../config.js';
import VTimetableInput from '../UX/VTimetableInput.vue';
import SearchPrepod from '../PrepodavateliPageComponents/SearchPrepod.vue';
import router from '../../router/routes.js';

let options = ['1', '2', '3'];
let array = ref([]);
let array2 = ref([]);
const selectedItem = ref({ name: '', id: '', type: '' });

watch(selectedItem, (item) => {
    router.push({ name: 'TeacherDetail', params: { id: item.id } });
});

const teacherUrl = computed(() => {
    return `${config.ServerURL}/api/v1/teacher?`;
});
let placeholder = ref('Поиск...');
const fetchGroup = async () => {

    const responseTeacher = await useFetch(
        teacherUrl.value +
            new URLSearchParams({ pageSize: 999, pageNumber: 0 }).toString(),
    ).json();

    console.log(responseTeacher.data.value);

    for (let i = 0; i < responseTeacher.data.value.data.length; i++) {
        array2.value.push({
            name: getShortName(responseTeacher.data.value.data[i].name),
            fullName: responseTeacher.data.value.data[i].name,
            id: `${responseTeacher.data.value.data[i].id}`,
            type: 'teacher',
        });
    }

    console.log(array.value);
};

function getShortName(fullName) {
    // Разбиваем полное имя на части
    const nameParts = fullName.split(' ');

    // Проверяем, что количество частей соответствует Фамилия Имя Отчество
    if (nameParts.length === 3) {
        const [lastName, firstName, middleName] = nameParts;

        // Формируем сокращенное имя
        return `${lastName} ${firstName[0]}.${middleName[0]}.`;
    }

    // В случае некорректного формата возвращаем исходное имя
    return fullName;
}

onMounted(() => {
    fetchGroup();
    // console.log(currentNews.value)
});


const temp = ref('');

function onSelectedItemChange(item) {
    selectedItem.value = item; // Обновляем объект целиком

    const lessonsData = [item.id, item.type];

    eventBus.emit('optionSelected', lessonsData); // Вызываем событие
}
</script>

<template>
    <div class="search-timetable-wrap">
        <!-- <div class="search-timetable-text">Поиск по группе <br />или преподавателю</div> -->
        <!-- <Multiselect
        v-model="value"
      placeholder="Select your character"
      label="name"
      trackBy="name"
      :options="options"
      :searchable="true"
    /> -->

        <div class="input-search w-[80%] ml-[22px] mt-[10px]">
            <search-prepod
                v-model="selectedItem.name"
                :items="array"
                :items2="array2"
                :type-input="'stairsInput'"
                @update:model-value="onSelectedItemChange"
            />

            <!-- <VueSelect
                v-model="selected"
                :placeholder="placeholder"
                :options="array"
                @option-selected="handleOptionSelected"
            >
                <template #no-options> По вашему запросу ничего не найдено </template>
            </VueSelect> -->
            <!-- <input placeholder="Поиск..." type="" class="input-search-input">
        <select class="select-input" name="" id="">
            <option value=""></option>
        </select> -->
        </div>
        <div class="h-4"></div>
    </div>
</template>

<!-- src="@vueform/multiselect/themes/default.css" -->
<style scoped>
@font-face {
    font-family: JetBrainsMono;
    src: url('../../assets/JetBrainsMono.ttf');
}
.dropdown-icon {
    width: 100px;
}
:root {
    --vs-input-placeholder-color: #5c5c5c;
    --vs-input-bg: transparent;
    --vs-input-outline: #e4e4e7;
    --vs-border: 1px solid #e4e4e7;
    --vs-border-radius: 0;
    --vs-text-color: #e4e4e7;
    --vs-font-weight: 200;
    --vs-line-height: 1;
    --vs-font-family: JetBrainsMono;

    /* Для option */
    /* --vs-menu-bg: transparent; */
    --vs-menu-bg: #181818;
    --vs-option-hover-color: #363535;
    --vs-option-focused-color: transparent;
    --vs-option-selected-color: #363535;

    --vs-multi-value-xmark-color: #e4e4e7;

    --vs-icon-color: #ff0000;
    --vs-icon-size: 20px;
    /* --vs-font-family: JetBrainsMono; */
}
:deep(.no-results) {
    color: white;
}
:deep(.vue-select) {
    font-family: JetBrainsMono;
    background-color: transparent;
    width: 220px;
    margin-top: 30px;
    z-index: 0;
    position: static;
}
:deep(.search-input) {
    color: #ffffff;
    background-color: transparent;
    -webkit-input-placeholder: #5c5c5c;
}
:deep(.search-input::placeholder) {
    color: #a7a7a7;
}
:deep(.control) {
    background-color: transparent;
}
:deep(.control.focused) {
    background-color: transparent;
    border-color: #1e66f5;
    /* box-shadow: #b3b3b3; */
}
:deep(.dropdown-icon svg) {
    fill: #e4e4e7;
}
:deep(.clear-button svg) {
    fill: transparent;
}
:deep(.single-value) {
    color: #ffffff;
    z-index: 0;
}
:deep(.menu) {
    background-color: transparent;
    border: 1px solid #1e66f5;
    position: static;
}
:deep(.menu-option) {
    background-color: #181818;
    color: white;
}
:deep(.menu-option:hover) {
    background-color: #5c5c5c;
}
:deep(.menu-option.focused) {
    background-color: transparent;
}
:deep(.menu-option.selected) {
    background-color: #5c5c5c;
}
.select-input {
    height: 26px;
    border: 1px solid white;
    background-color: transparent;
}
.input-search-input {
    background-color: transparent;
    border: 1px solid white;
    width: 186px;
    height: 26px;
    outline: none;
    color: white;
    padding-left: 8px;
}
.input-search {
}
.search-timetable-wrap {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}
.search-timetable-text {
    font-family: Nunito;
    line-height: 1.2rem;
    color: #ccc;
    font-size: 1rem;
    font-weight: 300;
    margin-left: 22px;
}
</style>
