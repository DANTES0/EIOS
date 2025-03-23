<script setup>
import { computed } from 'vue';

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
</script>

<template>
    <div v-if="lesson" class="lesson-cell">
        <div class="title">{{ lesson.subjectName }}</div>

        <!-- Если отображаем расписание препода, показываем группу -->
        <div v-if="isTeacherSchedule" class="group">{{ lesson.group.name }}</div>
        <!-- Если расписание группы, показываем ФИО препода -->
        <div v-else class="teacher" v-html="convertToShortName(teacherName)"></div>

        <div class="details">
            <div class="type">{{ lessonType }}</div>
            <div class="room">{{ classroom }}</div>
        </div>
    </div>
    <div v-else class="lesson-cell empty"></div>
</template>

<style scoped>
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
</style>
