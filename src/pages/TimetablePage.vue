<script setup>
import Terminal from '../components/Terminal.vue';
import Tabs from '../components/Tabs.vue';
import LessonsTimetable from '../components/TimetablePageComponents/LessonsTimetable.vue';
</script>

<template>
    <div class="page-container">
        <Tabs title="Расписание" :show-icon="false" />
        <div class="timetable-page">
            <LessonsTimetable />
        </div>
        <!-- <Terminal /> -->
    </div>
</template>

<style scoped>
.page-container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.timetable-page {
    width: 100%;
    flex: 1;
    display: flex;
    overflow: hidden;
}
</style>
