<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue';
import Paginator from 'primevue/paginator';

const props = defineProps({
    totalRecords: {
        type: Number,
        required: true,
    },
    rowsPerPage: {
        type: Number,
        default: 1,
    },
    modelValue: {
        type: Number,
        default: 1,
    },
});

const emit = defineEmits(['update:modelValue']);

const totalPages = computed(() => Math.ceil(props.totalRecords / props.rowsPerPage));

watch(
    () => props.modelValue,
    (newValue) => {
        if (newValue > totalPages.value) {
            emit('update:modelValue', totalPages.value);
        }
    },
);

function onPageChange(event) {
    emit('update:modelValue', event.page + 1);
}
</script>

<template>
    <div class="card">
        <Paginator
            :rows="rowsPerPage"
            :total-records="totalRecords"
            :page-link-size="10"
            :first="(modelValue - 1) * rowsPerPage"
            class="custom-paginator"
            @page="onPageChange"
        />
    </div>
</template>

<style scoped>
:deep(.p-paginator) {
    font-family: JetBrainsMono;
    font-size: 1rem;
}
.custom-paginator {
    --p-paginator-background: transparent;
    --p-paginator-border-radius: 0px;
    --p-paginator-nav-button-border-radius: 0px;
    --p-paginator-nav-button-selected-background: rgb(0, 84, 255);
    --p-paginator-nav-button-selected-color: #ececec;
    --p-paginator-nav-button-hover-background: #e5e7eb;
    --p-paginator-nav-button-hover-color: rgb(0, 84, 255);
}
/*  */
html.dark .custom-paginator {
    --p-paginator-background: transparent;
    --p-paginator-border-radius: 0px;
    --p-paginator-nav-button-border-radius: 0px;
    --p-paginator-nav-button-selected-background: rgb(0, 84, 255);
    --p-paginator-nav-button-selected-color: #ececec;
    --p-paginator-nav-button-hover-background: #27272a;
    --p-paginator-nav-button-hover-color: #e5e7eb;
}
:deep(.p-paginator-current) {
    background-color: red;
}
</style>
