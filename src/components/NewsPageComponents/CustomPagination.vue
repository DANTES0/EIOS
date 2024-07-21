<script setup>
import { VPagination } from 'vuetify/components';
</script>

<template>
    <VPagination
        v-model:page="currentPage"
        class="custom-pagination"
        :length="10"
        :total-visible="10"
        prev-icon="mdi-chevron-left"
        next-icon="mdi-chevron-right"
        rounded="0"
        active-color="white"
        color="#686767"
        size="65px"
    />
</template>

<style>
@import url('vuetify/styles');

.custom-pagination .v-btn__content {
    font-family: JetBrainsMono;
    font-weight: 700;
    font-size: 36px;
}

*,
::before,
::after {
    box-sizing: content-box;
}
</style>
