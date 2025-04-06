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

const scaleFactor = computed(() => {
    const screenWidth = window.innerWidth;

    // if (screenWidth >= 2560) return 1;
    // if (screenWidth >= 1920) return 1;
    // if (screenWidth >= 1600) return 0.9;
    // if (screenWidth >= 1366) return 0.75;
    // if (screenWidth >= 1280) return 0.72;

    // return 0.7;
    return 1;
});

const tableWidth = computed(() => {
    const baseWidth = 1412;

    return `${baseWidth * scaleFactor.value}px`;
});

const fontSize = computed(() => {
    const baseSize = 24;

    return `${baseSize * scaleFactor.value}px`;
});

const cellHeight = computed(() => {
    const baseHeight = 50;

    return `${baseHeight * scaleFactor.value}px`;
});

const headerFontSize = computed(() => {
    const baseSize = 24;

    return `${baseSize * scaleFactor.value}px`;
});

watch(selectedOption, loadSchedule);
onMounted(() => {
    loadSchedule();
    checkWeek();
    window.addEventListener('resize', () => {
        scaleFactor.value; // Force reactivity update
    });
});
</script>

<template>
    <div class="timetable-container">
        <div class="table-wrapper">
            <div class="table-scroll-container">
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
                            <td v-for="(lesson, j) in row" :key="j" class="lesson-cell">
                                <LessonCell
                                    :lesson="lesson"
                                    :is-teacher-schedule="scheduleType === 'teacher'"
                                    :scale-factor="scaleFactor"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.timetable-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.table-wrapper {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    overflow: hidden;
}

.table-scroll-container {
    width: 100%;
    /* max-height: calc(100vh - 150px); */
    overflow: auto;
    position: relative;
}

.schedule-table {
    width: v-bind(tableWidth);
    max-width: 2560px;
    min-width: 900px;
    border-collapse: collapse;
    font-family: JetBrainsMono;
    table-layout: fixed;
    margin: 0 auto;
}

.schedule-table tr {
    height: v-bind(cellHeight);
}

.time-header {
    position: sticky;
    left: 0;
    z-index: 20;
    background-color: #4b6cab;
    padding: 8px;
    text-align: center;
    font-weight: bold;
    min-width: calc(115px * v-bind(scaleFactor));
    width: calc(115px * v-bind(scaleFactor));
    top: 0;
    font-size: v-bind(headerFontSize);
}

.day-header {
    position: sticky;
    top: 0;
    z-index: 15;
    background-color: #4b88ab;
    padding: 8px;
    text-align: center;
    font-weight: bold;
    min-width: calc(215px * v-bind(scaleFactor));
    width: calc(215px * v-bind(scaleFactor));
    font-size: v-bind(headerFontSize);
}

.time-slot {
    position: sticky;
    left: 0;
    z-index: 10;
    padding: 8px;
    text-align: center;
    font-weight: bold;
    min-width: calc(115px * v-bind(scaleFactor));
    width: calc(115px * v-bind(scaleFactor));
    font-size: v-bind(fontSize);
    /* border: 1px solid rgba(221, 221, 221, 0.2); */
    border-left: 1px solid rgba(221, 221, 221, 0.2);
    border-bottom: 1px solid rgba(221, 221, 221, 0.2);
}

.lesson-cell {
    border: 1px solid rgba(221, 221, 221, 0.2);
    padding: calc(10px * v-bind(scaleFactor));
    min-width: calc(215px * v-bind(scaleFactor));
    width: calc(215px * v-bind(scaleFactor));
    vertical-align: top;
}

.week-type {
    font-size: calc(v-bind(fontSize) - 4px);
}

@media (max-width: 1919px) {
    .table-scroll-container {
        overflow-x: auto;
        overflow-y: auto;
    }

    .time-header,
    .time-slot {
        position: sticky;
        left: 0;
    }
}

/* @media (min-width: 1920px) {
    .table-scroll-container {
        overflow-x: hidden;
        overflow-y: auto;
    }
} */
</style>
