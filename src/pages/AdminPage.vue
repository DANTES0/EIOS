<script setup>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import { authState } from '../authState';
import useAuthenticatedFetch from '../fetchInterceptor';
import LeftAdminMenu from '../components/AdminPageComponents/LeftAdminMenu.vue';
import AddUserStudentModalComponent from '../components/AdminPageComponents/AddUserStudentModalComponent.vue';
import ChangePhotoGallery from '../components/AdminPageComponents/ChangePhotoGallery.vue';
import UserStudent from '../components/AdminPageComponents/UserStudents.vue';
import EditUserStudentModalComponent from '../components/AdminPageComponents/EditUserStudentModalComponent.vue';
import NewsAdmin from '../components/AdminPageComponents/NewsAdmin.vue';
import UserTeachers from '../components/AdminPageComponents/UserTeachers.vue';
import TeachersChange from '../components/AdminPageComponents/TeachersChange.vue';
import config from '../config';

let isVisibleChangePhotoGallery = ref(false);

import UserAll from '../components/AdminPageComponents/UsersAll.vue';
import Various from '../components/AdminPageComponents/Various.vue';
import UserAdmin from '../components/AdminPageComponents/UserAdmin.vue';
import AddUserModalComponent from '../components/AdminPageComponents/AddUserModalComponent.vue';
import EditUserModalComponent from '../components/AdminPageComponents/EditUserModalComponent.vue';

let visible = ref(true);
const store = useStore();

async function fetchData() {
    // await fetch('http://25.59.204.137:8080/admin', {
    //     method: 'GET',
    //     headers: {Authorization: `Bearer`+' eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJha2l6YXIiLCJleHAiOjE3MTYwNjQ0NDYsInJvbGVzIjpbeyJpZCI6MSwibmFtZSI6IlJPTEVfQURNSU4ifV19.VoMXIWD-RxJjbRGHd3BosqAIvIXEfQ5vLM6P1z-3hrP7LLvNHfGqErtlH8-xkIRPe6fOsvKmk_A8mN9nHxQAjA'}
    // })
    const { data, error, isFetching, statusCode } = await useAuthenticatedFetch(
        `${config.ServerURL}/api/v1/admin`,
    ).get();

    console.log(statusCode);
    console.log(store.getters.accessToken);

    if (
        statusCode.value == '403' ||
        (statusCode.value == '401' && !store.getters.accessToken)
    ) {
        authState.isVisible = true;
        // visible.value = false
    } else {
        // visible.value = true
    }

    if (error.value) {
        // console.error('Failed to fetch data:', error.value);
    } else {
        console.log('Data:', data.value);
    }

    if (!store.getters.isLoggedIn) {
        authState.isVisible = true;
        // visible.value = false
    }
}

fetchData();
</script>

<template>
    <AddUserModalComponent v-if="authState.isVisibleAddUserModalComponent" />
    <AddUserStudentModalComponent
        v-if="authState.isVisibleAddUserStudentModalComponent"
    />
    <EditUserStudentModalComponent v-if="authState.isVisibleEditStudentModelComponent" />
    <EditUserModalComponent v-if="authState.isVisibleEditUserModelComponent" />

    <div class="admin-page-container">
        <LeftAdminMenu />

        <div class="userAll-content">
            <ChangePhotoGallery v-if="authState.isArticle == 'ChangePhotoGallery'" />
            <UserAll v-if="authState.isArticle == 'UserAll'" />
            <UserAdmin v-if="authState.isArticle == 'UserAdmin'" />
            <UserStudent v-if="authState.isArticle == 'UserStudent'" />
            <NewsAdmin v-if="authState.isArticle == 'NewsAdmin'" />
            <UserTeachers v-if="authState.isArticle == 'UserTeachers'" />
            <various v-if="authState.isArticle == 'Various'"></various>
            <TeachersChange
                v-if="authState.isArticle === 'TeachersChange'"
            ></TeachersChange>
        </div>
        <!-- <div v-if="visible" style="color:aliceblue; font-size:30px" class="Admin-page">
        ADMIN
    </div> -->
    </div>
</template>

<style scoped>
.admin-page-container {
    display: flex;
    flex-direction: row;
}

.userAll-content {
    display: flex;
    flex-direction: column;
    width: calc(100% - 1px);
}
</style>
