<script setup>
import NavBar from './components/Header.vue';
import Auth from './components/Auth.vue';
import { authState } from './authState';
import useAuthenticatedFetch from './fetchInterceptor';
import config from './config';
import { onMounted } from 'vue';
import store from './store/index.js';

onMounted(() => {
    if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        localStorage.theme = 'dark';
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    }

    console.log('Восстановление пользователя из localStorage...');

    store
        .dispatch('restoreUserFromLocalStorage')
        .then(() => {
            const accessToken = store.getters.accessToken;
            const refreshToken = store.getters.refreshToken;

            console.log('Токены из store:', accessToken, refreshToken);

            if (accessToken && refreshToken) {
                console.log('Токены найдены, выполняем логин...');
                store.dispatch('login', { accessToken, refreshToken });
            } else {
                console.log('Токены не найдены, редирект на страницу входа...');
            }
        })
        .catch((err) => {
            console.error('Ошибка восстановления пользователя:', err);
        });
});
</script>

<template>
    <div class="bg-white dark:bg-[#1f1f1f] wrap layout-container">
        <Auth v-if="authState.isVisible" />
        <NavBar
            v-if="
                $route.path != '/admin' &&
                $route.path != `/news/get/admin/${$route.params.id}` &&
                $route.path != `/news/get/admin`
            "
        />

        <div
            class="main-content"
            :class="
                $route.path.match(/^\/teachers\/detail\/*/) ||
                $route.path.match(/^\/news\/get\/*/) ||
                $route.path.match(/^\/admin\/*/)
                    ? 'w-[100%]'
                    : 'w-[83.6%]'
            "
        >
            <router-view />
        </div>
    </div>
</template>

<style scoped>
* {
    /* background-color: #1f1f1f; */
    height: 100%;
}
.wrap {
    display: flex;
    width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
    flex-direction: row;
    flex: 1;
}
.main-content {
    flex-grow: 1; /* Занимает всё оставшееся пространство */
    overflow-y: auto; /* Скролл только внутри контента */
    height: 100vh; /* Высота по экрану */
}
.text-vo {
    width: 100%;
    max-width: 1336px;
    height: 400px;
}
.main-background {
    /* width: 83.6%; */
}
</style>
