<script setup>
import { ref, watch, onMounted, computed } from 'vue';
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

const tableWidth = computed(() => {
    if (window.innerWidth >= 2560) return '2560px';
    if (window.innerWidth >= 1920) return '100%';

    return '1412px';
});

const fontSize = computed(() => {
    if (window.innerWidth >= 2560) return '28px';
    if (window.innerWidth >= 1920) return 'calc(16px + 0.3vw)';

    return '24px';
});

const cellHeight = computed(() => {
    if (window.innerWidth >= 2560) return '60px';
    if (window.innerWidth >= 1920) return 'calc(50px + 0.3vw)';

    return '50px';
});

watch(selectedOption, loadSchedule);
onMounted(() => {
    loadSchedule();
    checkWeek();
});
</script>

<template>
    <div class="table-wrapper">
        <div class="table-container">
            <table class="schedule-table text-black dark:text-white">
                <thead>
                    <tr>
                        <th class="time-header">Время</th>
                        <th v-for="day in days" :key="day" class="day-header">
                            {{ day }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(row, i) in scheduleGrid"
                        v-show="
                            !showCurrentWeek ||
                            (isEven !== null && isEven === (i % 2 !== 0))
                        "
                        :key="i"
                        :class="{
                            'bg-gray-300 dark:bg-[#313131]':
                                isEven !== null && isEven === (i % 2 !== 0),
                        }"
                    >
                        <td
                            class="time-slot bg-white dark:bg-[#1f1f1f]"
                            :class="{
                                'bg-[#d1d5db] dark:bg-[#313131]':
                                    isEven !== null && isEven === (i % 2 !== 0),
                            }"
                        >
                            <div>{{ timeSlots[Math.floor(i / 2)] }}</div>
                            <div class="week-type text-black dark:text-white">
                                {{ i % 2 === 0 ? 'Нечет' : 'Чет' }}
                            </div>
                        </td>
                        <td v-for="(lesson, j) in row" :key="j" class="">
                            <LessonCell
                                :lesson="lesson"
                                :is-teacher-schedule="scheduleType === 'teacher'"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.table-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
    /* padding: 20px 0; */
}

.table-container {
    width: 100%;
    max-height: 99vh;
    overflow: auto;
    position: relative;
}

.schedule-table {
    width: v-bind(tableWidth);
    max-width: 2560px;
    min-width: 1412px;
    border-collapse: collapse;
    font-family: JetBrainsMono;
    table-layout: fixed;
    margin: 0 auto;
}

.schedule-table tr {
    height: v-bind(cellHeight);
    font-size: v-bind(fontSize);
}

/* ЦВЕТ ТУТ */

.time-header {
    position: sticky;
    left: 0;
    z-index: 20;
    background-color: #4b6cab;
    /* border: 1px solid #ddd; */
    padding: 8px;
    text-align: center;
    font-weight: bold;
    min-width: 115px;
    width: 115px;
    top: 0;
}

/* ЦВЕТ ТУТ */

.day-header {
    position: sticky;
    top: 0;
    z-index: 15;
    background-color: #4b88ab;
    /* border: 1px solid #ddd; */
    padding: 8px;
    text-align: center;
    font-weight: bold;
    min-width: 215px;
    width: 215px;
}

/* ТУТ ЦВЕТ */

.time-slot {
    position: sticky;
    left: 0;
    z-index: 10;
    /* border: 1px solid #ddd; */
    padding: 8px;
    text-align: center;
    font-weight: bold;
    min-width: 115px;
    width: 115px;
    background-color: #4bab91;
}

tr {
    box-sizing: border-box;
}

.lesson-cell {
    border: 1px solid #ddd;
    padding: 10px;
    min-width: 215px;
    /* width: 215px; */
    /* height: 100%; */
    vertical-align: top;
}

.week-type {
    font-size: calc(v-bind(fontSize) - 4px);
}

/* Для экранов меньше 1920px */
@media (max-width: 1280px) {
    .table-container {
        overflow-x: auto;
        overflow-y: hidden;
    }

    .time-header,
    .time-slot {
        position: sticky;
        left: 0;
    }
}

/* Для экранов 1920px и больше */
@media (min-width: 1783px) {
    .table-container {
        overflow-x: hidden;
        overflow-y: auto;
    }

    .schedule-table {
        width: 100%;
    }
}
</style>
