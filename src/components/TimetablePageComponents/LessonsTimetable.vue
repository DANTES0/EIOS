<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useFetch } from '@vueuse/core';
import LessonCell from './LessonCell.vue';
import eventBus from '../../eventBus';
import config from '../../config';

const selectedOption = ref('1');
const isValidOption = (value) => value.includes('teacher');

// Отслеживаем выбор группы/преподавателя
eventBus.on('optionSelected', (value) => {
    selectedOption.value = value;
});

//мне приходит цифра с сервера
//мне нужно рисовать как чётную так и нечётную недели
//при выводе недели проверять значение цифры с сервера
//если цифра с сервера совпадает с неделей,которую компонент рисует сейчас
//то добавлять ячейке предмета класс current с background-color: gray;
//true - чётная
//false - нечётная

const scheduleUrl = computed(() => {
    const params = new URLSearchParams({
        pageSize: 999,
        pageNumber: 0,
        [isValidOption(selectedOption.value) ? 'teacherId' : 'groupId']:
            selectedOption.value.replace('teacher', ''),
    });

    return `${config.ServerURL}/api/v1/schedule?${params}`;
});

const scheduleData = ref([]);
const scheduleGrid = ref(Array.from({ length: 14 }, () => Array(6).fill(null)));

const scheduleCheckURL = `${config.ServerURL}/api/v1/schedule/check`;

const timeSlots = ['09:00', '10:50', '12:40', '14:55', '16:45', '18:30', '20:05'];
const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

async function fetchSchedule() {
    scheduleGrid.value = Array.from({ length: 14 }, () => Array(6).fill(null));

    const { data } = await useFetch(scheduleUrl).json();

    scheduleData.value = data.value?.data || [];

    scheduleData.value.forEach((entry) => {
        const parsedTime = entry.timeStart.split('T')[1].slice(0, 5);
        const timeIndex = timeSlots.indexOf(parsedTime);
        const dayIndex = days.indexOf(entry.dayOfWeek);
        const weekOffset = entry.parityOfWeek === 'четная' ? 1 : 0;
        const gridIndex = timeIndex * 2 + weekOffset;

        if (timeIndex !== -1 && dayIndex !== -1) {
            if (gridIndex < scheduleGrid.value.length) {
                scheduleGrid.value[gridIndex][dayIndex] = entry;
            } else {
                console.error(
                    `Ошибка: gridIndex (${gridIndex}) выходит за пределы массива!`,
                );
            }
        } else {
            console.warn('Некорректные данные:', entry);
        }
    });
}

async function currentWeekIsEven() {
    const { data } = await useFetch(scheduleCheckURL).json();

    console.log(data);
}

watch(selectedOption, fetchSchedule);
onMounted(() => {
    fetchSchedule();
    currentWeekIsEven();
});
</script>

<template>
    <table class="schedule-table">
        <thead>
            <tr>
                <th>Время</th>
                <th v-for="day in days" :key="day">{{ day }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, i) in scheduleGrid" :key="i">
                <td class="time-slot">
                    <div>{{ timeSlots[Math.floor(i / 2)] }}</div>
                    <div class="week-type" :class="{ currentWeek: 1 }">
                        {{ i % 2 === 0 ? 'Нечет' : 'Чет' }}
                    </div>
                </td>
                <td v-for="(lesson, j) in row" :key="j">
                    <LessonCell :lesson="lesson" />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
.schedule-table {
    width: 1412px;
    border-collapse: collapse;
    font-family: JetBrainsMono;
}

.schedule-table tr {
    height: 50px;
    font-size: 24px;
}

.schedule-table th,
.schedule-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

.schedule-table th {
    background: #1f1f1f;
    font-weight: bold;
}

.schedule-table th:first-child {
    min-width: 115px;
}

.time-slot {
    font-weight: bold;
    background: #1f1f1f;
}

.week-type {
    font-size: 20px;
    color: #666;
}
</style>
