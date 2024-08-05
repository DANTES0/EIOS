<script>
import { defineComponent } from 'vue';
import Paginator from 'primevue/paginator';

export default defineComponent({
    components: {
        Paginator,
    },
});
// total-records - это количество новостей
// rows - это количество новостей на одной странице
</script>

<template>
    <div class="card">
        <Paginator :rows="3" :total-records="120" page-link-size="10"></Paginator>
    </div>
</template>

<style scoped></style>
