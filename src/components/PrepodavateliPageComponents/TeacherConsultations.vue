<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { fetchConsultations, timeSlots, days } from '../../services/scheduleService';
import LessonCell from '../TimetablePageComponents/LessonCell.vue';
import config from '../../config';

const route = useRoute();
const teacherId = route.params.id;
const consultationsGrid = ref([]);
const headerDates = ref([]);
const currentDate = ref(new Date());

async function loadConsultations() {
    try {
        const params = new URLSearchParams({
            pageSize: 999,
            pageNumber: 0,
            teacherId: teacherId,
            type: 'Консультация',
        });

        const response = await fetch(`${config.ServerURL}/api/v1/schedule?${params}`);
        const result = await response.json();
        const consultationsData = result.data || [];

        const grid = Array.from({ length: timeSlots.length }, () =>
            Array(days.length).fill(null),
        );

        consultationsData.forEach((entry) => {
            const parsedTime = entry.timeStart.split('T')[1].slice(0, 5);
            const timeIndex = timeSlots.indexOf(parsedTime);
            const dayIndex = days.indexOf(entry.dayOfWeek);

            if (timeIndex >= 0 && dayIndex >= 0) {
                grid[timeIndex][dayIndex] = entry;
            }
        });

        consultationsGrid.value = grid;
        findClosestConsultationDays(consultationsData);
    } catch (error) {
        console.error('Ошибка при загрузке консультаций:', error);
    }
}

function findClosestConsultationDays(consultationsData) {
    const today = new Date();
    const foundDates = [];
    let dayOffset = 0;
    const maxDaysToCheck = 30;

    while (foundDates.length < 3 && dayOffset < maxDaysToCheck) {
        const checkDate = new Date(today);

        checkDate.setDate(today.getDate() + dayOffset);

        const dayName = days[checkDate.getDay() === 0 ? 6 : checkDate.getDay() - 1];
        const hasConsultations = consultationsData.some(
            (entry) => entry.dayOfWeek === dayName,
        );

        if (hasConsultations) {
            foundDates.push({
                date: checkDate,
                displayName: getDisplayDayName(checkDate),
                dayIndex: days.indexOf(dayName),
            });
        }

        dayOffset++;
    }

    headerDates.value = foundDates;
}

function getDisplayDayName(date) {
    const today = new Date();
    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);

    const dayAfterTomorrow = new Date(today);

    dayAfterTomorrow.setDate(today.getDate() + 2);

    if (date.toDateString() === today.toDateString()) return 'Сегодня';
    if (date.toDateString() === tomorrow.toDateString()) return 'Завтра';
    if (date.toDateString() === dayAfterTomorrow.toDateString()) return 'Послезавтра';

    const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    return `${dayNames[date.getDay()]}, ${date.getDate()}.${date.getMonth() + 1}`;
}

onMounted(() => {
    loadConsultations();
});
</script>

<template>
    <div class="consultations-container">
        <table class="consultations-table">
            <thead>
                <tr>
                    <th>Время</th>
                    <th v-for="(date, index) in headerDates" :key="index">
                        {{ date.displayName }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, timeIndex) in consultationsGrid" :key="timeIndex">
                    <td class="time-slot">{{ timeSlots[timeIndex] }}</td>
                    <td
                        v-for="(date, dateIndex) in headerDates"
                        :key="dateIndex"
                        class="consultation-cell"
                    >
                        <LessonCell
                            v-if="row[date.dayIndex]"
                            :lesson="row[date.dayIndex]"
                            :is-teacher-schedule="false"
                        />
                        <div v-else class="empty-cell"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.consultations-container {
    margin-top: 20px;
    width: 100%;
}

.consultations-table {
    width: 720px;
    border-collapse: collapse;
    font-family: JetBrainsMono;
}

.consultations-table tr {
    height: 55px;
    font-size: 20px;
}

.consultations-table th,
.consultations-table td {
    border: 1px solid #2b2b2b;
    padding: 8px;
    text-align: center;
}

.consultations-table th {
    background: #1f1f1f;
    font-weight: bold;
    min-width: 200px;
}

.consultations-table th:first-child {
    min-width: 100px;
}

.time-slot {
    font-weight: bold;
    background: #1f1f1f;
}

.consultation-cell {
    height: 180px;
    width: 200px;
    vertical-align: top;
}

.empty-cell {
    height: 180px;
    width: 200px;
    background: transparent;
}
</style>
