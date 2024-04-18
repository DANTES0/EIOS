<script setup>
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router";
import DropdownHeader from "./DropdownHeader.vue";
import SearchTimetable from "./SearchTimetable.vue"
import NewsFilters from "./NewsFilters.vue"

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
  <div v-if="$route.path == `/news`" class="search-timetable-anchor">
    <NewsFilters></NewsFilters>
  </div>
</template>
<style>

</style>
