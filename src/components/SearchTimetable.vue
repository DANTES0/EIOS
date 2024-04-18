<script setup>
import Multiselect from '@vueform/multiselect'
let options = ["1", "2", "3"]

</script>
<template>
    <div class="search-timetable-wrap">
        <div class="search-timetable-text">
            Поиск по группе или преподавателю 
        </div>
        <!-- <Multiselect
        v-model="value"
      placeholder="Select your character"
      label="name"
      trackBy="name"
      :options="options"
      :searchable="true"
    /> -->
    <div class="input-search"><input placeholder="Поиск..." type="" class="input-search-input">
        <select class="select-input" name="" id="">
            <option value=""></option>
        </select></div>
    
    </div>
</template>
<!-- src="@vueform/multiselect/themes/default.css" -->
<style >
@font-face {
  font-family: JetBrainsMono;
  src: url("../assets/JetBrainsMono.ttf");
}
.select-input {
    height: 26px;
    border: 1px solid white;
    background-color: transparent;
}
.input-search-input {
    background-color: transparent;
    border: 1px solid white;
    width: 186px;
    height: 26px;
    outline: none;
    color: white;
    padding-left: 8px;
}
.input-search {
    margin-left: 22px;
}
.search-timetable-wrap{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}
.search-timetable-text {
    font-family: JetBrainsMono;
    color: #ccc;
    font-size: 16px;
    font-weight: 300;
    margin-left: 22px;
}
</style>