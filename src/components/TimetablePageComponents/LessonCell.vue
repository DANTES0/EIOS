<script setup>
import { computed } from 'vue';
import { fetchSchedule } from '../../services/scheduleService.js';
import eventBus from '../../eventBus.js';

const props = defineProps({
    lesson: Object,
    isTeacherSchedule: Boolean, // Новый пропс
});

const teacherName = computed(
    () => props.lesson?.teacher?.name || 'Преподаватель не указан',
);
const classroom = computed(() => props.lesson?.classroom || '-');
const lessonType = computed(() =>
    props.lesson.type === 'Лабораторная' ? 'Лаб.' : props.lesson.type,
);
const groupName = computed(() => props.lesson?.group?.name || '-');

function convertToShortName(fullName) {
    let shortName = fullName
        .trim()
        .split(' ')
        .filter((word) => word.length > 0);

    if (shortName.length >= 2) {
        const nameLetter = shortName[1][0];
        const middleNameLetter = shortName[2] ? shortName[2][0] : '';

        shortName = `${shortName[0]} ${nameLetter}.${middleNameLetter ? '&nbsp;' + middleNameLetter + '.' : ''}`;
    } else {
        shortName = shortName[0];
    }

    return shortName;
}

function convertToShortNameWithoutNbsp(fullName) {
    let shortName = fullName
        .trim()
        .split(' ')
        .filter((word) => word.length > 0);

    if (shortName.length >= 2) {
        const nameLetter = shortName[1][0];
        const middleNameLetter = shortName[2] ? shortName[2][0] : '';

        shortName = `${shortName[0]} ${nameLetter}.${middleNameLetter ? middleNameLetter + '.' : ''}`;
    } else {
        shortName = shortName[0];
    }

    return shortName;
}
</script>

<template>
    <div v-if="lesson" class="lesson-cell">
        <div class="title">{{ lesson.subjectName }}</div>

        <!-- Если отображаем расписание препода, показываем группу -->
        <div v-if="isTeacherSchedule" class="group">
            <span
                class="clickable-text"
                @click="
                    eventBus.emit('optionSelectedClick', [
                        lesson?.group?.id,
                        'group',
                        lesson?.group?.name,
                    ])
                "
            >
                {{ lesson.group.name }}
            </span>
        </div>

        <!-- Если расписание группы, показываем ФИО препода -->
        <div v-else class="teacher">
            <span
                class="clickable-text"
                @click="
                    eventBus.emit('optionSelectedClick', [
                        'teacher' + lesson?.teacher?.id,
                        'teacher',
                        convertToShortNameWithoutNbsp(teacherName),
                    ])
                "
                v-html="convertToShortName(teacherName)"
            ></span>
        </div>

        <div class="details">
            <div
                class="type"
                :class="{ 'green-background': lessonType === 'Консультация' }"
            >
                {{ lessonType }}
            </div>
            <div
                class="room"
                :class="{ 'green-background': lessonType === 'Консультация' }"
            >
                {{ classroom }}
            </div>
        </div>
    </div>
    <div v-else class="lesson-cell empty"></div>
</template>

<style scoped>
.green-background {
    color: #00c279 !important; /* Светло-зеленый цвет */
    font-weight: bold;
}
.lesson-cell {
    padding: 8px;
    text-align: center;
    height: 180px;
    font-size: 18px;
    font-weight: 100;
    text-align: left;
    display: flex;
    flex-direction: column;
}

.empty {
    background: transparent;
    height: 180px;
    width: 215px;
}

.title {
    font-weight: 700;
}

.teacher,
.group {
    margin-top: auto;
    margin-bottom: 22px;
}

.details {
    display: flex;
    justify-content: space-between;
}

.room {
    font-size: 20px;
    font-weight: 900;
    color: #1e66f5;
}

.clickable-text:hover {
    color: #1e66f5;
    font-weight: bold;
    cursor: pointer;
}
</style>
