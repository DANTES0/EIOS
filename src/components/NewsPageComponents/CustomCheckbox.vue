<script setup>
import IconTick from '../Icons/Icon/IconTick.vue';

const props = defineProps({
    modelValue: Boolean,
    label: String,
});

const emit = defineEmits(['update:modelValue']);

function toggleCheckbox() {
    emit('update:modelValue', !props.modelValue);
}
</script>

<template>
    <div class="custom-checkbox-wrapper" @click="toggleCheckbox">
        <div class="checkbox" :class="{ checkedValue: props.modelValue }">
            <input type="checkbox" :checked="props.modelValue" />
            <IconTick
                v-if="props.modelValue"
                class="checkbox-icon"
                width="14"
                height="14"
            />
        </div>
        <span id="checkbox-category">{{ label }}</span>
    </div>
</template>

<style scoped>
#checkbox-category {
    margin-left: 10px;
    user-select: none;
    color: rgb(134, 134, 134);
    font-family: Nunito;
    font-size: 1rem;
    font-weight: 300;
    cursor: pointer;
}
#checkbox-category:hover {
    color: #ddd;
}
.checkbox {
    position: relative;
    width: 20px;
    height: 20px;
    border: 1px solid rgb(128, 128, 128);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.checkbox input[type='checkbox'] {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}
.checkbox-icon {
    display: none;
    color: #ffff;
}
input[type='checkbox']:checked + .checkbox-icon {
    display: block;
}
.checkedValue {
    border: 1px solid rgb(0, 84, 255);
}
.custom-checkbox-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
}
.custom-checkbox-wrapper:hover #checkbox-category {
    color: #ddd;
}
.custom-checkbox-wrapper:hover .checkbox {
    border: 1px solid rgb(0, 84, 255);
}
</style>
