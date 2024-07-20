<script setup>
import { ref } from 'vue';
import { authState } from '../../authState';

const isActiveMain = ref(false);
const isActiveNews = ref(false);
const isActiveUsers = ref(false);
</script>

<template>
    <div class="admin-container">
        <div class="admin-menu-wrapper">
            <div class="admin-menu-title">
                <div class="admin-title">
                    Кафедра <span style="color: white">О</span>7
                </div>
                <div class="admin-panel-title">Панель администратора</div>
            </div>
            <div class="article-menu">
                <div class="wrap-wrap">
                    <div class="wrap" @click="() => (isActiveMain = !isActiveMain)">
                        <div class="mainPage article" :class="{ active: isActiveMain }">
                            <div class="mainPage-title title">Главная страница</div>
                        </div>
                        <img
                            class="arrow"
                            :class="{ rotate: isActiveMain }"
                            src="../../assets/Upper.svg"
                        />
                    </div>
                    <Transition name="slide-fade">
                        <div v-if="isActiveMain" class="content-userPage">
                            <div class="content-userPage-wrap">
                                <div class="content-userPage-title">Преподаватели</div>
                            </div>
                            <div class="content-userPage-title">Главные новости</div>
                            <div class="content-userPage-title">Преподаватели</div>
                            <div
                                class="content-userPage-wrap"
                                :class="{
                                    lineActive:
                                        authState.isArticle == 'ChangePhotoGallery',
                                }"
                            >
                                <div
                                    class="content-userPage-title"
                                    @click="
                                        () => {
                                            authState.isArticle = 'ChangePhotoGallery';
                                        }
                                    "
                                >
                                    Фотогалерея
                                </div>
                            </div>
                            <div class="content-userPage-title">Разное</div>
                        </div>
                    </Transition>
                </div>
                <div
                    class="wrap"
                    @click="
                        () => {
                            authState.isArticle = 'NewsAdmin';
                        }
                    "
                >
                    <div
                        class="newsPage article"
                        :class="{ active: isActiveNews }"
                        @click="() => (isActiveNews = !isActiveNews)"
                    >
                        <div class="newsPage-title title">Новости</div>
                    </div>
                    <img
                        :class="{ rotate: isActiveNews }"
                        class="arrow"
                        src="../../assets/Upper.svg"
                    />
                </div>
                <div class="userPage-wrap">
                    <div class="wrap" @click="() => (isActiveUsers = !isActiveUsers)">
                        <div class="usersPage article" :class="{ active: isActiveUsers }">
                            <div class="usersPage-title title">Пользователи</div>
                        </div>
                        <img
                            :class="{ rotate: isActiveUsers }"
                            class="arrow"
                            src="../../assets/Upper.svg"
                        />
                    </div>
                    <Transition name="slide-fade">
                        <div v-if="isActiveUsers" class="content-userPage">
                            <div
                                class="content-userPage-wrap"
                                :class="{
                                    lineActive: authState.isArticle == 'UserTeachers',
                                }"
                            >
                                <div
                                    class="content-userPage-title"
                                    @click="
                                        () => {
                                            authState.isArticle = 'UserTeachers';
                                        }
                                    "
                                >
                                    Преподаватели
                                </div>
                            </div>
                            <div
                                class="content-userPage-wrap"
                                :class="{
                                    lineActive: authState.isArticle == 'UserStudent',
                                }"
                            >
                                <div
                                    class="content-userPage-title"
                                    @click="
                                        () => {
                                            authState.isArticle = 'UserStudent';
                                        }
                                    "
                                >
                                    Студенты
                                </div>
                            </div>
                            <div class="content-userPage-title">Администраторы</div>
                            <div
                                class="content-userPage-wrap"
                                :class="{
                                    lineActive: authState.isArticle == 'UserAll',
                                }"
                            >
                                <div
                                    class="content-userPage-title"
                                    @click="
                                        () => {
                                            authState.isArticle = 'UserAll';
                                        }
                                    "
                                >
                                    Все
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
        <div class="back" @click="$router.push('/')">Вернуться назад</div>
    </div>
</template>

<style scoped>
@font-face {
    font-family: JetBrainsMono;
    src: url('../../assets/JetBrainsMono.ttf');
}
@font-face {
    font-family: Russo-One;
    src: url('../../assets/RussoOne-Regular.ttf');
}
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}
.content-userPage-title {
    margin-bottom: 28px;
    padding-left: 20px;
    font-size: 18px;
    cursor: pointer;
    transition: 0.3s ease;
}
.content-userPage-title:hover {
    color: #1e66f5;
}
.userPage-wrap {
    display: flex;
    /* align-items: center; */
    flex-direction: column;
}
.content-userPage {
    margin-left: 37px;
}
.content-userPage-wrap {
    width: 200px;
    transition: 0.5s ease;
}
.lineActive {
    border-left: 2px solid #1e66f5;
}
.rotate {
    transform: rotate(180deg);
}
.active {
    background-color: #1e66f5;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}
.back {
    margin: auto 0;
    position: absolute;
    bottom: 0;
    margin-bottom: 15px;
    margin-left: 22px;
    cursor: pointer;
    transition: 0.3s ease;
}
.back:hover {
    color: #1e66f5;
}
.arrow {
    width: 24px;
    height: 24px;
    /* transform: rotate(180deg); */
    margin-bottom: 20px;
    transition: 0.2s ease;
    margin-left: 20px;
    cursor: pointer;
}
.wrap {
    display: flex;
    width: 275px;
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
}
.article {
    height: 42px;
    width: 235px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: background-color 0.2s ease;
    margin-bottom: 20px;
}
.title {
    margin-left: 15px;
    user-select: none;
    transition: 0.2s ease;

    /* margin-left: 16px; */
    /* padding-top: 8px; */
}
.title:hover {
    color: #d0d0d0;
}
.admin-container {
    width: 20%;
    height: 100vh;
    background-color: #181818;
    font-family: JetBrainsMono;
    font-size: 20px;
    color: white;
    position: sticky;
    top: 0;
    left: 0;
}
.admin-menu-title {
    margin-left: 15px;
    /* margin-top: 5px; */
    border-bottom: 1px solid #2b2b2b;
}
.admin-menu-wrapper {
}
.article-menu {
    margin-top: 22px;
}
.admin-title {
    font-family: Russo-One;
    font-size: 24px;
    color: #1e66f5;
}
.admin-panel-title {
    margin-top: 5px;
    margin-bottom: 10px;
}
</style>
