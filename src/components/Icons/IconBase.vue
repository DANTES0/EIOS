<script setup>
defineProps({
    iconName: { type: String, default: 'box' },
    width: { type: [Number, String], default: 20 },
    height: { type: [Number, String], default: 20 },
    iconColor: { type: String, default: 'currentColor' },
});
</script>

<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 18 18"
        :aria-labelledby="iconName"
        role="presentation"
        :width="width"
        :height="height"
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
