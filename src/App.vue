<script setup>
import NavBar from './components/Header.vue';
import Auth from './components/Auth.vue';
import { authState } from './authState';
import useAuthenticatedFetch from './fetchInterceptor';
import config from './config';
import { computed, onMounted } from 'vue';
import * as jwt_decode from 'jwt-decode'; // если используете npm или import

const decodeJwt = computed(() => {
    const token = localStorage.accessToken;

    if (token) {
        try {
            const decodedPayload = jwt_decode(token);

            return decodedPayload;
        } catch (error) {
            console.error('Invalid token:', error);
        }
    } else {
        console.error('No token found in localStorage');
    }

    return null;
});

const fetch = async () => {
    const { statusCode } = await useAuthenticatedFetch(
        `${config.ServerURL}/api/v1/admin`,
    ).get();

    console.log(statusCode);

    if (statusCode.value == '200') {
        authState.isAccess = true;
        console.log(authState.isAccess);
    }

    console.log('ЗАПРОС');
};

fetch();
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
});
</script>

<template>
    <div class="bg-white dark:bg-[#1f1f1f] wrap">
        <Auth v-if="authState.isVisible" />
        <NavBar
            v-if="
                $route.path != '/admin' &&
                $route.path != `/news/get/admin/${$route.params.id}` &&
                $route.path != `/news/get/admin`
            "
        />

        <div
            class="main-background"
            :class="
                $route.path.match(/^\/teachers\/detail\/*/) ||
                $route.path.match(/^\/news\/get\/\d+$/) ||
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
    flex-direction: row;
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
