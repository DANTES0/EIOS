<script setup>
import { useFetch } from "@vueuse/core"
import { computed, ref } from "vue"
import { onMounted } from "vue"
let flag = ref(false)
const schedule = computed(() => {
  return `http://25.61.98.183:8080/api/schedule/group?groupname=О714Б`
})
const fetchSchedule = async() => {
  const response_prepod = await useFetch(schedule).json()
  console.log(response_prepod.data.value)
}

onMounted(() => {
    fetchSchedule();
})
</script>
<template>
    <div class="shedule-wrap">
        <table>
            <thead>
                <tr>
                    <th style="width: 116px;" scope="col">Время</th>
                <th scope="col">Понедельник</th>
                <th scope="col">Вторник</th>
                <th scope="col">Среда</th>
                <th scope="col">Четверг</th>
                <th scope="col">Пятница</th>
                <th scope="col">Суббота</th>
                </tr>
                
            </thead>
            <tbody>
                <tr>
                    <th scope="row"> <div class="time-schedule">9:00 10:30</div>
                        <div class="type-week">Нечет</div></th>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">9:00 10:30</div>
                        <div class="type-week">Нечет</div></th>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">9:00 10:30</div>
                        <div class="type-week">Нечет</div></th>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">9:00 10:30</div>
                        <div class="type-week">Нечет</div></th>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">9:00 10:30</div>
                        <div class="type-week">Нечет</div></th>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">9:00 10:30</div>
                        <div class="type-week">Нечет</div></th>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">9:00 10:30</div>
                        <div class="type-week">Нечет</div></th>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">9:00 10:30</div>
                        <div class="type-week">Нечет</div></th>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">9:00 10:30</div>
                        <div class="type-week">Нечет</div></th>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">9:00 10:30</div>
                        <div class="type-week">Нечет</div></th>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">9:00 10:30</div>
                        <div class="type-week">Нечет</div></th>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">9:00 10:30</div>
                        <div class="type-week">Нечет</div></th>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">9:00 10:30</div>
                        <div class="type-week">Нечет</div></th>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">9:00 10:30</div>
                        <div class="type-week">Нечет</div></th>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">Безопасность жизнидеятельности</div>
                        <div class="type-item">Лекция </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">Буторина М.В</div>
                            <div class="auditoriya-item">315</div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style>
@font-face {
  font-family: JetBrainsMono;
  src: url("../../assets/JetBrainsMono.ttf");
}
.time-schedule {
    width: 75px;
    height: 67px;
    margin: 0 auto;
}
.prepodavatel-item {
    margin-left: 8px;
}
.auditoriya-item {
    margin-right: 15px;
}
.prepodavatel-auditoriya {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    color:#ccc;
    font-weight: 400;
}
.type-item {
    margin-bottom: 10px;
    font-size: 16px;
    color:#ccc;
    font-weight: 400;
    margin-left: 8px;
}
.title-item {
    width: 194px;
    height: 98px;
    margin-left: 8px;
}
table {
    font-family: JetBrainsMono;
    font-size: 24px;
    font-weight: 500;
    color: white;
    border: 1px solid white;
    border-right: none;
    border-bottom: none;
    margin-top: 30px;
}
tbody th {
    width: 116px;
    border-bottom: 1px solid white;
    border-right: 1px solid white;
    height: 179px;
}
tbody td {
    font-size: 17px;
    border-right: 1px solid white;
    border-bottom: 1px solid white;
}
tbody td p {
    font-size: 16px;
    font-weight: 400;
    color: #ccc;
}
thead th {
    border-bottom: 1px solid white;
    border-right: 1px solid white;
    width: 216px;
    height: 74px;
}
.shedule-wrap {
    width: 1412px;
    height: 2700px;
    /* border: 1px solid white; */
    /* margin-top: 30px; */
}
</style>