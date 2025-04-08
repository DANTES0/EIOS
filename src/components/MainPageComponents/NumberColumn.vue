<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    itemHeight: {
        type: Number,
        default: 36, // Высота одного элемента в px
    },
    verticalPadding: {
        type: Number,
        default: 15, // Вертикальный отступ в px
    },
    horizontalPadding: {
        type: Number,
        default: 5, // Горизонтальный отступ в px
    },
    gap: {
        type: Number,
        default: 0, // Отступ между числами в px
    },
    maxNumbers: {
        type: Number,
        default: 50, // Максимальное количество чисел
    },
    responsiveMultiplier: {
        type: Number,
        default: 1.2, // Множитель для адаптивности
    },
    observeTarget: {
        type: Object, // ref на HTMLElement
        default: null,
    },
});

const numbers = ref([]);
const wrapperRef = ref(null);

// Рассчитываем количество чисел с учетом адаптивности
const updateNumbers = () => {
    const target = props.observeTarget?.value || wrapperRef.value?.parentElement;
    if (!target) return;

    // Получаем высоту родительского блока с помощью getBoundingClientRect
    const parentHeight = target.getBoundingClientRect().height;
    console.log('👀 Родительская высота:', parentHeight);

    // Общая доступная высота, за вычетом вертикальных отступов
    const availableHeight = parentHeight - props.verticalPadding * 2;
    console.log('📏 Доступная высота:', availableHeight);

    // Вычисляем количество элементов в зависимости от доступной высоты
    let numbersCount = Math.floor(availableHeight / (props.itemHeight + props.gap +  props.verticalPadding));
    console.log('📊 Количество элементов до округления:', availableHeight / (props.itemHeight + props.gap));
    console.log('📏 Количество элементов (после округления):', numbersCount);

    // Ограничиваем количество чисел максимальным значением
    numbersCount = Math.min(numbersCount, props.maxNumbers);

    // Если вычисленное количество чисел меньше maxNumbers, заполняем массив
    numbers.value = Array.from({ length: numbersCount + 1 }, (_, i) => i + 1);

    console.log('⚙️ Числа обновлены:', numbers.value);
};

onMounted(() => {
    updateNumbers(); // Изначально обновляем числа только один раз
});
</script>

<template>
    <div ref="wrapperRef" class="numbers-wrapper">
        <div
            v-for="number in numbers"
            :key="number"
            class="number-item numbers text-[#0C2340] dark:text-[#999999]"
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
    font-family: "JetBrainsMono";
    color: #0c2340;
}

.dark .number-item {
    color: #999999;
}
</style>
