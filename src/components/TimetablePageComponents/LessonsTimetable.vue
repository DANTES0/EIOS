<script setup>
import { ref, watch, onMounted } from 'vue';
import {
    fetchSchedule,
    currentWeekIsEven,
    timeSlots,
    days,
} from '../../services/scheduleService';
import LessonCell from './LessonCell.vue';
import eventBus from '../../eventBus';

const selectedOption = ref('1');
const scheduleGrid = ref([]);
const isEven = ref(null);
const scheduleType = ref('');
const showCurrentWeek = ref(false);

eventBus.on('optionSelected', (value) => {
    selectedOption.value = value[0];
    scheduleType.value = value[1];
});

eventBus.on('toggleCurrentWeek', (value) => {
    showCurrentWeek.value = value;
    loadSchedule();
});

async function loadSchedule() {
    const newGrid = await fetchSchedule(selectedOption.value);

    if (newGrid.length) {
        scheduleGrid.value = newGrid;
    }
}

async function checkWeek() {
    isEven.value = await currentWeekIsEven();
}

watch(selectedOption, loadSchedule);
onMounted(() => {
    loadSchedule();
    checkWeek();
});
</script>

<template>
    <table class="schedule-table text-black dark:text-white">
        <thead>
            <tr>
                <th
                    class="border border-gray-300 dark:border-[#ddd] p-2 text-center font-bold min-w-[115px]"
                >
                    Время
                </th>
                <th
                    v-for="day in days"
                    :key="day"
                    class="border border-gray-300 dark:border-[#ddd] p-2 text-center font-bold"
                >
                    {{ day }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(row, i) in scheduleGrid"
                v-show="!showCurrentWeek || (isEven !== null && isEven === (i % 2 !== 0))"
                :key="i"
                :class="{
                    'bg-gray-300 dark:bg-[#313131]':
                        isEven !== null && isEven === (i % 2 !== 0),
                }"
            >
                <td
                    class="time-slot bg-white dark:bg-[#1f1f1f] border border-gray-400 dark:border-[#ddd] p-2 text-center"
                    :class="{
                        'bg-[#d1d5db] dark:bg-[#313131] border border-gray-400 dark:border-[#ddd]':
                            isEven !== null && isEven === (i % 2 !== 0),
                    }"
                >
                    <div>{{ timeSlots[Math.floor(i / 2)] }}</div>
                    <div class="week-type text-black dark:text-white">
                        {{ i % 2 === 0 ? 'Нечет' : 'Чет' }}
                    </div>
                </td>
                <td
                    v-for="(lesson, j) in row"
                    :key="j"
                    class="border border-gray-400 dark:border-[#ddd] p-2 text-center"
                >
                    <LessonCell
                        :lesson="lesson"
                        :is-teacher-schedule="scheduleType === 'teacher'"
                    />
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
    padding: 8px;
    text-align: center;
}

.schedule-table th {
    font-weight: bold;
}

.schedule-table th:first-child {
    min-width: 115px;
}

.time-slot {
    font-weight: bold;
}

.week-type {
    font-size: 20px;
}
</style>
