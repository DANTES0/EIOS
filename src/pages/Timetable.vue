<script setup>
import Terminal from '../components/Terminal.vue';
import Tabs from '../components/Tabs.vue';
import Schedule from '../components/TimetablePageComponents/Schedule.vue';
</script>

<template>
    <div class="timetable-page">
        <Tabs />
        <Schedule />
        <Terminal />
    </div>
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
