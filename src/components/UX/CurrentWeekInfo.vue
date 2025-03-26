<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import eventBus from '../../eventBus.js';

const showCurrentWeek = ref(false);

function updateCurrentWeek(value) {
    showCurrentWeek.value = value;
}

onMounted(() => {
    eventBus.on('toggleCurrentWeek', updateCurrentWeek);
});

onUnmounted(() => {
    eventBus.off('toggleCurrentWeek', updateCurrentWeek);
});
</script>

<template>
    <div v-if="!showCurrentWeek" class="current-week-info">
        <label
            >Текущая неделя
            <br />
            выделена цветом
        </label>

        <span class="color-box"></span>
    </div>
</template>

<style scoped>
.current-week-info {
    font-size: 1rem;
    font-family: Nunito;
    color: #ccc;
    display: flex;
    align-items: center;
    line-height: 1.2rem;
    gap: 1rem;
}

.color-box {
    display: inline-block;
    width: 2.75rem;
    height: 1.75rem;
    background-color: #313131;
    margin-left: 5px;
    border-radius: 2px;
}
</style>
