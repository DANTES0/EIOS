<script setup>
import Tabs from '../components/Tabs.vue';
import PrepodCard from '../components/PrepodavateliPageComponents/PrepodCard.vue';
import { useFetch } from '@vueuse/core';
import config from '../config';
import { onMounted } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue';

// import Terminal from '../components/Terminal.vue';
const url = computed(() => {
    return `${config.ServerURL}/api/v1/teacher/getAll`;
});
const items = ref([]);
const fetchPrepod = async () => {
    const response = await useFetch(url).json();

    items.value = response.data.value;

    console.log(response.data.value);
    // localStorage.theme = 'dark';
};

function getShortName(fullName) {
    // Разбиваем полное имя на части
    const nameParts = fullName.split(' ');

    // Проверяем, что количество частей соответствует Фамилия Имя Отчество
    if (nameParts.length === 3) {
        const [lastName, firstName, middleName] = nameParts;

        // Формируем сокращенное имя
        return `${lastName} ${firstName[0]}.${middleName[0]}.`;
    }

    // В случае некорректного формата возвращаем исходное имя
    return fullName;
}

onMounted(fetchPrepod);
</script>

<template>
    <div class="h-full">
        <tabs></tabs>
        <div
            class="flex flex-wrap mt-[30px] ml-[30px] mr-[30px] items-center justify-center gap-14"
        >
            <prepod-card
                v-for="(item, index) in items"
                :key="index"
                :name="getShortName(item.name)"
                :photo="item.photo"
                :rank="item.rank"
                :post="item.post"
                @click="$router.push('/teachers/detail')"
            ></prepod-card>
        </div>
    </div>
</template>

<style scoped></style>
