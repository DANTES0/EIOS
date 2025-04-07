<script setup>
import { useStore } from 'vuex';
import { ref, computed, onMounted, onBeforeMount } from 'vue';
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

import UserAll from '../components/AdminPageComponents/UsersAll.vue';
import Various from '../components/AdminPageComponents/Various.vue';
import UserAdmin from '../components/AdminPageComponents/UserAdmin.vue';
import AddUserModalComponent from '../components/AdminPageComponents/AddUserModalComponent.vue';
import EditUserModalComponent from '../components/AdminPageComponents/EditUserModalComponent.vue';


onMounted(() => {
    localStorage.setItem('theme', 'dark');  // Сохраняем тему как 'dark' в localStorage
    document.body.classList.add('dark');    // Применяем класс 'dark' на body
});

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
