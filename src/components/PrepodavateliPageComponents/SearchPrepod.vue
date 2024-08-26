<script setup>
import { ref, watch } from 'vue';
import VInput from '../UX/VInput.vue';
import eventBus from '../../eventBus';

const searchItem = ref('');

watch(searchItem, (value) => {
    eventBus.emit('searchPrepod', value);
});
</script>

<template>
    <div class="w-[80%] flex flex-col ml-auto mr-auto">
        <div class="font-normal font-[JetBrainsMono]">Поиск преподавателей</div>
        <div class="h-[35px] mt-2">
            <v-input
                v-model="searchItem"
                style-input="classic"
                type-input="default"
            ></v-input>
        </div>
    </div>
</template>

<style scoped></style>
