<script setup>
import DropdownHeader from './MainPageComponents/DropdownHeader.vue';
import SearchTimetable from './TimetablePageComponents/InputSearch.vue';
import CurrentWeekCheckbox from './UX/CurrentWeekCheckbox.vue';
import NewsFilters from './NewsPageComponents/NewsFilters.vue';
import SearchPrepod from './PrepodavateliPageComponents/SearchPrepod.vue';
import { ref } from 'vue';
import CustomCheckbox from './NewsPageComponents/CustomCheckbox.vue';
import eventBus from '../eventBus.js';

const showCurrentWeek = ref(false);

function toggleWeekFilter() {
    eventBus.emit('toggleCurrentWeek', showCurrentWeek.value);
}
</script>

<template>
    <div v-if="$route.path == `/`" class="dropdown-anchor">
        <DropdownHeader></DropdownHeader>
    </div>
    <div v-if="$route.path == `/timetable`" class="search-timetable-anchor">
        <SearchTimetable></SearchTimetable>
        <CurrentWeekCheckbox class="current-week-checkbox" />
    </div>
    <div v-if="$route.path == `/news`" class="news-filters">
        <NewsFilters></NewsFilters>
    </div>
    <div v-if="$route.path == `/teachers`" class=""><search-prepod></search-prepod></div>
</template>

<style scoped>
.current-week-checkbox {
    margin-left: 22px;
    margin-top: 12px;
}
</style>
