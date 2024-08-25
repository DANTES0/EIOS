<script setup>
defineProps({
    width: { type: String, default: '200px' },
    height: { type: String, default: '50px' },
    text: { type: String, default: 'Кнопка' },
});
</script>

<template>
    <button
        class="w-full h-full bg-[#181818] text-[#CCCCCC] border-[#CCCCCC] border rounded-lg hover:border-[#006AFF] active:bg-[#2c2c2c] transition ease-linear delay-0"
        :style="[{ width: width, height: height }]"
    >
        {{ text }}
    </button>
</template>

<style scoped></style>
