<script setup>
import Tabs from '../components/Tabs.vue';
import PrepodCard from '../components/PrepodavateliPageComponents/PrepodCard.vue';
// import Terminal from '../components/Terminal.vue';
</script>

<template>
    <div class="h-full">
        <tabs></tabs>
        <div
            class="flex flex-wrap mt-[30px] ml-[30px] mr-[30px] items-center justify-center gap-14"
        >
            <prepod-card
                v-for="( , index) in 10"
                :key="index"
                @click="$router.push('/teachers/detail')"
            ></prepod-card>
        </div>
    </div>
</template>

<style scoped></style>
