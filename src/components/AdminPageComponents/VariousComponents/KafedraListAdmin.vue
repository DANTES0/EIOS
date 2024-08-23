<script setup>
import { onMounted, ref } from 'vue';
import IconEdit from '../../Icons/Icon/IconEdit.vue';
import IconBase from '../../Icons/IconBase.vue';
// import { fs } from 'fs';

defineProps({
    id: { type: String, default: '1', require: true },
    title: { type: String, default: 'Aboba', require: true },
    description: { type: String, default: 'Aboba11111', require: true },
});
</script>

<template>
    <div class="w-[95%] bg-[#181818] min-h-[152px] mt-[40px] flex flex-col relative">
        <div class="flex flex-row ml-[25px] font-bold text-[20px] mt-1">
            <div>{{ id }}.</div>
            <div class="ml-[20px]">{{ title }}</div>
            <div class="ml-auto mr-[20px]">X</div>
        </div>
        <div class="text-[16px] font-light ml-[25px] mt-2 w-[95%]">
            {{ description }}
        </div>
        <icon-base
            class="ml-auto absolute bottom-0 right-0 mr-[12px] !mb-[12px]"
            width="24"
            height="24"
            icon-color="#ffffff"
            ><icon-edit></icon-edit
        ></icon-base>
    </div>
</template>

<style scoped></style>
