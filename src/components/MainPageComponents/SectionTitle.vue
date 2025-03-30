<script setup>
import { computed } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    // Можно настроить базовую длину линии
    baseLength: {
        type: Number,
        default: 6,
    },
    // Множитель для длины тире (на каждый символ заголовка)
    lengthMultiplier: {
        type: Number,
        default: 0.1,
    },
});

// Создаем строку с тире нужной длины
const dashLine = computed(() => {
    const dashCount = Math.floor(
        props.baseLength + props.title.length * props.lengthMultiplier,
    );

    return '─'.repeat(dashCount); // Используем символ тире (U+2500)
});
</script>

<template>
    <div class="section-title-wrapper">
        <h1 class="section-title text-black dark:text-white">
            <span class="hash-sign">#</span>{{ title }}
        </h1>
        <div class="dashed-line text-[#006AFF] dark:text-white">
            {{ dashLine }}
        </div>
    </div>
</template>

<style scoped>
.section-title-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2rem;
}

.section-title {
    font-family: 'JetBrainsMono', monospace;
    font-weight: 200;
    font-size: 48px;
    margin: 0;
    padding-left: 70px;
    position: relative;
}

.hash-sign {
    color: #1e66f5;
}

.dashed-line {
    font-size: 48px;
    font-weight: 100;
    letter-spacing: 12px;
    user-select: none;
    /* position: relative;
    top: -38px;
    left: 71px; */
    line-height: 0;
    padding-left: 4rem;
}

/* Адаптивность */
@media (max-width: 1024px) {
    .section-title {
        font-size: 36px;
        padding-left: 80px;
    }

    .dashed-line {
        font-size: 36px;
        top: -28px;
        left: 50px;
        letter-spacing: 6px;
    }
}

@media (max-width: 768px) {
    .section-title {
        font-size: 28px;
        padding-left: 50px;
    }

    .dashed-line {
        font-size: 28px;
        top: -20px;
        left: 30px;
        letter-spacing: 5px;
    }
}
</style>
