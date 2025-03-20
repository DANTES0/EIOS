<script setup>
import { ref, computed, onMounted, watch, onBeforeMount, onUpdated } from 'vue';
import IconAddImage from '../Icons/Icon/IconAddImage.vue';
import IconBase from '../Icons/IconBase.vue';
import VInput from '../UX/VInput.vue';
import VButton from '../UX/VButton.vue';
import config from '../../config';
import { useFetch } from '@vueuse/core';
import { authState } from '../../authState';

// const selectedImage = ref('');
const imagePreview = ref('');

const login = ref('');
const name = ref('');
const password = ref('');
const phone = ref('');
const mail = ref('');
const telegram = ref('');
const vkontakte = ref('');
const description = ref('');
const post = ref('');
const photo = ref('');
const rank = ref('');
const cover = ref(false);
const roles = [{ id: 3, name: 'ROLE_TEACHER' }];

const url = computed(() => {
    return `${config.ServerURL}/api/v1/teacher/${authState.editUserId}`;
});
const items = ref({});
const fetchPrepodDetails = async () => {
    if (authState.editUserId) {
        const response = await useFetch(url).json();

        items.value = response.data.value;
        console.log(items.value);
        login.value = items.value.login;
        password.value = items.value.password;
        name.value = items.value.name;
        phone.value = items.value.phone.replace(/\D/g, '');
        mail.value = items.value.mail;
        telegram.value = items.value.telegram;
        vkontakte.value = items.value.vkontakte;
        description.value = items.value.description;
        post.value = items.value.post;
        photo.value = items.value.photo.fileName;
        imagePreview.value = `https://security-jwt.onrender.com/api/v1/image?fileName=${items.value.photo?.fileName}&imageType=TeacherImage`;
        rank.value = items.value.rank;
        cover.value = items.value.cover;
        console.log(items.value); // Должны быть данные, которые вы хотите отобразить
        console.log(items.value.phone);
    }
};

onMounted(() => {
    fetchPrepodDetails();
});
onBeforeMount(() => {
    fetchPrepodDetails();
});
//
// onBeforeMount(fetchPrepodDetails);
// onUpdated(fetchPrepodDetails);

const onImageSelected = (event) => {
    const file = event.target.files[0];

    if (file) {
        photo.value = file;

        const reader = new FileReader();

        reader.onload = (e) => {
            imagePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const triggerFileInput = () => {
    document.getElementById('imageUpload').click();
};

const onSubmit = async () => {
    if (photo.value) {
        const formData = new FormData();
        const payload = {
            login: login.value,
            password: password.value,
            name: name.value,
            phone: phone.value,
            mail: mail.value,
            telegram: telegram.value,
            vkontakte: vkontakte.value,
            description: description.value,
            post: post.value,
            rank: rank.value,
            cover: cover.value,
            roles: roles,
        };

        formData.append(
            'teacher',
            new Blob([JSON.stringify(payload)], { type: 'application/json' }),
        );

        formData.append('images', photo.value);

        const response = await fetch(`${config.ServerURL}/api/v1/teacher`, {
            method: 'POST',
            body: formData,
        });

        console.log('Image uploaded successfully:', response);
        console.log('Image uploaded successfully:', phone);
    }
};
</script>

<template>
    <div
        class="flex flex-col w-full text-black dark:text-white font-[JetBrainsMono] font-bold text-[24px] items-center"
    >
        <div
            class="w-full h-[82px] dark:bg-[#181818] flex items-center border-b border-l border-[#2B2B2B]"
        >
            <div class="ml-[42px]">Новый преподаватель</div>
        </div>
        <div class="flex flex-row w-[90%] h-40% justify-between mt-[24px]">
            <div class="flex flex-col font-thin text-[#CCCCCC] text-[14px] items-center">
                <div
                    class="bg-[#181818] w-[283px] h-[283px] rounded-full relative cursor-pointer"
                    @click="triggerFileInput"
                >
                    <img
                        :src="imagePreview"
                        class="bg-[#181818] w-[283px] h-[283px] rounded-full absolute object-cover hover:opacity-50 border-[#CCCCCC]"
                    />
                    <input
                        id="imageUpload"
                        type="file"
                        class="hidden"
                        @change="onImageSelected"
                    />
                    <icon-base
                        v-if="!photo"
                        class="absolute left-[32%] top-[15%]"
                        width="160"
                        height="160"
                        ><icon-add-image></icon-add-image
                    ></icon-base>
                    <div
                        v-if="!photo"
                        class="absolute bottom-[40px] left-[28%] text-[20px] text-[#ffffff] text-center w-[130px] font-normal"
                    >
                        Добавить изображение
                    </div>
                </div>
                <div class="mt-[12px]">Рекомендуемый размер 284x284</div>
            </div>
            <div class="flex flex-col w-[35%] justify-between">
                <div>
                    <div>ФИО</div>
                    <div class="h-[50px]">
                        <v-input
                            v-model="name"
                            type-input="default"
                            placeholder="Введите ФИО"
                        ></v-input>
                    </div>
                </div>
                <div>
                    <div>Логин</div>
                    <div class="h-[50px]">
                        <v-input
                            v-model="login"
                            type-input="default"
                            placeholder="Введите логин"
                        ></v-input>
                    </div>
                </div>
                <div>
                    <div>Пароль</div>
                    <div class="h-[50px]">
                        <v-input
                            v-model="password"
                            type-input="default"
                            placeholder="Введите пароль"
                        ></v-input>
                    </div>
                </div>
            </div>
            <div class="h-full w-[1px] flex items-center">
                <div class="h-[80%] w-full bg-[#CCCCCC]"></div>
            </div>
            <div class="flex flex-col w-[35%] justify-between">
                <div>
                    <div>Должность</div>
                    <div class="h-[50px]">
                        <v-input
                            v-model="post"
                            type-input="default"
                            placeholder="Введите должность"
                        ></v-input>
                    </div>
                </div>
                <div>
                    <div>Ученое звание</div>
                    <div class="h-[50px]">
                        <v-input
                            v-model="rank"
                            type-input="default"
                            placeholder="Введите научную степень"
                        ></v-input>
                    </div>
                </div>
                <div>
                    <div>Почта</div>
                    <div class="h-[50px]">
                        <v-input
                            v-model="mail"
                            type-input="default"
                            placeholder="Введите почту"
                        ></v-input>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-row w-[90%] h-[40%] justify-between mt-[90px]">
            <div class="w-[35%] flex flex-col gap-[13px]">
                <div>
                    <div class="border-b border-[#006AFF] w-[360px]">
                        Дополнительная информация
                    </div>
                </div>
                <div class="mt-[20px]">
                    <div>Телеграм</div>
                    <div class="h-[50px]">
                        <v-input
                            v-model="telegram"
                            type-input="default"
                            placeholder="Введите ссылку"
                        ></v-input>
                    </div>
                </div>
                <div>
                    <div>ВК</div>
                    <div class="h-[50px]">
                        <v-input
                            v-model="vkontakte"
                            type-input="default"
                            placeholder="Введите ссылку"
                        ></v-input>
                    </div>
                </div>
                <div>
                    <div>Номер телефона</div>
                    <div class="h-[50px]">
                        <!-- Применяем маску для телефона на уровне компонента CustomInput -->
                        <CustomInput
                            v-model="phone"
                            mask="+7 (999) 999 99 99"
                            placeholder="Введите номер телефона"
                        />
                    </div>
                    <div class="checkTeacher">
                        <div class="checkTeacherTitle">Отображать на главной странице?</div>
                        <input type="checkbox" class="checkbox" v-model="cover" />
                    </div>
                </div>
            </div>
            <div class="w-[35%]">
                <div>
                    <div class="border-b border-[#006AFF] w-[90px]">О себе</div>
                </div>
                <textarea v-model="description" class="mt-[20px] w-full"></textarea>
            </div>
        </div>
        <div class="w-[90%]">
            <v-button class="mt-[75px]" @click="onSubmit"></v-button>
        </div>
    </div>
</template>

<style scoped></style>
