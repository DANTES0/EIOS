<script setup>
import 'vue3-select-component/dist/style.css';
import VueSelect from 'vue3-select-component';
import { authState } from '../../authState';
import { ref, computed } from 'vue';
import eventBus from '../../eventBus.js';
import { useFetch } from '@vueuse/core';
import config from '../../config';

console.log('ID', authState.editUserId);

const login = ref();
const password = ref();
const password2 = ref(null);
const roles = ref([{ id: 3, name: 'ROLE_STUDENT' }]);
const name = ref();
const group = ref();
const course = ref();

const selected = ref(null);
const selected2 = ref(null);
const placeholder = ref('Поиск...');
const placeholder2 = ref('Поиск...');

let array3 = ref([]);

const fetchData = async () => {
    const response = await useFetch(
        `${config.ServerURL}/students/find/${authState.editUserId}`,
    ).json();

    array3.value = response.data.value;

    login.value = array3.value.user.login;
    password.value = array3.value.user.password;
    name.value = array3.value.name;
    placeholder.value = array3.value.group;
    placeholder2.value = array3.value.course;
};

fetchData();

let array = ref([]);

array.value.push(
    { label: 'О714Б', value: 1 },
    { label: 'О715Б', value: 2 },
    { label: 'О716Б', value: 3 },
);

let array2 = ref([]);

array2.value.push(
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
);

const handleOptionSelected = (option) => {
    placeholder.value = option.label;
    group.value = option.label;
};

const handleOptionSelected2 = (option) => {
    placeholder2.value = option.label;
    course.value = option.label;
};

const hideModal = (event) => {
    if (event.target.classList.contains('modal-add-user-wrapper')) {
        authState.isVisibleEditStudentModelComponent = false;
    }

    document.documentElement.classList.remove('modal-open');
};

const sendNewStudent = async () => {
    if (password2.value != null) {
        password.value = password2.value;
    }

    const { data, error } = await useFetch(
        `${config.ServerURL}/students/edit/${authState.editUserId}`,
        {
            method: 'POST',
            body: JSON.stringify({
                login: login.value,
                password: password.value,
                roles: roles.value,
                name: name.value,
                group: placeholder.value,
                course: placeholder2.value,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        },
    ).json();

    authState.isVisibleEditStudentModelComponent = false;
    eventBus.emit('studentAdded');
};

document.documentElement.classList.add('modal-open');
</script>

<template>
    <div
        v-if="authState.isVisibleEditStudentModelComponent"
        class="modal-add-user-wrapper"
        @click="hideModal"
    >
        <div class="modal-add-user-container">
            <div class="modal-add-user-block">
                <div class="modal-add-user-title" style="font-size: 28px">
                    Редактирование аккаунта студента
                </div>
                <div class="input-name wrap" style="margin-top: 40px">
                    <div class="input-name-title title">Введите Имя</div>
                    <input
                        v-model="name"
                        placeholder="Логин...."
                        type="text"
                        class="input--name-text input"
                        :class="{ error: loginError }"
                    />
                </div>
                <div class="input-login wrap">
                    <div class="input-login-title title">Введите логин</div>
                    <input
                        v-model="login"
                        placeholder="Логин...."
                        type="text"
                        class="input-login-text input"
                    />
                </div>
                <div class="input-password wrap">
                    <div class="input-login-title title">Введите пароль</div>
                    <input
                        v-model="password2"
                        placeholder="Пароль...."
                        type="password"
                        class="input-login-text input"
                        :class="{ error: loginError }"
                    />
                </div>
                <div class="select">
                    <div class="input-group wrap">
                        <div class="input-login-title title">Номер группы</div>
                        <VueSelect
                            v-model="selected"
                            :placeholder="placeholder"
                            :options="array"
                            @option-selected="handleOptionSelected"
                        ></VueSelect>
                    </div>
                    <div class="input-course wrap">
                        <div class="input-login-title title">Курс обучения</div>
                        <VueSelect
                            v-model="selected2"
                            :placeholder="placeholder2"
                            :options="array2"
                            @option-selected="handleOptionSelected2"
                        ></VueSelect>
                    </div>
                </div>
                <button class="enter-modal-add-user" @click="sendNewStudent">
                    Сохранить
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.select {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}
.input-course {
    margin-left: 90px;
}
.title {
    margin-bottom: 18px;
}
.wrap {
    margin-top: 20px;
}
.modal-add-user-wrapper {
    font-family: JetBrainsMono;
    font-weight: 400;
    font-size: 20px;
    color: #cccccc;
    position: absolute;
    background-color: #0000004e;
    width: 100vw;
    height: 100%;
    z-index: 99;
}
.modal-add-user-container {
    width: 824px;
    height: auto;
    background-color: #181818;
    border: 1px solid #c4c4c4;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 90px;
}
.modal-add-user-block {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    height: 100%;
    width: 100%;
}
.input {
    background-color: transparent;
    border: 1px solid #c4c4c4;
    border-radius: 6px;
    width: 520px;
    height: 40px;
    padding-left: 10px;
    color: #cccccc;
    font-size: 20px;
    font-family: JetBrainsMono;
    transition: 0.3s ease;
    outline: #1e66f5;
}

.input::placeholder {
    font-size: 20px;
    font-family: JetBrainsMono;
    color: #5c5c5c;
}
.input:focus {
    border-color: #1e66f5;
}
.enter-modal-add-user {
    background-color: transparent;
    border: 1px solid #c4c4c4;
    width: 200px;
    height: 50px;
    border-radius: 10px;
    color: #cccccc;
    font-size: 21px;
    font-family: JetBrainsMono;
    margin-top: 160px;
    transition: 0.3s ease;
    cursor: pointer;
    margin-bottom: 30px;
}
.enter-modal-add-user:hover {
    background-color: #222222;
    border-color: #1e66f5;
}
.enter-modal-add-user:active {
    background-color: #333333;
    border-color: #1e66f5;
}
.modal-add-user-title {
    margin-top: 20px;
}

:deep(.no-results) {
    color: white;
}
:deep(.vue-select) {
    font-family: JetBrainsMono;
    background-color: transparent;
    width: 220px;
    /* margin-top: 30px; */
    z-index: 0;
    /* position: static; */
}
:deep(.search-input) {
    color: #ffffff;
    background-color: transparent;
    -webkit-input-placeholder: #5c5c5c;
}
:deep(.search-input::placeholder) {
    color: #a7a7a7;
}
:deep(.control) {
    background-color: transparent;
}
:deep(.control.focused) {
    background-color: transparent;
    border-color: #1e66f5;
    /* box-shadow: #b3b3b3; */
}
:deep(.dropdown-icon svg) {
    fill: #e4e4e7;
}
:deep(.clear-button svg) {
    fill: transparent;
}
:deep(.single-value) {
    color: #ffffff;
    z-index: 0;
}
:deep(.menu) {
    background-color: transparent;
    border: 1px solid #1e66f5;
    /* position: static; */
}
:deep(.menu-option) {
    background-color: #181818;
    color: white;
}
:deep(.menu-option:hover) {
    background-color: #5c5c5c;
}
:deep(.menu-option.focused) {
    background-color: transparent;
}
:deep(.menu-option.selected) {
    background-color: #5c5c5c;
}
</style>
