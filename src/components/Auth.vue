<script setup>
import { ref } from 'vue';
import { useFetch } from '@vueuse/core';
import { authState } from '../authState';
import { useStore } from 'vuex';
import config from '../config';

const store = useStore();
let login = ref('');
let password = ref('');
let loginError = ref(false);
// const { fetch } = useFetch({
//     // настройки fetch, такие как baseURL, headers, и т.д.
// });
const hideAuth = (event) => {
    // Проверяем, что клик был по фону, а не по контейнеру авторизации
    if (event.target.classList.contains('auth-wrapp')) {
        authState.isVisible = false;
    }
    document.documentElement.classList.remove('modal-open');
};
const authorize = async () => {
    if (login.value === '') {
        loginError.value = true;
        return;
    } else {
        loginError.value = false;
    }

    try {
        const { data, error } = await useFetch(`${config.KirURL}/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                login: login.value,
                password: password.value,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).json();

        if (error.value) {
            console.error('Ошибка при отправке запроса:', error.value);
            return;
        }

        const { accessToken, refreshToken } = data.value;
        store.dispatch('login', { accessToken, refreshToken });
        authState.isVisible = false;
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
    }
};
document.documentElement.classList.add('modal-open');
</script>

<template>
    <div v-if="authState.isVisible" class="auth-wrapp" @click="hideAuth">
        <div class="auth-container">
            <div class="auth-block">
                <div class="auth-title">
                    <span style="color: #1e66f5">#</span>АВТОРИЗАЦИЯ
                </div>
                <div class="input-login">
                    <div class="input-login-title">Введите логин</div>
                    <input
                        @click="loginError = false"
                        v-model="login"
                        placeholder="Логин...."
                        type="text"
                        class="input-login-text input"
                        :class="{ error: loginError }"
                    />
                </div>
                <div class="input-passwaord">
                    <div class="input-password-title">Введите пароль</div>
                    <input
                        v-model="password"
                        placeholder="Пароль...."
                        type="password"
                        class="input-password-text input"
                    />
                </div>
                <div class="not-auth">не могу войти</div>
                <button @click="authorize" class="enter-auth">Авторизоваться</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
@font-face {
    font-family: JetBrainsMono;
    src: url('../assets/JetBrainsMono.ttf');
}
.input-login {
    margin-top: 38px;
}
.input-passwaord {
    margin-top: 34px;
}
.input-login-title {
    margin-bottom: 17px;
}
.input-password-title {
    margin-bottom: 17px;
}
.not-auth {
    font-size: 14px;
    font-weight: 300;
    color: #7d7d7d;
    margin-top: 8px;
    margin-left: 250px;
    cursor: pointer;
    transition: color 0.3s ease;
}
.not-auth:hover {
    color: #8a8a8a;
}
.not-auth:active {
    color: #cccccc;
}
.enter-auth {
    width: 186px;
    height: 38px;
    background-color: transparent;
    border: 1px solid #c4c4c4;
    border-radius: 4px;
    color: #c4c4c4;
    font-family: JetBrainsMono;
    font-size: 18px;
    font-weight: 400;
    /* margin-bottom: 24px; */
    margin-top: 99px;
    cursor: pointer;
    transition:
        background-color 0.2s ease,
        border-color 0.2s ease;
}
.enter-auth:hover {
    background-color: #222222;
    border-color: #1e66f5;
}
.enter-auth:active {
    background-color: #333333;
    border-color: #1e66f5;
}
.input {
    width: 350px;
    height: 40px;
    background-color: transparent;
    border: 1px solid #c4c4c4;
    border-radius: 4px;
    padding-left: 14px;
    color: #c4c4c4;
    outline: #1e66f5;
    font-size: 18px;
    transition: border-color 0.3s ease;
}
.input::placeholder {
    color: #5c5c5c;
    font-family: JetBrainsMono;
    font-size: 18px;
}
.input:focus {
    border-color: #1e66f5;
}
.auth-title {
    font-family: JetBrainsMono;
    font-size: 28px;
    font-weight: 400;
    color: #cccccc;
    margin-top: 30px;
}
.auth-wrapp {
    position: absolute;
    background-color: #0000004e;
    width: 100vw;
    height: 100%;
    z-index: 99;
}
.auth-container {
    position: relative;
    width: 544px;
    height: 516px;
    background-color: #181818;
    margin: auto auto;
    margin-top: 200px;
    border: 1px solid #c4c4c4;
    border-radius: 15px;
    font-family: JetBrainsMono;
    font-size: 18px;
    color: #cccccc;
}
.auth-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: space-between; */
    width: 100%;
    height: 100%;
}
.input-login {
    font-weight: 300;
}
.error {
    border-color: #ff7070;
}
</style>
