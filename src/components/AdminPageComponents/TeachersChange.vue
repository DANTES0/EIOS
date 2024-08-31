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
// const hoverImage = ref(false);

// const props = defineProps({
//     id: { type: String, default: '' },
//     username: { type: String, default: '' },
//     name: { type: String, default: '' },
//     login: { type: String, default: '' },
//     password: { type: String, default: '' },
//     phone: { type: String, default: '' },
//     mail: { type: String, default: '' },
//     telegram: { type: String, default: '' },
//     vkontakte: { type: String, default: '' },
//     description: { type: String, default: '' },
//     post: { type: String, default: '' },
//     photo: { type: String, default: '' },
//     rank: { type: String, default: '' },
// });
const username = ref('');
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
        // username.value = items.value.username;
        name.value = items.value.name;
        // password.value = items.value.password;
        phone.value = items.value.phone;
        mail.value = items.value.mail;
        telegram.value = items.value.telegram;
        vkontakte.value = items.value.vkontakte;
        description.value = items.value.description;
        post.value = items.value.post;
        photo.value = items.value.photo;
        imagePreview.value = `https://security-jwt-1.onrender.com/api/v1/image?fileName=${items.value.photo}&imageType=TeacherImage`;
        rank.value = items.value.rank;
        console.log(name.value); //
    }
};

onMounted(() => {
    fetchPrepodDetails();
}); //
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
    let photoBase64 = '';

    if (photo.value) {
        const formData = new FormData();

        formData.append('photo', photo.value);

        // const reader = new FileReader();

        // reader.readAsDataURL(photo.value);
        // reader.onload = () => {
        //     photoBase64 = reader.result.split(',')[1]; // Get the base64 string without the data URL prefix

        const payload = {
            username: username.value,
            password: password.value,
            name: name.value,
            phone: phone.value,
            mail: mail.value,
            telegram: telegram.value,
            vkontakte: vkontakte.value,
            description: description.value,
            post: post.value,
            photo: photoBase64,
            rank: rank.value,
            roles: roles,
        };

        const response = await fetch(`${config.ServerURL}/api/auth/addTeacher`, {
            method: 'POST',
            body: payload,
            headers: {
                Accept: 'application/json',
            },
        });

        console.log('Image uploaded successfully:', response);
        console.log('Image uploaded successfully:', phone);
        // };

        try {
            // formData.append('username', username.value);
            // formData.append('name', name.value);
            // formData.append('login', login.value);
            // formData.append('password', password.value);
            // formData.append('post', post.value);
            // formData.append('rank', rank.value);
            // formData.append('mail', mail.value);
            // formData.append('telegram', telegram.value);
            // formData.append('vkontakte', vkontakte.value);
            // formData.append('phone', phone.value);
            // formData.append('description', description.value);
            // formData.append('roles', roles);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
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
                            v-model="username"
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
                        <v-input
                            v-model="phone"
                            type-input="default"
                            placeholder="Введите номер телефона"
                            mask="+7 (999)-999-99-99"
                        ></v-input>
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
