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
            @page="onPageChange"
        />
    </div>
</template>

<style scoped>
:deep(.p-paginator) {
    font-family: JetBrainsMono;
    font-size: 1rem;
    background-color: transparent;
}
:deep(.p-paginator-page),
:deep(.p-paginator-next),
:deep(.p-paginator-prev),
:deep(.p-paginator-last),
:deep(.p-paginator-first) {
    border-radius: 0px;
}
</style>
