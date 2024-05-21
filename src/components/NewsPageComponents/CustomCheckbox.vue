<template>
    <div class="custom-checkbox-wrapper" @click="toggleCheckbox">
        <input type="checkbox" v-model="model" :value="value" />
        <span id="checkbox-category">{{ label }}</span>
    </div>
</template>

<script setup>
    import { computed } from "vue";

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

    function toggleCheckbox() {
        model.value = !model.value;
    }
</script>

<style>
    #checkbox-category {
        margin-left: 10px;
        user-select: none;

        color: rgb(134, 134, 134);
        font-family: Nunito;
        font-size: 14px;
        font-weight: 300;

        cursor: pointer;
    }

    #checkbox-category:hover {
        color: #ddd;
    }

    input[type="checkbox"] {
        appearance: none;
        height: 20px;
        width: 20px;
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
        content: url("../../assets/header/NewsFilters/tick.svg");
        transform: translateY(-1px) translateX(0.5px) scale(1.0);
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

    .custom-checkbox-wrapper {
        display: flex;
        height: 20px;
        /* width: 161px; */
        /* max-width: 161px; */
        cursor: pointer;
    }

    .custom-checkbox-wrapper:hover #checkbox-category {
        color: #ddd;
    }

    .custom-checkbox-wrapper:hover input[type="checkbox"] {
        background-color: transparent;
        border: 1px solid rgb(0, 84, 255);
    }

</style>