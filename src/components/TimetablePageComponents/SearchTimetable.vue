<script setup>
import { ref } from "vue";
import "vue3-select-component/dist/style.css";
import VueSelect from "vue3-select-component";
import Multiselect from '@vueform/multiselect'
let options = ["1", "2", "3"]
const selected = ref("");
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
    
    <div class="input-search">
        <VueSelect
    v-model="selected"
    placeholder="Поиск..."
    :options="[
      { label: 'Option #1', value: 'option_1' },
      { label: 'Option #2', value: 'option_2' },
      { label: 'Option #3', value: 'option_3' },
      { label: 'Option #3', value: 'option_3' },
      { label: 'Option #3', value: 'option_3' },
      { label: 'Option #3', value: 'option_3' },
      { label: 'Option #3', value: 'option_3' },
      { label: 'Option #3', value: 'option_3' },
    ]"
  />
        <!-- <input placeholder="Поиск..." type="" class="input-search-input">
        <select class="select-input" name="" id="">
            <option value=""></option>
        </select> -->
    </div>
    
    </div>
</template>
<!-- src="@vueform/multiselect/themes/default.css" -->
<style scoped>
@font-face {
  font-family: JetBrainsMono;
  src: url("../../assets/JetBrainsMono.ttf");
}
.dropdown-icon {
    width: 100px;
}
:root {
    --vs-input-placeholder-color: #5C5C5C;
    --vs-input-bg: transparent;
    --vs-input-outline: #e4e4e7;
    --vs-border: 1px solid #e4e4e7;
    --vs-border-radius: 0;
    --vs-text-color: #e4e4e7;
    --vs-font-weight: 200;
    --vs-line-height: 1;
    --vs-font-family: JetBrainsMono;
    
    /* Для option */
    /* --vs-menu-bg: transparent; */
    --vs-menu-bg: #181818;
    --vs-option-hover-color: #363535;
    --vs-option-focused-color: transparent;
    --vs-option-selected-color: #363535;

    --vs-multi-value-xmark-color: #e4e4e7 ;
    

    --vs-icon-color: #ff0000;
    --vs-icon-size: 20px;
    /* --vs-font-family: JetBrainsMono; */
}

:deep(.vue-select) {
    font-family: JetBrainsMono;
    background-color: transparent;
  width: 220px;
  margin-top: 30px;
  z-index: 1;
}
:deep(.search-input) {
    color: #ffffff;
    background-color: transparent;
    -webkit-input-placeholder:#5C5C5C
}
:deep(.search-input::placeholder) {
    color:#a7a7a7
}
:deep(.control) {
    background-color: transparent;
}
:deep(.control.focused) {
    background-color: transparent;
    border-color: #1E66F5;
    /* box-shadow: #b3b3b3; */
}
:deep(.dropdown-icon svg) {
    fill: #e4e4e7;
}
:deep(.clear-button svg) {
    fill: #e4e4e7;
}
:deep(.single-value) {
    color: #ffffff;
    z-index: 0;
}
:deep(.menu) {
    background-color: transparent;
    border: 1px solid #1E66F5;
}
:deep(.menu-option) {
    background-color: #181818;
    color: white;
}
:deep(.menu-option:hover) {
    background-color: #5C5C5C;
}
:deep(.menu-option.focused) {
    background-color: transparent
}
:deep(.menu-option.selected) {
    background-color: #5C5C5C
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