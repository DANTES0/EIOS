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

eventBus.on('optionSelected', (value) => {
    selectedOption.value = value;
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
    <table class="schedule-table">
        <thead>
            <tr>
                <th>Время</th>
                <th v-for="day in days" :key="day">{{ day }}</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(row, i) in scheduleGrid"
                :key="i"
                :class="{ 'current-week': isEven !== null && isEven === (i % 2 !== 0) }"
            >
                <td
                    class="time-slot"
                    :class="{
                        'current-week': isEven !== null && isEven === (i % 2 !== 0),
                    }"
                >
                    <div>{{ timeSlots[Math.floor(i / 2)] }}</div>
                    <div class="week-type">
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

.current-week {
    background-color: gray;
}

.week-type {
    font-size: 20px;
    color: #666;
}
</style>

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

.current-week {
    background-color: #313131;
}
</style>
