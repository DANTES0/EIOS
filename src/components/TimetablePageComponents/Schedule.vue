<script setup>
import { useFetch } from "@vueuse/core"
import { computed, ref, watch } from "vue"
import { onMounted } from "vue"
import {useStore} from "vuex"
import eventBus from "../../eventBus"
import config from "../../config"
const selectedOption = ref('1');
const isValidOption = (value) => {
  const teacherAndNumberRegex = /^teacher\d+$/;
  return teacherAndNumberRegex.test(value);
};
eventBus.on('optionSelected', (value) => {
  selectedOption.value = value;
});
const urlTeacher = ref('')
const url = ref('')
const schedule = computed(() => {
    if (isValidOption(selectedOption.value)) {
        url.value = `${config.KirURL}/api/schedule/teacher?teacherId=`+ selectedOption.value.replace(/\D/g, '')
    }else {
    url.value = `${config.KirURL}/api/schedule/group?groupId=`+ selectedOption.value
}
    console.log(url.value)
  return url.value
})

watch(selectedOption, () => {
    fetchSchedule();
});

// const store = useStore();
// const valueSelect = computed(()=>{
//     console.log(store.state.value)
//     return store.state.value
// })

const firstRowNechet = ref([{},{},{},{},{},{}])
const SecondRowNechet = ref([{},{},{},{},{},{}])
const ThirdRowNechet = ref([{},{},{},{},{},{}])
const FourthRowNechet = ref([{},{},{},{},{},{}])
const FifthRowNechet = ref([{},{},{},{},{},{}])
const SixthRowNechet = ref([{},{},{},{},{},{}])
const SeventhRowNechet = ref([{},{},{},{},{},{}])
const EighthRowNechet = ref([{},{},{},{},{},{}])
const NinethRowNechet = ref([{},{},{},{},{},{}])
const TenthRowNechet = ref([{},{},{},{},{},{}])
const EleventhRowNechet = ref([{},{},{},{},{},{}])
const TwelethRowNechet = ref([{},{},{},{},{},{}])
const ThirteenRowNechet = ref([{},{},{},{},{},{}])
const ThortheenRowNechet = ref([{},{},{},{},{},{}])
async function fetchSchedule() {
    firstRowNechet.value = [{},{},{},{},{},{}]
    SecondRowNechet.value = [{},{},{},{},{},{}]
    ThirdRowNechet.value = [{},{},{},{},{},{}]
    FourthRowNechet.value = [{},{},{},{},{},{}]
    SixthRowNechet.value = [{},{},{},{},{},{}]
    SeventhRowNechet.value = [{},{},{},{},{},{}]
    EighthRowNechet.value = [{},{},{},{},{},{}]
    NinethRowNechet.value = [{},{},{},{},{},{}]
    TenthRowNechet.value = [{},{},{},{},{},{}]
    FifthRowNechet.value = [{},{},{},{},{},{}]
    EleventhRowNechet.value = [{},{},{},{},{},{}]
    TwelethRowNechet.value = [{},{},{},{},{},{}]
    ThirteenRowNechet.value = [{},{},{},{},{},{}]
    ThortheenRowNechet.value = [{},{},{},{},{},{}]
  const response_prepod = await useFetch(schedule).json()
  const array = response_prepod.data.value;
  console.log(response_prepod.data.value)
  for (let i = 0; i< array.length; i++) {
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Понедельник" && array[i].timeStart == "09:00:00")
    firstRowNechet.value[0] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Вторник" && array[i].timeStart == "09:00:00")
    firstRowNechet.value[1] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Среда" && array[i].timeStart == "09:00:00")
    firstRowNechet.value[2] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Четверг" && array[i].timeStart == "09:00:00")
    firstRowNechet.value[3] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Пятница" && array[i].timeStart == "09:00:00")
    firstRowNechet.value[4] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Суббота" && array[i].timeStart == "09:00:00")
    firstRowNechet.value[5] = array[i]


    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Понедельник" && array[i].timeStart == "09:00:00")
    SecondRowNechet.value[0] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Вторник" && array[i].timeStart == "09:00:00")
    SecondRowNechet.value[1] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Среда" && array[i].timeStart == "09:00:00")
    SecondRowNechet.value[2] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Четверг" && array[i].timeStart == "09:00:00")
    SecondRowNechet.value[3] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Пятница" && array[i].timeStart == "09:00:00")
    SecondRowNechet.value[4] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Суббота" && array[i].timeStart == "09:00:00")
    SecondRowNechet.value[5] = array[i]

    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Понедельник" && array[i].timeStart == "10:50:00")
    ThirdRowNechet.value[0] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Вторник" && array[i].timeStart == "10:50:00")
    ThirdRowNechet.value[1] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Среда" && array[i].timeStart == "10:50:00")
    ThirdRowNechet.value[2] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Четверг" && array[i].timeStart == "10:50:00")
    ThirdRowNechet.value[3] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Пятница" && array[i].timeStart == "10:50:00")
    ThirdRowNechet.value[4] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Суббота" && array[i].timeStart == "10:50:00")
    ThirdRowNechet.value[5] = array[i]

    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Понедельник" && array[i].timeStart == "10:50:00")
    FourthRowNechet.value[0] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Вторник" && array[i].timeStart == "10:50:00")
    FourthRowNechet.value[1] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Среда" && array[i].timeStart == "10:50:00")
    FourthRowNechet.value[2] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Четверг" && array[i].timeStart == "10:50:00")
    FourthRowNechet.value[3] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Пятница" && array[i].timeStart == "10:50:00")
    FourthRowNechet.value[4] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Суббота" && array[i].timeStart == "10:50:00")
    FourthRowNechet.value[5] = array[i]

    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Понедельник" && array[i].timeStart == "12:40:00")
    FifthRowNechet.value[0] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Вторник" && array[i].timeStart == "12:40:00")
    FifthRowNechet.value[1] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Среда" && array[i].timeStart == "12:40:00")
    FifthRowNechet.value[2] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Четверг" && array[i].timeStart == "12:40:00")
    FifthRowNechet.value[3] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Пятница" && array[i].timeStart == "12:40:00")
    FifthRowNechet.value[4] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Суббота" && array[i].timeStart == "12:40:00")
    FifthRowNechet.value[5] = array[i]

    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Понедельник" && array[i].timeStart == "12:40:00")
    SixthRowNechet.value[0] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Вторник" && array[i].timeStart == "12:40:00")
    SixthRowNechet.value[1] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Среда" && array[i].timeStart == "12:40:00")
    SixthRowNechet.value[2] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Четверг" && array[i].timeStart == "12:40:00")
    SixthRowNechet.value[3] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Пятница" && array[i].timeStart == "12:40:00")
    SixthRowNechet.value[4] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Суббота" && array[i].timeStart == "12:40:00")
    SixthRowNechet.value[5] = array[i]

    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Понедельник" && array[i].timeStart == "14:55:00")
    SeventhRowNechet.value[0] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Вторник" && array[i].timeStart == "14:55:00")
    SeventhRowNechet.value[1] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Среда" && array[i].timeStart == "14:55:00")
    SeventhRowNechet.value[2] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Четверг" && array[i].timeStart == "14:55:00")
    SeventhRowNechet.value[3] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Пятница" && array[i].timeStart == "14:55:00")
    SeventhRowNechet.value[4] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Суббота" && array[i].timeStart == "14:55:00")
    SeventhRowNechet.value[5] = array[i]

    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Понедельник" && array[i].timeStart == "14:55:00")
    EighthRowNechet.value[0] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Вторник" && array[i].timeStart == "14:55:00")
    EighthRowNechet.value[1] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Среда" && array[i].timeStart == "14:55:00")
    EighthRowNechet.value[2] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Четверг" && array[i].timeStart == "14:55:00")
    EighthRowNechet.value[3] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Пятница" && array[i].timeStart == "14:55:00")
    EighthRowNechet.value[4] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Суббота" && array[i].timeStart == "14:55:00")
    EighthRowNechet.value[5] = array[i]

    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Понедельник" && array[i].timeStart == "16:45:00")
    NinethRowNechet.value[0] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Вторник" && array[i].timeStart == "16:45:00")
    NinethRowNechet.value[1] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Среда" && array[i].timeStart == "16:45:00")
    NinethRowNechet.value[2] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Четверг" && array[i].timeStart == "16:45:00")
    NinethRowNechet.value[3] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Пятница" && array[i].timeStart == "16:45:00")
    NinethRowNechet.value[4] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Суббота" && array[i].timeStart == "16:45:00")
    NinethRowNechet.value[5] = array[i]

    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Понедельник" && array[i].timeStart == "16:45:00")
    TenthRowNechet.value[0] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Вторник" && array[i].timeStart == "16:45:00")
    TenthRowNechet.value[1] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Среда" && array[i].timeStart == "16:45:00")
    TenthRowNechet.value[2] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Четверг" && array[i].timeStart == "16:45:00")
    TenthRowNechet.value[3] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Пятница" && array[i].timeStart == "16:45:00")
    TenthRowNechet.value[4] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Суббота" && array[i].timeStart == "16:45:00")
    TenthRowNechet.value[5] = array[i]

    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Понедельник" && array[i].timeStart == "18:30:00")
    EleventhRowNechet.value[0] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Вторник" && array[i].timeStart == "18:30:00")
    EleventhRowNechet.value[1] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Среда" && array[i].timeStart == "18:30:00")
    EleventhRowNechet.value[2] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Четверг" && array[i].timeStart == "18:30:00")
    EleventhRowNechet.value[3] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Пятница" && array[i].timeStart == "18:30:00")
    EleventhRowNechet.value[4] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Суббота" && array[i].timeStart == "18:30:00")
    EleventhRowNechet.value[5] = array[i]

    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Понедельник" && array[i].timeStart == "18:30:00")
    TwelethRowNechet.value[0] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Вторник" && array[i].timeStart == "18:30:00")
    TwelethRowNechet.value[1] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Среда" && array[i].timeStart == "18:30:00")
    TwelethRowNechet.value[2] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Четверг" && array[i].timeStart == "18:30:00")
    TwelethRowNechet.value[3] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Пятница" && array[i].timeStart == "18:30:00")
    TwelethRowNechet.value[4] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Суббота" && array[i].timeStart == "18:30:00")
    TwelethRowNechet.value[5] = array[i]

    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Понедельник" && array[i].timeStart == "20:05:00")
    ThirteenRowNechet.value[0] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Вторник" && array[i].timeStart == "20:05:00")
    ThirteenRowNechet.value[1] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Среда" && array[i].timeStart == "20:05:00")
    ThirteenRowNechet.value[2] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Четверг" && array[i].timeStart == "20:05:00")
    ThirteenRowNechet.value[3] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Пятница" && array[i].timeStart == "20:05:00")
    ThirteenRowNechet.value[4] = array[i]
    if(array[i].parityOfWeek == "нечетная" && array[i].dayOfWeek == "Суббота" && array[i].timeStart == "20:05:00")
    ThirteenRowNechet.value[5] = array[i]

    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Понедельник" && array[i].timeStart == "20:05:00")
    ThortheenRowNechet.value[0] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Вторник" && array[i].timeStart == "20:05:00")
    ThortheenRowNechet.value[1] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Среда" && array[i].timeStart == "20:05:00")
    ThortheenRowNechet.value[2] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Четверг" && array[i].timeStart == "20:05:00")
    ThortheenRowNechet.value[3] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Пятница" && array[i].timeStart == "20:05:00")
    ThortheenRowNechet.value[4] = array[i]
    if(array[i].parityOfWeek == "четная" && array[i].dayOfWeek == "Суббота" && array[i].timeStart == "20:05:00")
    ThortheenRowNechet.value[5] = array[i]

  }
//   console.log(firstRowNechet)

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
                        <div class="title-item">{{firstRowNechet[0].subjectName}}</div>
                        <div class="type-item">{{firstRowNechet[0].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{firstRowNechet[0].teacherName}}</div>
                            <div class="auditoriya-item">{{firstRowNechet[0].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{firstRowNechet[1].subjectName}}</div>
                        <div class="type-item">{{firstRowNechet[1].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{firstRowNechet[1].teacherName}}</div>
                            <div class="auditoriya-item">{{firstRowNechet[1].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{firstRowNechet[2].subjectName}}</div>
                        <div class="type-item">{{firstRowNechet[2].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{firstRowNechet[2].teacherName}}</div>
                            <div class="auditoriya-item">{{firstRowNechet[2].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{firstRowNechet[3].subjectName}}</div>
                        <div class="type-item">{{firstRowNechet[3].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{firstRowNechet[3].teacherName}}</div>
                            <div class="auditoriya-item">{{firstRowNechet[3].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{firstRowNechet[4].subjectName}}</div>
                        <div class="type-item">{{firstRowNechet[4].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{firstRowNechet[4].teacherName}}</div>
                            <div class="auditoriya-item">{{firstRowNechet[4].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{firstRowNechet[5].subjectName}}</div>
                        <div class="type-item">{{firstRowNechet[5].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{firstRowNechet[5].teacherName}}</div>
                            <div class="auditoriya-item">{{firstRowNechet[5].classroom}}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">9:00 10:30</div>
                        <div class="type-week">Чет</div></th>
                    <td>
                        <div class="title-item">{{SecondRowNechet[0].subjectName}}</div>
                        <div class="type-item">{{SecondRowNechet[0].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{SecondRowNechet[0].teacherName}}</div>
                            <div class="auditoriya-item">{{SecondRowNechet[0].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{SecondRowNechet[1].subjectName}}</div>
                        <div class="type-item">{{SecondRowNechet[1].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{SecondRowNechet[1].teacherName}}</div>
                            <div class="auditoriya-item">{{SecondRowNechet[1].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{SecondRowNechet[2].subjectName}}</div>
                        <div class="type-item">{{SecondRowNechet[2].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{SecondRowNechet[2].teacherName}}</div>
                            <div class="auditoriya-item">{{SecondRowNechet[2].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{SecondRowNechet[3].subjectName}}</div>
                        <div class="type-item">{{SecondRowNechet[3].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{SecondRowNechet[3].teacherName}}</div>
                            <div class="auditoriya-item">{{SecondRowNechet[3].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{SecondRowNechet[4].subjectName}}</div>
                        <div class="type-item">{{SecondRowNechet[4].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{SecondRowNechet[4].teacherName}}</div>
                            <div class="auditoriya-item">{{SecondRowNechet[4].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{SecondRowNechet[5].subjectName}}</div>
                        <div class="type-item">{{SecondRowNechet[5].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{SecondRowNechet[5].teacherName}}</div>
                            <div class="auditoriya-item">{{SecondRowNechet[5].classroom}}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">10:50 12:20</div>
                        <div class="type-week">Нечет</div></th>
                    <td>
                        <div class="title-item">{{ThirdRowNechet[0].subjectName}}</div>
                        <div class="type-item">{{ThirdRowNechet[0].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{ThirdRowNechet[0].teacherName}}</div>
                            <div class="auditoriya-item">{{ThirdRowNechet[0].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{ThirdRowNechet[1].subjectName}}</div>
                        <div class="type-item">{{ThirdRowNechet[1].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{ThirdRowNechet[1].teacherName}}</div>
                            <div class="auditoriya-item">{{ThirdRowNechet[1].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{ThirdRowNechet[2].subjectName}}</div>
                        <div class="type-item">{{ThirdRowNechet[2].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{ThirdRowNechet[2].teacherName}}</div>
                            <div class="auditoriya-item">{{ThirdRowNechet[2].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{ThirdRowNechet[3].subjectName}}</div>
                        <div class="type-item">{{ThirdRowNechet[3].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{ThirdRowNechet[3].teacherName}}</div>
                            <div class="auditoriya-item">{{ThirdRowNechet[3].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{ThirdRowNechet[4].subjectName}}</div>
                        <div class="type-item">{{ThirdRowNechet[4].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{ThirdRowNechet[4].teacherName}}</div>
                            <div class="auditoriya-item">{{ThirdRowNechet[4].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{ThirdRowNechet[5].subjectName}}</div>
                        <div class="type-item">{{ThirdRowNechet[5].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{ThirdRowNechet[5].teacherName}}</div>
                            <div class="auditoriya-item">{{ThirdRowNechet[5].classroom}}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">10:50 12:20</div>
                        <div class="type-week">Чет</div></th>
                    <td>
                        <div class="title-item">{{FourthRowNechet[0].subjectName}}</div>
                        <div class="type-item">{{FourthRowNechet[0].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{FourthRowNechet[0].teacherName}}</div>
                            <div class="auditoriya-item">{{FourthRowNechet[0].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{FourthRowNechet[1].subjectName}}</div>
                        <div class="type-item">{{FourthRowNechet[1].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{FourthRowNechet[1].teacherName}}</div>
                            <div class="auditoriya-item">{{FourthRowNechet[1].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{FourthRowNechet[2].subjectName}}</div>
                        <div class="type-item">{{FourthRowNechet[2].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{FourthRowNechet[2].teacherName}}</div>
                            <div class="auditoriya-item">{{FourthRowNechet[2].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{FourthRowNechet[3].subjectName}}</div>
                        <div class="type-item">{{FourthRowNechet[3].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{FourthRowNechet[3].teacherName}}</div>
                            <div class="auditoriya-item">{{FourthRowNechet[3].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{FourthRowNechet[4].subjectName}}</div>
                        <div class="type-item">{{FourthRowNechet[4].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{FourthRowNechet[4].teacherName}}</div>
                            <div class="auditoriya-item">{{FourthRowNechet[4].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{FourthRowNechet[5].subjectName}}</div>
                        <div class="type-item">{{FourthRowNechet[5].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{FourthRowNechet[5].teacherName}}</div>
                            <div class="auditoriya-item">{{FourthRowNechet[5].classroom}}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">12:40 14:10</div>
                        <div class="type-week">Нечет</div></th>
                    <td>
                        <div class="title-item">{{FifthRowNechet[0].subjectName}}</div>
                        <div class="type-item">{{FifthRowNechet[0].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{FifthRowNechet[0].teacherName}}</div>
                            <div class="auditoriya-item">{{FifthRowNechet[0].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{FifthRowNechet[1].subjectName}}</div>
                        <div class="type-item">{{FifthRowNechet[1].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{FifthRowNechet[1].teacherName}}</div>
                            <div class="auditoriya-item">{{FifthRowNechet[1].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{FifthRowNechet[2].subjectName}}</div>
                        <div class="type-item">{{FifthRowNechet[2].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{FifthRowNechet[2].teacherName}}</div>
                            <div class="auditoriya-item">{{FifthRowNechet[2].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{FifthRowNechet[3].subjectName}}</div>
                        <div class="type-item">{{FifthRowNechet[3].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{FifthRowNechet[3].teacherName}}</div>
                            <div class="auditoriya-item">{{FifthRowNechet[3].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{FifthRowNechet[4].subjectName}}</div>
                        <div class="type-item">{{FifthRowNechet[4].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{FifthRowNechet[4].teacherName}}</div>
                            <div class="auditoriya-item">{{FifthRowNechet[4].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{FifthRowNechet[5].subjectName}}</div>
                        <div class="type-item">{{FifthRowNechet[5].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{FifthRowNechet[5].teacherName}}</div>
                            <div class="auditoriya-item">{{FifthRowNechet[5].classroom}}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">12:40 14:10</div>
                        <div class="type-week">Чет</div></th>
                    <td>
                        <div class="title-item">{{SixthRowNechet[0].subjectName}}</div>
                        <div class="type-item">{{SixthRowNechet[0].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{SixthRowNechet[0].teacherName}}</div>
                            <div class="auditoriya-item">{{SixthRowNechet[0].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{SixthRowNechet[1].subjectName}}</div>
                        <div class="type-item">{{SixthRowNechet[1].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{SixthRowNechet[1].teacherName}}</div>
                            <div class="auditoriya-item">{{SixthRowNechet[1].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{SixthRowNechet[2].subjectName}}</div>
                        <div class="type-item">{{SixthRowNechet[2].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{SixthRowNechet[2].teacherName}}</div>
                            <div class="auditoriya-item">{{SixthRowNechet[2].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{SixthRowNechet[3].subjectName}}</div>
                        <div class="type-item">{{SixthRowNechet[3].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{SixthRowNechet[3].teacherName}}</div>
                            <div class="auditoriya-item">{{SixthRowNechet[3].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{SixthRowNechet[4].subjectName}}</div>
                        <div class="type-item">{{SixthRowNechet[4].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{SixthRowNechet[4].teacherName}}</div>
                            <div class="auditoriya-item">{{SixthRowNechet[4].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{SixthRowNechet[5].subjectName}}</div>
                        <div class="type-item">{{SixthRowNechet[5].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{SixthRowNechet[5].teacherName}}</div>
                            <div class="auditoriya-item">{{SixthRowNechet[5].classroom}}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">14:55 16:25</div>
                        <div class="type-week">Нечет</div></th>
                    <td>
                        <div class="title-item">{{SeventhRowNechet[0].subjectName}}</div>
                        <div class="type-item">{{SeventhRowNechet[0].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{SeventhRowNechet[0].teacherName}}</div>
                            <div class="auditoriya-item">{{SeventhRowNechet[0].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{SeventhRowNechet[1].subjectName}}</div>
                        <div class="type-item">{{SeventhRowNechet[1].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{SeventhRowNechet[1].teacherName}}</div>
                            <div class="auditoriya-item">{{SeventhRowNechet[1].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{SeventhRowNechet[2].subjectName}}</div>
                        <div class="type-item">{{SeventhRowNechet[2].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{SeventhRowNechet[2].teacherName}}</div>
                            <div class="auditoriya-item">{{SeventhRowNechet[2].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{SeventhRowNechet[3].subjectName}}</div>
                        <div class="type-item">{{SeventhRowNechet[3].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{SeventhRowNechet[3].teacherName}}</div>
                            <div class="auditoriya-item">{{SeventhRowNechet[3].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{SeventhRowNechet[4].subjectName}}</div>
                        <div class="type-item">{{SeventhRowNechet[4].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{SeventhRowNechet[4].teacherName}}</div>
                            <div class="auditoriya-item">{{SeventhRowNechet[4].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{SeventhRowNechet[5].subjectName}}</div>
                        <div class="type-item">{{SeventhRowNechet[5].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{SeventhRowNechet[5].teacherName}}</div>
                            <div class="auditoriya-item">{{SeventhRowNechet[5].classroom}}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">14:55 16:25</div>
                        <div class="type-week">Чет</div></th>
                    <td>
                        <div class="title-item">{{EighthRowNechet[0].subjectName}}</div>
                        <div class="type-item">{{EighthRowNechet[0].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{EighthRowNechet[0].teacherName}}</div>
                            <div class="auditoriya-item">{{EighthRowNechet[0].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{EighthRowNechet[1].subjectName}}</div>
                        <div class="type-item">{{EighthRowNechet[1].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{EighthRowNechet[1].teacherName}}</div>
                            <div class="auditoriya-item">{{EighthRowNechet[1].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{EighthRowNechet[2].subjectName}}</div>
                        <div class="type-item">{{EighthRowNechet[2].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{EighthRowNechet[2].teacherName}}</div>
                            <div class="auditoriya-item">{{EighthRowNechet[2].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{EighthRowNechet[3].subjectName}}</div>
                        <div class="type-item">{{EighthRowNechet[3].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{EighthRowNechet[3].teacherName}}</div>
                            <div class="auditoriya-item">{{EighthRowNechet[3].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{EighthRowNechet[4].subjectName}}</div>
                        <div class="type-item">{{EighthRowNechet[4].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{EighthRowNechet[4].teacherName}}</div>
                            <div class="auditoriya-item">{{EighthRowNechet[4].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{EighthRowNechet[5].subjectName}}</div>
                        <div class="type-item">{{EighthRowNechet[5].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{EighthRowNechet[5].teacherName}}</div>
                            <div class="auditoriya-item">{{EighthRowNechet[5].classroom}}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">16:45 18:15</div>
                        <div class="type-week">Нечет</div></th>
                    <td>
                        <div class="title-item">{{NinethRowNechet[0].subjectName}}</div>
                        <div class="type-item">{{NinethRowNechet[0].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{NinethRowNechet[0].teacherName}}</div>
                            <div class="auditoriya-item">{{NinethRowNechet[0].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{NinethRowNechet[1].subjectName}}</div>
                        <div class="type-item">{{NinethRowNechet[1].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{NinethRowNechet[1].teacherName}}</div>
                            <div class="auditoriya-item">{{NinethRowNechet[1].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{NinethRowNechet[2].subjectName}}</div>
                        <div class="type-item">{{NinethRowNechet[2].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{NinethRowNechet[2].teacherName}}</div>
                            <div class="auditoriya-item">{{NinethRowNechet[2].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{NinethRowNechet[3].subjectName}}</div>
                        <div class="type-item">{{NinethRowNechet[3].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{NinethRowNechet[3].teacherName}}</div>
                            <div class="auditoriya-item">{{NinethRowNechet[3].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{NinethRowNechet[4].subjectName}}</div>
                        <div class="type-item">{{NinethRowNechet[4].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{NinethRowNechet[4].teacherName}}</div>
                            <div class="auditoriya-item">{{NinethRowNechet[4].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{NinethRowNechet[5].subjectName}}</div>
                        <div class="type-item">{{NinethRowNechet[5].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{NinethRowNechet[5].teacherName}}</div>
                            <div class="auditoriya-item">{{NinethRowNechet[5].classroom}}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">16:45 18:15</div>
                        <div class="type-week">Чет</div></th>
                    <td>
                        <div class="title-item">{{TenthRowNechet[0].subjectName}}</div>
                        <div class="type-item">{{TenthRowNechet[0].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{TenthRowNechet[0].teacherName}}</div>
                            <div class="auditoriya-item">{{TenthRowNechet[0].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{TenthRowNechet[1].subjectName}}</div>
                        <div class="type-item">{{TenthRowNechet[1].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{TenthRowNechet[1].teacherName}}</div>
                            <div class="auditoriya-item">{{TenthRowNechet[1].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{TenthRowNechet[2].subjectName}}</div>
                        <div class="type-item">{{TenthRowNechet[2].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{TenthRowNechet[2].teacherName}}</div>
                            <div class="auditoriya-item">{{TenthRowNechet[2].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{TenthRowNechet[3].subjectName}}</div>
                        <div class="type-item">{{TenthRowNechet[3].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{TenthRowNechet[3].teacherName}}</div>
                            <div class="auditoriya-item">{{TenthRowNechet[3].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{TenthRowNechet[4].subjectName}}</div>
                        <div class="type-item">{{TenthRowNechet[4].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{TenthRowNechet[4].teacherName}}</div>
                            <div class="auditoriya-item">{{TenthRowNechet[4].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{TenthRowNechet[5].subjectName}}</div>
                        <div class="type-item">{{TenthRowNechet[5].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{TenthRowNechet[5].teacherName}}</div>
                            <div class="auditoriya-item">{{TenthRowNechet[5].classroom}}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">18:30 20:00</div>
                        <div class="type-week">Нечет</div></th>
                    <td>
                        <div class="title-item">{{EleventhRowNechet[0].subjectName}}</div>
                        <div class="type-item">{{EleventhRowNechet[0].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{EleventhRowNechet[0].teacherName}}</div>
                            <div class="auditoriya-item">{{EleventhRowNechet[0].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{EleventhRowNechet[1].subjectName}}</div>
                        <div class="type-item">{{EleventhRowNechet[1].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{EleventhRowNechet[1].teacherName}}</div>
                            <div class="auditoriya-item">{{EleventhRowNechet[1].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{EleventhRowNechet[2].subjectName}}</div>
                        <div class="type-item">{{EleventhRowNechet[2].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{EleventhRowNechet[2].teacherName}}</div>
                            <div class="auditoriya-item">{{EleventhRowNechet[2].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{EleventhRowNechet[3].subjectName}}</div>
                        <div class="type-item">{{EleventhRowNechet[3].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{EleventhRowNechet[3].teacherName}}</div>
                            <div class="auditoriya-item">{{EleventhRowNechet[3].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{EleventhRowNechet[4].subjectName}}</div>
                        <div class="type-item">{{EleventhRowNechet[4].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{EleventhRowNechet[4].teacherName}}</div>
                            <div class="auditoriya-item">{{EleventhRowNechet[4].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{EleventhRowNechet[5].subjectName}}</div>
                        <div class="type-item">{{EleventhRowNechet[5].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{EleventhRowNechet[5].teacherName}}</div>
                            <div class="auditoriya-item">{{EleventhRowNechet[5].classroom}}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">18:30 20:00</div>
                        <div class="type-week">Чет</div></th>
                    <td>
                        <div class="title-item">{{TwelethRowNechet[0].subjectName}}</div>
                        <div class="type-item">{{TwelethRowNechet[0].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{TwelethRowNechet[0].teacherId}}</div>
                            <div class="auditoriya-item">{{TwelethRowNechet[0].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{TwelethRowNechet[1].subjectName}}</div>
                        <div class="type-item">{{TwelethRowNechet[1].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{TwelethRowNechet[1].teacherId}}</div>
                            <div class="auditoriya-item">{{TwelethRowNechet[1].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{TwelethRowNechet[2].subjectName}}</div>
                        <div class="type-item">{{TwelethRowNechet[2].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{TwelethRowNechet[2].teacherId}}</div>
                            <div class="auditoriya-item">{{TwelethRowNechet[2].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{TwelethRowNechet[3].subjectName}}</div>
                        <div class="type-item">{{TwelethRowNechet[3].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{TwelethRowNechet[3].teacherId}}</div>
                            <div class="auditoriya-item">{{TwelethRowNechet[3].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{TwelethRowNechet[4].subjectName}}</div>
                        <div class="type-item">{{TwelethRowNechet[4].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{TwelethRowNechet[4].teacherId}}</div>
                            <div class="auditoriya-item">{{TwelethRowNechet[4].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{TwelethRowNechet[5].subjectName}}</div>
                        <div class="type-item">{{TwelethRowNechet[5].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{TwelethRowNechet[5].teacherId}}</div>
                            <div class="auditoriya-item">{{TwelethRowNechet[5].classroom}}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">20:05 21:35</div>
                        <div class="type-week">Нечет</div></th>
                    <td>
                        <div class="title-item">{{ThirteenRowNechet[0].subjectName}}</div>
                        <div class="type-item">{{ThirteenRowNechet[0].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{ThirteenRowNechet[0].teacherId}}</div>
                            <div class="auditoriya-item">{{ThirteenRowNechet[0].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{ThirteenRowNechet[1].subjectName}}</div>
                        <div class="type-item">{{ThirteenRowNechet[1].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{ThirteenRowNechet[1].teacherId}}</div>
                            <div class="auditoriya-item">{{ThirteenRowNechet[1].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{ThirteenRowNechet[2].subjectName}}</div>
                        <div class="type-item">{{ThirteenRowNechet[2].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{ThirteenRowNechet[2].teacherId}}</div>
                            <div class="auditoriya-item">{{ThirteenRowNechet[2].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{ThirteenRowNechet[3].subjectName}}</div>
                        <div class="type-item">{{ThirteenRowNechet[3].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{ThirteenRowNechet[3].teacherId}}</div>
                            <div class="auditoriya-item">{{ThirteenRowNechet[3].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{ThirteenRowNechet[4].subjectName}}</div>
                        <div class="type-item">{{ThirteenRowNechet[4].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{ThirteenRowNechet[4].teacherId}}</div>
                            <div class="auditoriya-item">{{ThirteenRowNechet[4].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{ThirteenRowNechet[5].subjectName}}</div>
                        <div class="type-item">{{ThirteenRowNechet[5].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{ThirteenRowNechet[5].teacherId}}</div>
                            <div class="auditoriya-item">{{ThirteenRowNechet[5].classroom}}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row"> <div class="time-schedule">20:05 21:35</div>
                        <div class="type-week">Чет</div></th>
                    <td>
                        <div class="title-item">{{ThortheenRowNechet[0].subjectName}}</div>
                        <div class="type-item">{{ThortheenRowNechet[0].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{ThortheenRowNechet[0].teacherId}}</div>
                            <div class="auditoriya-item">{{ThortheenRowNechet[0].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{ThortheenRowNechet[1].subjectName}}</div>
                        <div class="type-item">{{ThortheenRowNechet[1].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{ThortheenRowNechet[1].teacherId}}</div>
                            <div class="auditoriya-item">{{ThortheenRowNechet[1].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{ThortheenRowNechet[2].subjectName}}</div>
                        <div class="type-item">{{ThortheenRowNechet[2].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{ThortheenRowNechet[2].teacherId}}</div>
                            <div class="auditoriya-item">{{ThortheenRowNechet[2].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{ThortheenRowNechet[3].subjectName}}</div>
                        <div class="type-item">{{ThortheenRowNechet[3].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{ThortheenRowNechet[3].teacherId}}</div>
                            <div class="auditoriya-item">{{ThortheenRowNechet[3].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{ThortheenRowNechet[4].subjectName}}</div>
                        <div class="type-item">{{ThortheenRowNechet[4].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{ThortheenRowNechet[4].teacherId}}</div>
                            <div class="auditoriya-item">{{ThortheenRowNechet[4].classroom}}</div>
                        </div>
                    </td>
                    <td>
                        <div class="title-item">{{ThortheenRowNechet[5].subjectName}}</div>
                        <div class="type-item">{{ThortheenRowNechet[5].type}} </div>
                        <div class="prepodavatel-auditoriya">
                            <div class="prepodavatel-item">{{ThortheenRowNechet[5].teacherId}}</div>
                            <div class="auditoriya-item">{{ThortheenRowNechet[5].classroom}}</div>
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