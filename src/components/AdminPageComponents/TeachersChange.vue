<script setup>
import { ref } from 'vue';
import IconAddImage from '../Icons/Icon/IconAddImage.vue';
import IconBase from '../Icons/IconBase.vue';
import VInput from '../UX/VInput.vue';

const hoverImage = ref(false);
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
                <div class="bg-[#181818] w-[283px] h-[283px] rounded-full relative">
                    <img
                        src="../../assets/default.png"
                        class="bg-[#181818] w-[283px] h-[283px] rounded-full absolute object-cover hover:opacity-50 border-[#CCCCCC]"
                    />
                    <icon-base
                        class="absolute left-[32%] top-[15%]"
                        width="160"
                        height="160"
                        ><icon-add-image></icon-add-image
                    ></icon-base>
                    <div
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
                    <v-input type-input="default" placeholder="Введите ФИО"></v-input>
                </div>
                <div>
                    <div>Логин</div>
                    <v-input type-input="default" placeholder="Введите логин"></v-input>
                </div>
                <div>
                    <div>Пароль</div>
                    <v-input type-input="default" placeholder="Введите пароль"></v-input>
                </div>
            </div>
            <div class="h-full w-[1px] flex items-center">
                <div class="h-[80%] w-full bg-[#CCCCCC]"></div>
            </div>
            <div class="flex flex-col w-[35%] justify-between">
                <div>
                    <div>Должность</div>
                    <v-input
                        type-input="default"
                        placeholder="Введите должность"
                    ></v-input>
                </div>
                <div>
                    <div>Ученое звание</div>
                    <v-input
                        type-input="default"
                        placeholder="Введите научную степень"
                    ></v-input>
                </div>
                <div>
                    <div>Почта</div>
                    <v-input type-input="default" placeholder="Введите почту"></v-input>
                </div>
            </div>
        </div>
        <div class="flex flex-row w-[90%] h-[40%] justify-between mt-[90px]">
            <div class="w-[35%]">
                <div>
                    <div class="border-b border-[#006AFF] w-[360px]">
                        Дополнительная информация
                    </div>
                </div>
                <div class="mt-[20px]">
                    <div>Телеграм</div>
                    <v-input type-input="default" placeholder="Введите ссылку"></v-input>
                </div>
                <div>
                    <div>ВК</div>
                    <v-input type-input="default" placeholder="Введите ссылку"></v-input>
                </div>
                <div>
                    <div>Номер телефона</div>
                    <v-input
                        type-input="default"
                        placeholder="Введите номер телефона"
                        mask="+7 (999)-999-99-99"
                    ></v-input>
                </div>
            </div>
            <div class="w-[35%]">
                <div>
                    <div class="border-b border-[#006AFF] w-[90px]">О себе</div>
                </div>
                <textarea class="mt-[20px] w-full"></textarea>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
