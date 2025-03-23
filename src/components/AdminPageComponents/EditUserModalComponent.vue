<script setup>
import 'vue3-select-component/dist/style.css';
import VueSelect from 'vue3-select-component';
import { authState } from '../../authState';
import { ref, computed, onMounted } from 'vue';
import eventBus from '../../eventBus.js';
import { useFetch } from '@vueuse/core';
import config from '../../config';

const login = ref();
const password = ref();
const roles = ref([]);

const selected = ref(null);
const placeholder = ref('Поиск...');

const fetchRoles = async () => {
    try {
        const response = await fetch(`${config.ServerURL}/api/v1/roles/all`);
        const data = await response.json();

        console.log('Fetched roles:', data); // Log the full response

        // Check if data is an array
        if (Array.isArray(data)) {
            array.value = data.map((role) => ({ label: role.name, value: role.id }));
        } else {
            console.error('Invalid data structure:', data); // Log error if data is not an array
        }
    } catch (error) {
        console.error('Ошибка при получении ролей:', error);
    }
};

const fetchData = async () => {
    const response = await useFetch(
        `${config.ServerURL}/api/v1/users/${authState.editUserId}`,
    ).json();

    const userData = response.data.value; // Присваиваем данные пользователя

    login.value = userData.login;

    console.log("РОЛИ", userData);

    // Проверяем структуру данных перед присвоением placeholder'ов
    placeholder.value = userData.roles[0]?.name || 'Выберите роль';
    selected.value = userData.roles[0]?.name;
};

onMounted(() => {
    fetchRoles();
    fetchData();
});

let array = ref([]);

const handleRoleSelected = (option) => {
    roles.value[0] = { name: option.label, id: option.value }; // Передаем выбранную роль
    placeholder.value = option.label;
    selected.value = option;
};

const hideModal = (event) => {
    if (event.target.classList.contains('modal-add-user-wrapper')) {
        authState.isVisibleEditUserModelComponent = false;
    }

    document.documentElement.classList.remove('modal-open');
};

const sendNewUser = async () => {
    const payload = {
        login: login.value,
        password: password.value,
        roles: roles.value, // Роль как массив объектов
    };

    try {
        const response = await fetch(

            `${config.ServerURL}/api/v1/users/${authState.editUserId}`,
            {
                method: 'PUT', // Изменение пользователя
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        console.log("РоЛи", payload)
        if (!response.ok) {
            const errorText = await response.text();

            console.error(
                'Ошибка при обновлении пользователя:',
                response.status,
                errorText,
            );

            return;
        }

        const data = await response.json();

        console.log('Пользователь успешно обновлен:', data);
        authState.isVisibleEditUserModelComponent = false;
        eventBus.emit('userUpdated');
    } catch (error) {
        console.error('Ошибка при обновлении пользователя:', error);
    }
};

document.documentElement.classList.add('modal-open');
</script>

<template>
    <div
        v-if="authState.isVisibleEditUserModelComponent"
        class="modal-add-user-wrapper"
        :class="{ 'modal-open': authState.isVisibleEditUserModelComponent }"
        @click="hideModal"
    >
        <div class="modal-add-user-container">
            <div class="modal-add-user-block">
                <div class="modal-add-user-title" style="font-size: 28px">
                    Добавление пользователя
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
                        v-model="password"
                        placeholder="Пароль...."
                        type="password"
                        class="input-login-text input"
                        :class="{ error: loginError }"
                    />
                </div>
                <div class="select">
                    <div class="input-role wrap">
                        <div class="input-login-title title">Роль</div>
                        <VueSelect
                            v-if="array.length > 0"
                            v-model="selected"
                            :placeholder="placeholder"
                            :options="array"
                            @option-selected="handleRoleSelected"
                        />
                    </div>
                </div>
                <button class="enter-modal-add-user" @click="sendNewUser">Создать</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-open {
    position: fixed;
    overflow: hidden;
}
.select {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-top: 1%;
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
    overflow-y: hidden;
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
    margin-bottom: 10%;
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
