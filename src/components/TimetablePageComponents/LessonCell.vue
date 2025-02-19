<script setup>
import { computed } from 'vue';

const props = defineProps({
    lesson: Object,
});

const teacherName = computed(
    () => props.lesson?.teacher?.name || 'Преподаватель не указан',
);
const classroom = computed(() => props.lesson?.classroom || 'Аудитория не указана');

console.log('LessonCell получил:', props.lesson);
</script>

<template>
    <div v-if="lesson" class="lesson-cell">
        <div class="title">{{ lesson.subjectName }}</div>
        <div class="type">{{ lesson.type }}</div>
        <div class="info">
            <span class="teacher">{{ teacherName }}</span>
            <span class="room">{{ classroom }}</span>
        </div>
    </div>
    <div v-else class="lesson-cell empty"></div>
</template>

<style scoped>
.lesson-cell {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: center;
    height: 180px;
}

.empty {
    background: #1f1f1f;
    min-height: 40px;
}
</style>
