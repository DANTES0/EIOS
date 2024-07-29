<script setup>
import NavBar from './components/Header.vue';
import Auth from './components/Auth.vue';
import { authState } from './authState';
import useAuthenticatedFetch from './fetchInterceptor';
import config from './config';

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
</script>

<template>
    <div class="wrap">
        <Auth v-if="authState.isVisible" />
        <NavBar
            v-if="
                $route.path != '/admin' &&
                $route.path != `/news/get/admin/${$route.params.id}` &&
                $route.path != `/news/get/admin`
            "
        />

        <div class="main-background">
            <router-view />
        </div>
    </div>
</template>

<style scoped>
* {
    background-color: #1f1f1f;
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
    width: 83.6%;
}
</style>
