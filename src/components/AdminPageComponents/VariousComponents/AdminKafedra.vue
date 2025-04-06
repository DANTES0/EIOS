<script setup>
import KafedraListAdminVue from './KafedraListAdmin.vue';
</script>

<template>
    <div
        class="flex flex-col w-full text-[#0c2340] dark:text-white font-[JetBrainsMono] font-bold text-[24px]"
    >
        <div
            class="w-full h-[82px] dark:bg-[#181818] flex items-center border-b border-l border-[#2B2B2B]"
        >
            <div class="ml-[42px]">Разное</div>
        </div>
        <div class="mt-[20px] ml-[42px]">Раздел "Кафедра"</div>
        <div class="flex items-center justify-center flex-col">
            <KafedraListAdminVue></KafedraListAdminVue>
        </div>
    </div>
</template>

<style scoped></style>
