<script setup>
import { computed } from 'vue';

const props = defineProps({
    lesson: Object,
});

const teacherName = computed(
    () => props.lesson?.teacher?.name || 'Преподаватель не указан',
);
const classroom = computed(() => props.lesson?.classroom || 'Аудитория не указана');

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
        <div class="type">{{ lesson.type }}</div>
        <div class="info">
            <span class="teacher" v-html="convertToShortName(teacherName)"></span>
            <span class="room">{{ classroom }}</span>
        </div>
    </div>
    <div v-else class="lesson-cell empty"></div>
</template>

<style scoped>
.lesson-cell {
    padding: 8px;
    text-align: center;
    height: 180px;
    font-size: 16px;
    font-weight: 100;
    text-align: left;
    display: flex;
    flex-direction: column;
}

.empty {
    background: #1f1f1f;
    height: 180px;
    width: 215px;
}

.title {
    font-weight: 700;
}

.type {
    margin-top: auto;
    margin-bottom: 12px;
}

.info {
    display: flex;
    justify-content: space-between;
}
</style>
