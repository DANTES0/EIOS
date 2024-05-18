<script setup>
import {ref} from "vue"
import { authState } from '../authState';
let login = ref('');
let password = ref('');
const hideAuth = (event) => {
    // Проверяем, что клик был по фону, а не по контейнеру авторизации
    if (event.target.classList.contains('auth-wrapp')) {
        authState.isVisible = false;
    }
};
const authorize = () => {
    // Тут вы можете использовать значения переменных login и password
    console.log('Логин:', login.value);
    console.log('Пароль:', password.value);
    // Дополнительный код для авторизации...
};
</script>
<template>

    <div v-if="authState.isVisible" class="auth-wrapp" @click="hideAuth">
        <div class="auth-container">
            <div class="auth-block">
                <div class="auth-title"><span style="color: #1E66F5;">#</span>АВТОРИЗАЦИЯ</div>
                <div class="input-login">
                    <div class="input-login-title">Введите логин</div>
                    <input v-model="login" placeholder="Логин...." type="text" class="input-login-text input">
                </div>
                <div class="input-passwaord">
                    <div class="input-password-title">Введите пароль</div>
                    <input v-model="password" placeholder="Пароль...." type="password" class="input-password-text input">
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
  src: url("../assets/JetBrainsMono.ttf");
}
.input-login {
    margin-top: 38px
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
    color: #7D7D7D;
    margin-top: 8px;
    margin-left: 250px;
}
.enter-auth {
    width: 186px;
    height: 38px;
    background-color: transparent;
    border: 1px solid #C4C4C4;
    border-radius: 4px;
    color: #C4C4C4;
    font-family: JetBrainsMono;
    font-size: 18px;
    font-weight: 400;
    /* margin-bottom: 24px; */
    margin-top: 69px;
    cursor: pointer;
    transition: background-color 0.2s ease, border-color 0.2s ease;
}
.enter-auth:hover {
    background-color: #222222;
    border-color: #1E66F5;
}
.enter-auth:active {
    background-color: #333333;
    border-color: #1E66F5;
}
.input {
    width: 350px;
    height: 40px;
    background-color: transparent;
    border: 1px solid #C4C4C4;
    border-radius: 4px;
    padding-left: 14px;
    color: #C4C4C4;
    outline: #1E66F5;
    font-size: 18px;
}
.input::placeholder {
    color: #5C5C5C;
    font-family: JetBrainsMono;
    font-size: 18px;
}
.input:focus {
    border-color: #1E66F5;
}
.auth-title {
    font-family: JetBrainsMono;
    font-size: 24px;
    font-weight: 400;
    color: #CCCCCC;
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
        border: 1px solid #C4C4C4;
        border-radius: 15px;
        font-family: JetBrainsMono;
        font-size: 18px;
        color: #CCCCCC;
        
    }
    .auth-block{
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

</style>