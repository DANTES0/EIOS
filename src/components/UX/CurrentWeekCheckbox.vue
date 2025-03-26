<script setup>
import { ref } from 'vue';
import CustomCheckbox from '../NewsPageComponents/CustomCheckbox.vue';
import eventBus from '../../eventBus.js';

const showCurrentWeek = ref(false);

function toggleWeekFilter() {
    eventBus.emit('toggleCurrentWeek', showCurrentWeek.value);
}
</script>

<template>
    <CustomCheckbox
        v-model="showCurrentWeek"
        label="Только текущая неделя"
        @update:model-value="toggleWeekFilter"
    />
</template>
