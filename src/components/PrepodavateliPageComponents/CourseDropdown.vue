<script setup>
import { ref } from 'vue';

const hideDropdown = ref(true);
</script>

<template>
    <div
        class="flex flex-col w-full max-w-[718px] min-h-[50px] bg-[#181818] border-[1.5px] border-[#2B2B2B] anima"
        @click="hideDropdown = !hideDropdown"
    >
        <div class="flex flex-row min-h-[50px] items-center">
            <div class="font-extrabold text-[20px] ml-[40px]">
                Компьютерная геометрия и графика
            </div>
            <img class="ml-auto mr-[40px]" src="../../assets/admin/bottom.svg" />
        </div>
        <div
            class="mx-auto mt-[25px] mb-[25px] h-full w-[80%] bg-[#2B2B2B]"
            :class="hideDropdown ? `hidden` : `block`"
        >
            <div class="flex flex-col gap-2 ml-[34px] mt-[8px] pb-[10px]">
                <a href="https://github.com/">Методичка</a>
                <div>Материалы к курсовой</div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
