<template>
    <input type="checkbox" v-model="model" :value="value" />
    <span>{{ label }}</span>
</template>

<script setup>
    import { computed} from "vue";

    const props = defineProps({
        modelValue: { type: [Array, Boolean] },
        value: { type: [Boolean, Object] },
        label: { type: String },
    });

    const emit = defineEmits(["update:modelValue"]);

    const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
    });
</script>

<style>
    span {
        margin-left: 10px;
        user-select: none;
        
    }

    input[type="checkbox"] {
        appearance: none;
        height: 11px;
        width: 11px;
        background-color: transparent;
        border: 1px solid rgb(128, 128, 128);
        border-radius: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        outline:none;
    }

    input[type="checkbox"]:after {
        content: url("../assets/header/NewsFilters/tick.svg");
        transform: translateY(-1px) translateX(0.5px) scale(0.6);
        color: white;
        display: none;
    }
    input[type="checkbox"]:hover{
        background-color: transparent;
    }
    input[type="checkbox"]:checked{
        background-color: transparent;
        border: 1px solid rgb(0, 84, 255);
    }
    input[type="checkbox"]:checked:after{
        display: block;
    }
</style>