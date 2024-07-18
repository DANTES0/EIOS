<script setup>
defineProps({
    iconName: { type: String, default: 'box' },
    width: { type: [Number, String] },
    height: { type: [Number, String] },
    iconColor: { type: String, default: 'currentColor' },
});
</script>

<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height"
        viewBox="0 0 18 18"
        :aria-labelledby="iconName"
        role="presentation"
    >
        <g :fill="iconColor">
            <slot />
        </g>
    </svg>
</template>

<style scoped>
svg {
    display: inline-block;
    vertical-align: baseline;
    margin-bottom: -2px; /* yes, I'm that particular about formatting */
}
</style>
