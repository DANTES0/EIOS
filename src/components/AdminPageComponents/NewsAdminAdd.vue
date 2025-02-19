<script setup>
import NewsContentHeader from '../NewsContentPageComponents/NewsContentHeader.vue';
import { ref } from 'vue';
import 'vue3-select-component/dist/style.css';
import VueSelect from 'vue3-select-component';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import config from '../../config';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const array = ref([]);
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

for (let i = 0; i < categories.value.length; i++) {
    array.value.push({
        label: categories.value[i],
        value: categories.value[i],
    });
}

const placeholder = ref('Категория');
const dateStart = ref(null);

function formatDateDots(date) {
    if (date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    } else {
        return null;
    }
}

function parseDate(dateStr) {
    const [day, month, year] = dateStr.split('.').map(Number);

    return new Date(year, month - 1, day);
}

const handleStartDate = (modelData) => {
    dateStart.value = modelData;
};

const imagesArr = ref([]);
const images = ref([]);
const mainImageIndex = ref(null);

const handleFiles = (event) => {
    const files = event.target.files;

    // console.log(files)
    for (let i = 0; i < files.length; i++) {
        imagesArr.value.push(files[i]);

        const reader = new FileReader();

        reader.onload = (e) => {
            images.value.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
    }
};

const removeImage = (index) => {
    images.value.splice(index, 1);

    if (mainImageIndex.value === index) {
        mainImageIndex.value = null;
    } else if (mainImageIndex.value > index) {
        mainImageIndex.value--;
    }
};

const headLine = ref('');
const mainInfo = ref('');
const category = ref('');
const mainText = ref('');
const date = ref('');

//   const formData = new FormData();
//   formData.append('file', file);

const giveMeAllArea = async () => {
    date.value = formatDateDots(dateStart.value);

    const formData = new FormData();

    // Создаем объект, который будет содержать все текстовые данные
    let object = {
        headline: headLine.value,
        mainInfo: mainInfo.value,
        category: category.value,
        fullInfo: mainText.value,
        date: date.value,
        photoNumber: mainImageIndex.value,
        onMainPage: false,
    };

    // Добавляем текстовые данные в formData
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            formData.append(key, object[key]);
        }
    }

    // Добавляем каждый файл в formData под ключом 'images'
    imagesArr.value.forEach((file) => {
        formData.append('images', file);
    });

    // Логируем содержимое formData для отладки
    console.log("Отправляемые данные:");

    // Выводим данные в formData
    for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
            console.log(`${key}: [File] ${value.name}`); // Выводим название файла
        } else {
            console.log(`${key}: ${value}`); // Выводим текстовое значение
        }
    }

    // Отправка данных на сервер
    await fetch(`${config.ServerURL}/api/v1/news`, {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
        },
    });
};



const handleOptionSelected = (option) => {
    console.log(option.value);
    placeholder.value = option.value;
    category.value = option.label;
};
</script>

<template>
    <div class="content-wrap">
        <div class="title">Предпросмотр шапки</div>
        <NewsContentHeader
            :news-header-headline="headLine"
            :news-header-main-info="mainInfo"
        />

        <div class="headerAdd">
            <div class="headerAddEdit">
                <div class="headerArticle">
                    <div class="title-header">Заголовок</div>
                    <textarea
                        v-model="headLine"
                        type="text"
                        class="inputArticle input"
                    ></textarea>
                </div>
                <div class="headerMainDesc">
                    <div class="title-header">Основная мысль новости</div>
                    <textarea
                        v-model="mainInfo"
                        type="text"
                        class="inputMainDesc input"
                    ></textarea>
                </div>
            </div>
            <div class="category-date">
                <div class="category">
                    <div class="title-category">Категория</div>
                    <div class="select">
                        <VueSelect
                            v-model="selected"
                            :placeholder="placeholder"
                            :options="array"
                            @option-selected="handleOptionSelected"
                        ></VueSelect>
                    </div>
                </div>
                <div class="date">
                    <div class="title-date">Дата</div>
                    <div class="date-date">
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
                            <template #action-preview=""></template>
                        </VueDatePicker>
                    </div>
                </div>
            </div>
        </div>

        <div class="titleNews">Основной текст новости</div>
        <div class="EditMainText">
            <!-- <textarea v-model="mainText" type="text" class="inputMain"></textarea> -->
            <QuillEditor
                v-model:content="mainText"
                content-type="html"
                theme="snow"
                toolbar="full"
            ></QuillEditor>
        </div>

        <div class="editPhoto">
            <label class="upload-label" for="file-input">Выберите фотографии</label>
            <input id="file-input" type="file" multiple @change="handleFiles" />
            <div id="preview">
                <div v-for="(image, index) in images" :key="index" class="primg">
                    <div class="preview-image">
                        <div class="delete-button" @click="removeImage(index)">✕</div>
                        <img :src="image" alt="Preview" />
                    </div>
                    <div class="radiobutton">
                        <input
                            v-model="mainImageIndex"
                            type="radio"
                            :value="index"
                            class="radio"
                        />
                        <div class="title-radio">Сделать главной</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="enterBlo">
            <div class="checkNews">
                <div class="checkNewsTitle">Отображать новость на главной странице?</div>
                <input type="checkbox" class="checkbox" />
            </div>
            <button class="btn" @click="giveMeAllArea">Подтвердить новость</button>
            <!-- <button
                class="btn"
                @click="
                    () => {
                        console.log(mainText);
                    }
                "
            >
                Подтвердить новость
            </button> -->
        </div>
    </div>
</template>

<style scoped>
.primg {
    width: 195px;
    margin-right: 60px;
}

.title-radio {
    color: #ffffff;
    font-size: 18px;
}

.radiobutton {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.radio {
    width: 18px;
    height: 18px;
}

.upload-label {
    background-color: transparent;
    padding: 10px 20px;
    border: 1px solid #cccccc;
    border-radius: 6px;
    cursor: pointer;
    margin-bottom: 20px;
    display: inline-block;
    color: #ffffff;
    font-size: 24px;
    font-weight: 400;
    margin-top: 30px;
    margin-left: 100px;
}

#file-input {
    display: none;
}

#preview {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-left: 55px;
}

.preview-image {
    position: relative;
    width: 195px;
    height: 195px;
    overflow: hidden;
    border-radius: 5px;
    margin-right: 60px;
    margin-top: 40px;
}

.preview-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.delete-button {
    position: absolute;
    top: 5px;
    left: 5px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 26px;
}

.btn {
    width: 310px;
    height: 70%;
    font-size: 24px;
    font-weight: 400;
    border: 1px solid #cccccc;
    border-radius: 4px;
    margin-right: 24px;
    transition: 0.3s ease;
}

.btn:hover {
    background-color: #222222;
    border-color: #1e66f5;
}

.btn:active {
    background-color: #333333;
    border-color: #1e66f5;
}

.checkNewsTitle {
    font-size: 20px;
}

.checkNews {
    display: flex;
    align-items: center;
    margin-left: 20px;
}

.checkbox {
    margin-left: 10px;
}

:deep(input[type='checkbox']::after) {
    transform: translateY(-8px) translateX(0.5px) scale(1);
}
:deep(.ql-toolbar) {
    width: 100%;
}
:deep(.ql-container) {
    width: 100%;
}
.enterBlo {
    width: 90%;
    height: 70px;
    background-color: #181818;
    margin-top: 30px;
    margin-bottom: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.editPhoto {
    width: 90%;
    height: 657px;
    background-color: #181818;
    margin-top: 68px;
}

.inputMain {
    width: 95%;
    height: 95%;
    border: 1px solid #cccccc;
    color: white;
    outline: none;
    padding-left: 10px;
    font-size: 18px;
    resize: none;
}

.EditMainText {
    width: 90%;
    background-color: #181818;
    height: 658px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.titleNews {
    position: relative;
    margin-top: 32px;
    margin-right: 1240px;
}

.inputMainDesc {
    font-size: 28px;
}

.title-date {
    margin-right: 40px;
}

.category {
    display: flex;
    flex-direction: row;
    width: 30%;
    margin-left: 30px;
    margin-right: 35px;
    justify-content: space-between;
}

.date {
    display: flex;
    flex-direction: row;
    justify-content: end;
    width: 70%;
    margin-right: 20px;
}

.date-date {
    width: 13.5%;
    margin-left: 16px;
    display: flex;
    flex-direction: column;
}

option {
    font-family: JetBrainsMono;
}

.category-date {
    display: flex;
    flex-direction: row;
    margin-top: 56px;
}

.headerArticle {
    width: 30%;
    margin-left: 30px;
    margin-right: 35px;
}

.headerMainDesc {
    width: 70%;
    margin-right: 30px;
}

.input {
    outline: none;
    border: 1px solid #cccccc;
    border-radius: 6px;
    height: 272px;
    width: 100%;
    padding-left: 10px;
    resize: none;
    color: white;
}

.headerAdd {
    display: flex;
    flex-direction: column;
}

.title-header {
    margin-bottom: 10px;
}

.headerAddEdit {
    display: flex;
    flex-direction: row;
    margin-top: 30px;
}

.content-wrap {
    font-family: JetBrainsMono;
    color: white;
    font-size: 36px;
    font-weight: 700;
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.headerAdd {
    height: 527px;
    width: 90%;
    background-color: #181818;
    margin-top: 20px;
}

.title {
    margin-right: 1340px;
    margin-bottom: 10px;
    margin-top: 10px;
}

:deep(.dp__main) {
    top: -5px;
}

:deep(.dp__clear_icon) {
    top: 62%;
}

:deep(.dp__outer_menu_wrap) {
    top: -300px;
}

:deep(.no-results) {
    color: white;
}

:deep(.vue-select) {
    font-family: JetBrainsMono;
    background-color: transparent;
    width: 250px;
    z-index: 0;
    position: static;
    margin-top: 10px;
}

:deep(.search-input) {
    color: #ffffff;
    background-color: transparent;
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
    position: relative;
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

:deep(.dropdown-icon svg) {
    margin-bottom: 20px;
}
</style>
