<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
    itemHeight: {
        type: Number,
        default: 36, // Высота одного элемента в px
    },
    verticalPadding: {
        type: Number,
        default: 20, // Вертикальный отступ в px
    },
    horizontalPadding: {
        type: Number,
        default: 10, // Горизонтальный отступ в px
    },
    gap: {
        type: Number,
        default: 8, // Отступ между числами в px
    },
    maxNumbers: {
        type: Number,
        default: 50, // Максимальное количество чисел
    },
    // Новый параметр: множитель количества чисел при уменьшении экрана
    responsiveMultiplier: {
        type: Number,
        default: 1.2, // Увеличиваем количество чисел на 20% при адаптивности
    },
});

const numbers = ref([]);
const wrapperRef = ref(null);
const windowWidth = ref(window.innerWidth);
let resizeObserver = null;

// Отслеживаем изменение ширины окна
const updateWindowWidth = () => {
    windowWidth.value = window.innerWidth;
};

// Рассчитываем количество чисел с учетом адаптивности
const updateNumbers = () => {
    if (!wrapperRef.value?.parentElement) return;

    const parent = wrapperRef.value.parentElement;
    const parentHeight = parent.clientHeight;

    // Доступная высота для чисел (общая высота минус отступы)
    const availableHeight = parentHeight - props.verticalPadding * 2;

    // Базовое количество чисел без адаптивности
    let numbersCount = Math.floor(availableHeight / (props.itemHeight + props.gap));

    // Если экран узкий, увеличиваем количество чисел
    if (windowWidth.value < 1024) {
        // Например, для мобильных и планшетов
        numbersCount = Math.floor(numbersCount * props.responsiveMultiplier);
    }

    // Ограничиваем максимумом
    numbersCount = Math.min(numbersCount, props.maxNumbers);

    // Создаем массив чисел
    numbers.value = Array.from({ length: numbersCount }, (_, i) => i + 1);
};

onMounted(() => {
    updateNumbers();
    window.addEventListener('resize', updateWindowWidth);

    resizeObserver = new ResizeObserver(() => {
        updateNumbers();
    });

    if (wrapperRef.value?.parentElement) {
        resizeObserver.observe(wrapperRef.value.parentElement);
    }
});

onUnmounted(() => {
    window.removeEventListener('resize', updateWindowWidth);
    resizeObserver?.disconnect();
});

// Следим за изменением ширины окна и обновляем числа
watch(windowWidth, updateNumbers);
</script>

<template>
    <div
        ref="wrapperRef"
        class="numbers-wrapper"
        :style="{
            padding: `${verticalPadding}px ${horizontalPadding}px`,
            gap: `${gap}px`,
        }"
    >
        <div
            v-for="number in numbers"
            :key="number"
            class="number-item"
            :style="{ height: `${itemHeight}px` }"
        >
            {{ number }}
        </div>
    </div>
</template>

<style scoped>
.numbers-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
}

.number-item {
    display: flex;
    align-items: center;
    font-family: monospace;
    color: #0c2340;
}

.dark .number-item {
    color: #999999;
}
</style>
