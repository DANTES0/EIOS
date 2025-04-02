<script setup>
import Terminal from '../components/Terminal.vue';
import Tabs from '../components/Tabs.vue';
import LessonsTimetable from '../components/TimetablePageComponents/LessonsTimetable.vue';
</script>

<template>
    <Tabs title="Расписание" :show-icon="false" />
    <div class="timetable-page">
        <LessonsTimetable />
    </div>
    <!-- <Terminal /> -->
</template>

<style scoped>
.timetable-page {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>
