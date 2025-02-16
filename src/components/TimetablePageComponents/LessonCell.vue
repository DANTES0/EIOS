<script setup>
defineProps({
    lesson: Object,
});
</script>

<template>
    <div v-if="lesson" class="lesson-cell">
        <div class="title">{{ lesson.subjectName }}</div>
        <div class="type">{{ lesson.type }}</div>
        <div class="info">
            <span class="teacher">{{ lesson.teacherName }}</span>
            <span class="room">{{ lesson.classroom }}</span>
        </div>
    </div>
    <div v-else class="lesson-cell empty"></div>
</template>

<style scoped>
.lesson-cell {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: center;
}

.empty {
    background: #f9f9f9;
    min-height: 40px;
}
</style>
