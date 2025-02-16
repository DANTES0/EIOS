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

// URL для загрузки расписания
const scheduleUrl = computed(() => {
    const params = new URLSearchParams({
        pageSize: 999,
        pageNumber: 0,
        [isValidOption(selectedOption.value) ? 'teacherId' : 'groupId']:
            selectedOption.value.replace('teacher', ''),
    });

    return `${config.ServerURL}/api/v1/schedule?${params}`;
});

// Данные о расписании
const scheduleData = ref([]);
const scheduleGrid = ref(Array.from({ length: 14 }, () => Array(7).fill(null)));

// Временные слоты и дни недели
const timeSlots = [
    '09:00:00',
    '10:50:00',
    '12:40:00',
    '14:55:00',
    '16:45:00',
    '18:30:00',
    '20:05:00',
];
const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

// Функция загрузки расписания
async function fetchSchedule() {
    scheduleGrid.value = Array.from({ length: 14 }, () => Array(7).fill(null));

    const { data } = await useFetch(scheduleUrl).json();

    scheduleData.value = data.value?.data || [];

    scheduleData.value.forEach((entry) => {
        const timeIndex = timeSlots.indexOf(entry.timeStart);
        const dayIndex = days.indexOf(entry.dayOfWeek);

        if (timeIndex !== -1 && dayIndex !== -1) {
            const weekOffset = entry.parityOfWeek === 'четная' ? 1 : 0;

            scheduleGrid.value[timeIndex * 2 + weekOffset][dayIndex] = entry;
        }
    });
}

// Автоматическая загрузка при изменении группы/преподавателя
watch(selectedOption, fetchSchedule);
onMounted(fetchSchedule);
</script>

<template>
    <div class="schedule-grid">
        <!-- Заголовки дней недели -->
        <div class="grid-header">Время</div>
        <div v-for="day in days" :key="day" class="grid-header">{{ day }}</div>

        <!-- Таблица расписания -->
        <template v-for="(row, i) in scheduleGrid" :key="i">
            <div class="time-slot">
                <div>{{ timeSlots[Math.floor(i / 2)] }}</div>
                <div class="week-type">{{ i % 2 === 0 ? 'Нечет' : 'Чет' }}</div>
            </div>
            <LessonCell v-for="(lesson, j) in row" :key="j" :lesson="lesson" />
        </template>
    </div>
</template>

<style scoped>
.schedule-grid {
    display: grid;
    grid-template-columns: 120px repeat(6, 1fr);
    grid-template-rows: auto;
    gap: 4px;
    width: 100%;
}

.grid-header,
.time-slot {
    font-weight: bold;
    background: #f0f0f0;
    text-align: center;
    padding: 8px;
}

.time-slot {
    grid-column: 1;
}

.week-type {
    font-size: 12px;
    color: #666;
}
</style>
