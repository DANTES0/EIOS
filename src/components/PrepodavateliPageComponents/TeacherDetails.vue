<script setup>
import IconBase from '../Icons/IconBase.vue';
import IconMail from '../Icons/Icon/IconMail.vue';
import IconVk from '../Icons/Icon/IconVk.vue';
import IconTelegram from '../Icons/Icon/IconTelegram.vue';
import IconPhone from '../Icons/Icon/IconPhone.vue';
import CourseDropdown from './CourseDropdown.vue';
import { onMounted } from 'vue';
import router from '../../router/routes';
import { useRoute, useRouter } from 'vue-router';
import config from '../../config';
import { computed, ref } from 'vue';
import { useFetch } from '@vueuse/core';

const route = useRoute();
const url = computed(() => {
    return `${config.ServerURL}/api/v1/teacher/${route.params.id}`;
});
const items = ref({});
const fetchTeacherDetails = async () => {
    const response = await useFetch(url).json();

    items.value = response.data.value;

    console.log(response.data.value);
};

onMounted(fetchTeacherDetails);
</script>

<template>
    <div class="flex flex-col justify-center w-[90%] mt-[56px] ml-[96px]">
        <div
            class="bg-[#181818] h-[380px] w-full flex flex-row border-[1.5px] border-[#2B2B2B] items-center"
        >
            <div class="flex items-center justify-center h-full ml-[104px]">
                <div
                    class="w-[304px] h-[304px] rounded-full border-[4px] border-[#2B2B2B] flex justify-center items-center"
                >
                    <img
                        :src="`https://security-jwt.onrender.com/api/v1/image?fileName=${items.photo?.fileName}&imageType=TeacherImage`"
                        class="rounded-full w-[283px] h-[283px] object-cover object-top"
                    />
                </div>
                <div class="ml-[37px] font-[JetBrainsMono] text-white">
                    <div class="flex flex-col">
                        <h1 class="text-[28px] font-extrabold">
                            {{ items.name }}
                        </h1>
                        <ul
                            class="text-[Nunito] text-[20px] font-thin mt-[19px] gap-[3px]"
                        >
                            <li>{{ items.post }}</li>
                            <li>{{ items.rank }}</li>
                        </ul>
                    </div>
                    <div>
                        <div class="flex flex-col w-[18%] mt-[37px]">
                            <div class="font-extrabold text-[20px]">Контакты</div>
                            <div class="w-full bg-[#0054FF] h-[2px]"></div>
                            <div class="flex flex-col gap-[9px] mt-[9px] font-thin">
                                <div class="flex flex-row w-[300px] items-center">
                                    <icon-base width="24" height="24" icon-color="#ffffff"
                                        ><icon-mail
                                    /></icon-base>
                                    <div class="ml-[10px]">{{ items.mail }}</div>
                                </div>
                                <div class="flex flex-row w-[300px] items-center">
                                    <icon-base width="24" height="24" icon-color="#ffffff"
                                        ><icon-telegram
                                    /></icon-base>
                                    <div class="ml-[10px]">{{ items.telegram }}</div>
                                </div>
                                <div class="flex flex-row w-[300px] items-center">
                                    <icon-base width="24" height="24" icon-color="#ffffff"
                                        ><icon-phone
                                    /></icon-base>
                                    <div class="ml-[10px]">{{ items.phone }}</div>
                                </div>
                                <div class="flex flex-row w-[300px] items-center">
                                    <icon-base width="24" height="24" icon-color="#ffffff"
                                        ><icon-vk
                                    /></icon-base>
                                    <div class="ml-[10px]">{{ items.vkontakte }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="h-[70%] w-[1px] bg-white ml-[18px]"></div>
                <div class="flex flex-col ml-[37px] h-[83%]">
                    <div
                        class="font-extrabold text-[20px] font-[JetBrainsMono] text-white"
                    >
                        Обо мне
                    </div>
                    <div class="bg-[#0054FF] h-[2px] mb-[21px] w-[88px]"></div>
                    <div class="font-[Nunito] font-thin text-white text-[20px]">
                        {{ items.description }}
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-row text-white font-[JetBrainsMono] h-full mt-[44px]">
            <div class="flex flex-col w-[48%]">
                <div class="text-[28px] font-extrabold mb-[35px]">
                    Материалы по курсам
                </div>
                <div class="flex flex-col gap-4">
                    <course-dropdown></course-dropdown>
                    <course-dropdown></course-dropdown>
                    <course-dropdown></course-dropdown>
                    <course-dropdown></course-dropdown>
                </div>
            </div>
            <div class="h-[300px] w-[1px] mt-[100px] bg-white"></div>
            <div class="flex flex-col w-[48%] ml-[70px]">
                <div class="text-[28px] font-extrabold">Ближайшие консультации</div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
