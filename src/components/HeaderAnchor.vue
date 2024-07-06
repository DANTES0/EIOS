<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import DropdownHeader from './MainPageComponents/DropdownHeader.vue';
import SearchTimetable from './TimetablePageComponents/SearchTimetable.vue';
import NewsFilters from './NewsPageComponents/NewsFilters.vue';

let bob= 0;
let poop=123;
let meh=123;
let errorconnt=124234;
// this.$refs.dropbtn.addEventListener("click", function (event) {
//   document.getElementById("myDropdown").classList.toggle("show")
//   console.log("click")
// })
//Закрыть раскрывающийся список, если пользователь щелкнет за его пределами.
//window.onclick = function (event) {

//   // if (!event.target.matches(".dropbtn")) {
//   //   var dropdowns = document.getElementsByClassName("dropdown-content")
//   //   var i

//   //   for (i = 0; i < dropdowns.length; i++) {
//   //     var openDropdown = dropdowns[i]
//   //     if (openDropdown.classList.contains("show")) {
//   //       openDropdown.classList.remove("show")
//   //     }
//   //   }
//   // }
// }
</script>
<template>
  <div v-if="$route.path == `/`" class="dropdown-anchor">
    <DropdownHeader></DropdownHeader>
  </div>
  <div v-if="$route.path == `/timetable`" class="search-timetable-anchor">
    <SearchTimetable></SearchTimetable>
  </div>
  <div v-if="$route.path == `/news`" class="news-filters">
    <NewsFilters></NewsFilters>
  </div>
</template>
<style>

</style>
