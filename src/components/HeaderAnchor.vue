<script setup>
import DropdownHeader from './MainPageComponents/DropdownHeader.vue';
import SearchTimetable from './TimetablePageComponents/InputSearch.vue';
import CurrentWeekCheckbox from './UX/CurrentWeekCheckbox.vue';
import CurrentWeekInfo from './UX/CurrentWeekInfo.vue';
import NewsFilters from './NewsPageComponents/NewsFilters.vue';
import SearchPrepod from './PrepodavateliPageComponents/InputSearch.vue';
</script>

<template>
    <div v-if="$route.path == '/'" class="dropdown-anchor">
        <DropdownHeader></DropdownHeader>
    </div>
    <div v-if="$route.path == '/timetable'" class="search-timetable-anchor">
        <SearchTimetable></SearchTimetable>
        <CurrentWeekCheckbox class="current-week-checkbox" />
        <CurrentWeekInfo class="current-week-color"></CurrentWeekInfo>
    </div>
    <div v-if="$route.path == '/news'" class="news-filters">
        <NewsFilters></NewsFilters>
    </div>
    <div v-if="$route.path == '/teachers'">
        <SearchPrepod></SearchPrepod>
    </div>
</template>

<style scoped>
.current-week-checkbox {
    margin-left: 22px;
    margin-top: 12px;
}
.current-week-color {
    margin-top: 26px;
    margin-left: 22px;
}
</style>
