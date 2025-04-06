<script setup>
import { ref } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: 'о_кафедре.html', // Заголовок по умолчанию
    },
    showIcon: {
        type: Boolean,
        default: true, // Показывать иконку по умолчанию
    },
    iconFilename: {
        type: String,
        default: '', // Путь к иконке
    },
});

function getImageUrl() {
    // This path must be correct for your file
    //return new URL(`../components/Icons/Icon/IconHtml`, import.meta.url);
    return new URL(`../assets/anchor_header/new/${props.iconFilename}`, import.meta.url);
}
</script>

<template>
    <div class="tabs bg-[#0C2340] dark:bg-[#181818]">
        <div class="tabs-line bg-white dark:bg-[#1f1f1f]">
            <img
                v-if="props.showIcon"
                :src="getImageUrl()"
                alt="icon"
                class="tabs-image"
            />
            <label class="tabs-title text-[#0c2340] dark:text-[#cccccc]">{{
                props.title
            }}</label>
        </div>
    </div>
</template>

<style scoped>
.tabs {
    position: sticky;
    top: 0;
    z-index: 99;
    border-bottom: 1px solid #2b2b2b;
    width: 100%;
}
.tabs-line {
    display: inline-flex; /* Установить inline-flex для подгонки по содержимому */
    align-items: center;
    justify-content: flex-start; /* Ориентировать элементы слева направо */
    min-width: 100px; /* Минимальная ширина */
    max-width: max-content; /* Подстраиваться под содержимое */
    padding: 0 8px; /* Отступы для удобства */
    height: 100%;
    border-right: 1px solid #2b2b2b;
}
.tabs-image {
    width: 16px;
    height: 16px;
    margin-right: 7px; /* Отступ справа от иконки */
    flex-shrink: 0; /* Предотвращает сжатие иконки */
}
.tabs-title {
    font-family: Rubik;
    font-size: 14px;
    font-weight: 100;
    white-space: nowrap; /* Предотвращает перенос текста */
    overflow: hidden; /* Если текст слишком длинный */
    text-overflow: ellipsis; /* Добавляет троеточие */
}
</style>
