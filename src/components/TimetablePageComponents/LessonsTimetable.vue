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
    <div class="timetable-container">
        <div class="table-wrapper">
            <div class="table-scroll-container">
                <table
                    class="schedule-table text-[#0c2340] dark:text-white border-separate border-spacing-0"
                >
                    <thead>
                        <tr>
                            <th
                                class="time-header bg-white dark:bg-[#1f1f1f] border !border-[#0C2340] dark:!border-[#cccccc]"
                            >
                                Время
                            </th>
                            <th
                                v-for="day in days"
                                :key="day"
                                class="day-header bg-white dark:bg-[#1f1f1f] border !border-[#0C2340] dark:!border-[#cccccc]"
                            >
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
                                class="time-slot border !border-[#0C2340] dark:!border-[#cccccc] p-1.5 min-w-[215px] w-[215px]"
                                :class="{
                                    'bg-white dark:bg-[#1f1f1f]':
                                        isEven === null || isEven !== (i % 2 !== 0),
                                    'bg-gray-300 dark:bg-[#313131]':
                                        isEven !== null && isEven === (i % 2 !== 0),
                                }"
                            >
                                <div>{{ timeSlots[Math.floor(i / 2)] }}</div>
                                <div class="week-type text-[#0c2340] dark:text-white">
                                    {{ i % 2 === 0 ? 'Нечет' : 'Чет' }}
                                </div>
                            </td>
                            <td
                                v-for="(lesson, j) in row"
                                :key="j"
                                class="lesson-cell border border-[#0C2340] dark:!border-[#cccccc] p-1.5 min-w-[215px] w-[215px]"
                            >
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
    font-family: JetBrainsMono;
    table-layout: fixed;
    margin: 0 auto;
}

.schedule-table tr {
    height: v-bind(cellHeight);
}

.time-header {
    position: sticky;
    left: -0.5px;
    top: -0.5px;
    z-index: 20;
    padding: 8px;
    text-align: center;
    font-weight: bold;
    min-width: calc(115px * v-bind(scaleFactor));
    width: calc(115px * v-bind(scaleFactor));
    font-size: v-bind(headerFontSize);
}

.day-header {
    position: sticky;
    top: -0.5px;
    z-index: 15;
    padding: 8px;
    text-align: center;
    font-weight: bold;
    min-width: calc(215px * v-bind(scaleFactor));
    width: calc(215px * v-bind(scaleFactor));
    font-size: v-bind(headerFontSize);
}

.time-slot {
    position: sticky;
    left: -0.5px;
    z-index: 10;
    padding: 8px;
    text-align: center;
    font-weight: bold;
    min-width: 115px;
    width: 115px;
    font-size: v-bind(fontSize);
    /* border: 1px solid rgba(221, 221, 221, 0.2); */
    /* border-left: 1px solid rgba(221, 221, 221, 0.2);
    border-bottom: 1px solid rgba(221, 221, 221, 0.2); */
}

.lesson-cell {
    padding: 6px;
    min-width: 215px;
    width: 215px;
}

.week-type {
    font-size: calc(v-bind(fontSize) - 4px);
}

.timetable-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.table-wrapper {
    width: 100%;
    flex: 1;
    overflow: auto;
}

.table-scroll-container {
    width: 100%;
    height: 100%;
    overflow: auto;
}

.schedule-table {
    width: 100%;
    height: 100%;
    min-width: 900px; /* Минимальная ширина для читаемости */
    border-collapse: collapse;
    table-layout: fixed;
}

.time-header {
    width: 10%; /* Фиксированная ширина для колонки времени */
}

@media (min-width: 1920px) {
    .time-slot {
        font-size: 1.4rem;
    }

    .time-header {
        font-size: 1.5rem;
    }

    .day-header {
        font-size: 1.5rem;
    }
}

@media (min-width: 1440px) {
    .time-slot {
        font-size: 1.4rem;
    }

    .time-header {
        font-size: 1.5rem;
    }

    .day-header {
        font-size: 1.5rem;
    }

    :deep(.details) {
        font-size: 1.2rem;
    }

    :deep(.teacher) {
        font-size: 1.2rem;
    }

    :deep(.group) {
        font-size: 1.2rem;
    }

    :deep(.title) {
        font-size: 1.2rem;
    }

    :deep(.room) {
        font-size: 1.4rem;
    }
}

@media (min-width: 1920px) {
    .time-slot {
        font-size: 1.6rem;
    }

    .time-header {
        font-size: 1.8rem;
    }

    .day-header {
        font-size: 1.8rem;
    }

    :deep(.details) {
        font-size: 1.3rem;
    }

    :deep(.teacher) {
        font-size: 1.3rem;
    }

    :deep(.group) {
        font-size: 1.3rem;
    }

    :deep(.title) {
        font-size: 1.4rem;
    }

    :deep(.room) {
        font-size: 1.4rem;
    }
}

@media (min-width: 2560px) {
    .time-slot {
        font-size: 2rem;
    }

    .time-header {
        font-size: 2.2rem;
    }

    .day-header {
        font-size: 2.2rem;
    }

    :deep(.details) {
        font-size: 1.5rem;
    }

    :deep(.teacher) {
        font-size: 1.5rem;
    }

    :deep(.group) {
        font-size: 1.5rem;
    }

    :deep(.title) {
        font-size: 1.5rem;
    }

    :deep(.room) {
        font-size: 1.7rem;
    }
}
</style>
