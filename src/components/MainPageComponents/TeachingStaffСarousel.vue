<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<!-- eslint-disable vue/return-in-computed-property -->
<script setup>
import { useFetch } from '@vueuse/core';
import { computed, ref } from 'vue';
import { onMounted } from 'vue';
import PrepodavateliKafedriItem from './TeachingStaffСarouselItem.vue';
import ProgressSpinner from 'primevue/progressspinner';
import config from '../../config.js';
import router from '../../router/routes.js';

let flag = ref(false);
const prepod_url = computed(() => {
    return `${config.ServerURL}/api/v1/teacher?`;
});
let prepod = ref(null);
let currentIndex = ref(1);
let nextId = ref([]);
let prevId = ref([]);
let temp_array = ref([]);

const teachersAreLoading = ref(false);
const teachersAreLoaded = ref(false);

const fetchPrepod = async () => {
    teachersAreLoading.value = true; // Начало загрузки
    teachersAreLoaded.value = false;

    try {
        const { statusCode, data } = await useFetch(
            prepod_url.value +
                new URLSearchParams({
                    pageSize: 999,
                    pageNumber: 0,
                    cover: true,
                }).toString(),
        ).json();

        if (statusCode.value === 200) {
            prepod.value = data.value.data;
            prepod.value.forEach((item) => {
                item.teacherId = item.id; // Добавляем teacherId как свойство объекта
                console.log('TSsfs', data.value);
            });

            prepod.value.sort();
            console.log(prepod.value);

            for (let i = 0; i < prepod.value.length; i++) {
                prepod.value[i].id = i;

                if (prepod.value[i].id == prepod.value.length - 1) {
                    nextId.value[i] = 0;
                } else {
                    nextId.value[i] = i + 1;
                }

                if (prepod.value[i].id == 0) {
                    prevId.value[i] = prepod.value.length - 1;
                } else {
                    prevId.value[i] = i - 1;
                }
            }

            for (let i = 0; i < prepod.value.length; i++) {
                if (currentIndex.value == prepod.value[i].id) {
                    temp_array.value[0] = prepod.value[prevId.value[prevId.value[i]]]; // Скрытый предыдущий
                    temp_array.value[1] = prepod.value[prevId.value[i]]; // Предыдущий
                    temp_array.value[2] = prepod.value[currentIndex.value]; // Текущий
                    temp_array.value[3] = prepod.value[nextId.value[i]]; // Следующий
                    temp_array.value[4] = prepod.value[nextId.value[nextId.value[i]]]; // Скрытый следующий
                }
            }

            teachersAreLoaded.value = true;
        } else {
            teachersAreLoaded.value = false;
        }
    } catch (error) {
        console.log(error);
        teachersAreLoaded.value = false;
    } finally {
        teachersAreLoading.value = false;
    }
};

const next = computed(() => {
    currentIndex.value++;

    if (currentIndex.value + 1 == prepod.value.length + 1) {
        currentIndex.value = 0;
    }

    for (let i = 0; i < prepod.value.length; i++) {
        if (currentIndex.value == prepod.value[i].id) {
            temp_array.value[0] = prepod.value[prevId.value[prevId.value[i]]]; // Скрытый предыдущий
            temp_array.value[1] = prepod.value[prevId.value[i]]; // Предыдущий
            temp_array.value[2] = prepod.value[currentIndex.value]; // Текущий
            temp_array.value[3] = prepod.value[nextId.value[i]]; // Следующий
            temp_array.value[4] = prepod.value[nextId.value[nextId.value[i]]]; // Скрытый следующий
        }
    }
});

const prev = () => {
    currentIndex.value--;

    if (currentIndex.value == -1) {
        currentIndex.value = prepod.value.length - 1;
    }

    for (let i = 0; i < prepod.value.length; i++) {
        if (currentIndex.value == prepod.value[i].id) {
            temp_array.value[0] = prepod.value[prevId.value[prevId.value[i]]]; // Скрытый предыдущий
            temp_array.value[1] = prepod.value[prevId.value[i]]; // Предыдущий
            temp_array.value[2] = prepod.value[currentIndex.value]; // Текущий
            temp_array.value[3] = prepod.value[nextId.value[i]]; // Следующий
            temp_array.value[4] = prepod.value[nextId.value[nextId.value[i]]]; // Скрытый следующий
        }
    }
};

const goToTeacherDetail = (teacherId) => {
    router.push({ name: 'TeacherDetail', params: { id: teacherId } });
};

onMounted(() => {
    fetchPrepod();
});
</script>

<template>
    <div class="parent-wrapper">
        <div class="content-wrapper-prepod">
            <div v-if="teachersAreLoading" class="spinner-container">
                <progress-spinner class="custom-spinner" />
            </div>

            <div v-else-if="teachersAreLoaded" class="prepod-image-block">
                <div
                    style=""
                    class="prepod-image-arrow back-image-arrow"
                    @click="prev"
                ></div>
                <div class="PrepodavateliKafedriItem-wrap">
                    <PrepodavateliKafedriItem
                        v-for="(prepod, index) in temp_array"
                        :id="prepod.id"
                        :key="prepod.id"
                        :name="prepod.name"
                        :photo="`https://security-jwt.onrender.com/api/v1/image?fileName=${prepod.photo?.fileName}&imageType=TeacherImage`"
                        :post="prepod.post"
                        :rank="prepod.rank"
                        :current-index="currentIndex"
                        :class="{ hidden: index === 0 || index === 4 }"
                        @click="goToTeacherDetail(prepod.teacherId)"
                    />
                </div>
                <div
                    class="prepod-image-arrow next-image-arrow"
                    style="margin-left: 15px"
                    @click="next"
                ></div>
            </div>

            <div v-else class="error-message">
                <p>Ошибка загрузки данных. Попробуйте позже.</p>
            </div>
        </div>

        <!-- <div class="line-anima" :class="{ setup: flag }"></div> -->
    </div>
</template>

<style scoped>
.hidden {
    opacity: 0;
    pointer-events: none;
    position: absolute;
}

.error-message {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    font-size: 18px;
    font-family: Nunito;
    font-weight: 200;

    min-height: 58.5vh;
    padding-bottom: 120px;
}
.spinner-container {
    min-height: 58.5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 4rem;
}
.custom-spinner {
    --p-progressspinner-color-1: rgb(0, 84, 255);
    --p-progressspinner-color-2: rgb(0, 84, 255);
    --p-progressspinner-color-3: rgb(0, 84, 255);
    --p-progressspinner-color-4: rgb(0, 84, 255);
}
.setup {
    animation: anima 2s ease !important;
}
.PrepodavateliKafedriItem-wrap {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    cursor: pointer;
}

@keyframes anima {
    0% {
        opacity: 1;
        width: 300px;
    }
    50% {
        opacity: 0.5;
        width: 100px;
    }
    100% {
        opacity: 0;
        width: 0px;
    }
}
.line-anima {
    width: 300px;
    height: 2px;
    background-color: #1e66f5;
    margin-top: 30px;
    /* transition: anima 2s linear; */
}
.prepod-image-arrow:hover {
    filter: brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(3534%)
        hue-rotate(146deg) brightness(122%) contrast(120%);
    cursor: pointer;
}
.circle-prepod {
    width: 16px;
    height: 16px;
    border-radius: 100%;
    border: 1px solid white;
    background-color: transparent;
}
.prepod-circle-block {
    width: 100px;
    height: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 31px;
}
.name-prepod {
    font-family: JetBrainsMono;
    font-size: 36;
    font-weight: 500;
    color: #ffffff;
    margin-bottom: 39px;
}
.info-prepod {
    font-family: JetBrainsMono;
    font-size: 30;
    color: #999999;
    font-weight: 300;
}
.prepod-description-block {
    margin-top: 40px;
    width: 642px;
    height: 218px;
    border-left: 1px solid #ffffff;
    border-right: 1px solid #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.prepod-image {
    width: 238px;
    height: 238px;
    border-radius: 100%;
}
.back-image-arrow {
    background-image: url('../../assets/PrepodavateliKafedri/arrow_back.svg');
    width: 103px;
    height: 81px;
    background-repeat: no-repeat;
    background-size: contain;
}
.main-prepod-image {
    width: 330px;
    height: 330px;
}
.next-image-arrow {
    background-image: url('../../assets/PrepodavateliKafedri/arrow_next.svg');
    width: 103px;
    height: 81px;
    background-repeat: no-repeat;
    background-size: contain;
}
.prepod-image-block {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 80%;
}
.parent-wrapper {
    width: 100%;
    margin: 0;
    padding: 0;
    display: block;
    padding-left: 62px;
    padding-right: 62px;
}
.content-wrapper-prepod {
    height: 700px;
    width: 100%; /* Занимает всю доступную ширину */
    max-width: 1450px; /* Ограничение максимальной ширины (опционально) */
    margin: 0 auto; /* Центрирование блока, если max-width задан */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    border-top: 1px solid #1e66f5;
    border-bottom: 1px solid #1e66f5;

    /* padding-left:; */
}

@media (max-width: 1786px) {
    .content-wrapper-prepod {
        height: 550px;
    }

    .next-image-arrow,
    .back-image-arrow {
        width: 78px;
        height: 56px;
    }
}

@media (max-width: 1440px) {
    .content-wrapper-prepod {
        height: 475px;
        overflow-y: hidden;
    }

    .next-image-arrow,
    .back-image-arrow {
        width: 63px;
        height: 41px;
    }
}
</style>
