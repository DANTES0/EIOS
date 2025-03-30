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
const visibleTimeSlots = ref([]);

async function loadConsultations() {
    try {
        const response = await fetch(
            `${config.ServerURL}/api/v1/schedule/upcoming?teacherId=${teacherId}`,
        );
        const consultationsData = await response.json();

        // Получаем уникальные дни с консультациями
        const uniqueDays = [...new Set(consultationsData.map((item) => item.dayOfWeek))];

        // Находим ближайшие даты для этих дней
        findClosestConsultationDays(consultationsData, uniqueDays);

        // Получаем все временные слоты для отображения
        const allTimes = consultationsData.map((item) =>
            item.timeStart.split('T')[1].slice(0, 5),
        );

        visibleTimeSlots.value = [...new Set(allTimes)].sort();

        // Создаем сетку для отображения
        const grid = Array.from({ length: visibleTimeSlots.value.length }, () =>
            Array(headerDates.value.length).fill(null),
        );

        // Заполняем сетку данными
        consultationsData.forEach((entry) => {
            const time = entry.timeStart.split('T')[1].slice(0, 5);
            const timeIndex = visibleTimeSlots.value.indexOf(time);
            const dayIndex = headerDates.value.findIndex(
                (d) => d.dayOfWeek === entry.dayOfWeek,
            );

            if (timeIndex >= 0 && dayIndex >= 0) {
                grid[timeIndex][dayIndex] = entry;
            }
        });

        consultationsGrid.value = grid;
    } catch (error) {
        console.error('Ошибка при загрузке консультаций:', error);
    }
}

function findClosestConsultationDays(consultationsData, uniqueDays) {
    const today = new Date();
    const foundDates = [];

    // Для каждого уникального дня находим ближайшую дату
    uniqueDays.forEach((dayOfWeek) => {
        let dayOffset = 0;
        const maxDaysToCheck = 30;
        let found = false;

        while (!found && dayOffset < maxDaysToCheck) {
            const checkDate = new Date(today);

            checkDate.setDate(today.getDate() + dayOffset);

            const currentDayName =
                days[checkDate.getDay() === 0 ? 6 : checkDate.getDay() - 1];

            if (currentDayName === dayOfWeek) {
                foundDates.push({
                    date: new Date(checkDate),
                    displayName: getDisplayDayName(checkDate, dayOfWeek),
                    dayOfWeek: dayOfWeek,
                    dayIndex: days.indexOf(dayOfWeek),
                });
                found = true;
            }

            dayOffset++;
        }
    });

    // Сортируем даты по возрастанию
    headerDates.value = foundDates.sort((a, b) => a.date - b.date).slice(0, 3);
}

function getDisplayDayName(date, dayOfWeek) {
    const today = new Date();
    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Сегодня';
    if (date.toDateString() === tomorrow.toDateString()) return 'Завтра';

    // Для всех остальных дней просто возвращаем название дня недели
    return dayOfWeek;
}

onMounted(() => {
    loadConsultations();
});
</script>

<template>
    <div class="consultations-container text-white">
        <table v-if="headerDates.length > 0" class="consultations-table bg-[#0c2340] dark:bg-[#181818]">
            <thead>
                <tr>
                    <th class="border border-gray-300 dark:border-[#ddd] p-2 text-center font-bold min-w-[115px]">Время</th>
                    <th v-for="(date, index) in headerDates" :key="index" class="border border-gray-300 dark:border-[#ddd] p-2 text-center font-bold">
                        {{ date.displayName }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(time, timeIndex) in visibleTimeSlots" :key="timeIndex">
                    <td class="time-slot border border-gray-400 dark:border-[#ddd] p-2 text-center">{{ time }}</td>
                    <td
                        v-for="(date, dateIndex) in headerDates"
                        :key="dateIndex"
                        class="consultation-cell border border-gray-300 dark:border-[#ddd] p-2 text-center font-bold min-w-[115px]"
                    >
                        <LessonCell
                            v-if="
                                consultationsGrid[timeIndex] &&
                                consultationsGrid[timeIndex][dateIndex]
                            "
                            :lesson="consultationsGrid[timeIndex][dateIndex]"
                            :is-teacher-schedule="false"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else class="no-consultations">
            На текущую неделю консультаций не запланировано
        </div>
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
    padding: 8px;
    text-align: center;
}

.consultations-table th {
    font-weight: bold;
    min-width: 200px;
}

.consultations-table th:first-child {
    min-width: 100px;
}

.time-slot {
    font-weight: bold;
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
