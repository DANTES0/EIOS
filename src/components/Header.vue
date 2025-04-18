<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import HeaderAnchor from './HeaderAnchor.vue';
import { authState } from '../authState';
import { useStore } from 'vuex';
import { ref, onMounted } from 'vue';
import useRoles from '../store/useRoles.js';

const store = useStore();
const theme = ref(localStorage.getItem('theme') || 'light');

const { isAdminOrTeacher } = useRoles();

onMounted(() => {
    if (
        theme.value === 'dark' ||
        (!localStorage.getItem('theme') &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});

const toggleAuthVisibility = () => {
    authState.isVisible = !authState.isVisible;
    console.log(authState.isVisible);
};

const changeTheme = () => {
    if (theme.value === 'dark') {
        localStorage.setItem('theme', 'light');
        document.body.classList.remove('dark');
        document.documentElement.classList.remove('dark'); // Убираем с html
        console.log(localStorage.getItem('theme'));
        theme.value = 'light';
        window.dispatchEvent(new CustomEvent('theme-changed'));
    } else {
        localStorage.setItem('theme', 'dark');
        console.log(localStorage.getItem('theme'));
        setTimeout(() => {
            document.body.classList.add('dark');
            document.documentElement.classList.add('dark'); // Добавляем к html
        }, 0);
        theme.value = 'dark';
        window.dispatchEvent(new CustomEvent('theme-changed'));
    }
};
</script>

<template>
    <div
        class="header-wrapper"
        :class="
            $route.path.match(/^\/teachers\/detail\/*/) ||
            $route.path.match(/^\/news\/get\/*/)
                ? 'w-auto'
                : 'laptop:w-[21.6vw] desktop:w-[18.6vw]'
        "
    >
        <!-- <div
            class="header-wrapper-container bg-[#0C2340] dark:bg-[#181818] border-r border-white dark:border-[#2b2b2b] min-w-[50px]"
            :class="$route.path.match(/^\/teachers\/\d+$/) ? 'w-full' : 'w-[15%]'"
        > -->
        <div
            class="bg-[#0C2340] dark:bg-[#181818] border-r border-white dark:border-[#2b2b2b] min-w-[50px] h-full flex flex-col items-center justify-between"
            :class="$route.path.match(/^\/teachers\/\d+$/) ? 'w-full' : 'w-[3.2vw]'"
        >
            <div class="page-header">
                <Popper :placement="'right'" :hover="true" content="Главная">
                    <a
                        id="main"
                        class="page"
                        data-title="Главная страница"
                        @click="$router.push('/')"
                    ></a>
                </Popper>
                <Popper :placement="'right'" :hover="true" content="Новости">
                    <a
                        id="q"
                        class="page"
                        data-title="Новости"
                        @click="$router.push('/news')"
                    ></a>
                </Popper>
                <Popper :placement="'right'" :hover="true" content="Расписание">
                    <a
                        id="w"
                        class="page"
                        data-title="Расписание"
                        @click="$router.push('/timetable')"
                    ></a>
                </Popper>
                <Popper :placement="'right'" :hover="true" content="Преподаватели">
                    <a
                        id="f"
                        class="page"
                        data-title="Комиссия"
                        @click="$router.push('/teachers')"
                    ></a>
                </Popper>
                <Popper :placement="'right'" :hover="true" content="Админ-панель">
                    <a
                        v-if="authState.isAccess && isAdminOrTeacher"
                        id="e"
                        class="page"
                        data-title="Админ-панель"
                        @click="$router.push('/admin')"
                    ></a>
                </Popper>
            </div>
            <div class="page-header-bottom">
                <a
                    id="settings"
                    class="page"
                    data-title="moodle"
                    @click="changeTheme"
                ></a>
                <Popper :placement="'right'" :hover="true" content="Авторизоваться">
                    <a
                        id="profile"
                        class="page"
                        data-title="Профиль"
                        @click="
                            () => {
                                toggleAuthVisibility();
                                store.dispatch('logout');
                            }
                        "
                    ></a>
                </Popper>
                <Popper :placement="'right'" :hover="true" content="Главный сайт">
                    <a
                        id="voenmeh"
                        href="https://www.voenmeh.ru/"
                        class="page"
                        data-title="voenmeh"
                    ></a>
                </Popper>
                <Popper :placement="'right'" :hover="true" content="Мудл">
                    <a
                        id="moodle"
                        href="https://moodle.voenmeh.ru/login/index.php"
                        class="page"
                        data-title="moodle"
                    ></a>
                </Popper>
                <Popper :placement="'right'" :hover="true" content="Корпоративная почта">
                    <a
                        id="mailvoenmeh"
                        href="https://mail.voenmeh.ru/mail/"
                        class="page"
                        data-title="mailvoenmeh"
                    ></a>
                </Popper>
            </div>
        </div>
        <div
            v-if="
                !(
                    $route.path === '/newsContent' ||
                    $route.path.match(/^\/news\/get\/*/) ||
                    $route.path === '/teachers/detail' ||
                    $route.path.match(/^\/teachers\/detail\/*/)
                )
            "
            class="header-wrapper-anchor-container bg-[#0C2340] dark:bg-[#181818] border-r border-white dark:border-[#2b2b2b]"
        >
            <div class="pum">
                <a
                    class="title text-white dark:text-[#1e66f5]"
                    @click="$router.push('/')"
                >
                    Кафедра <span class="text-[#1e66f5] dark:text-white">О</span>7
                </a>
            </div>
            <HeaderAnchor></HeaderAnchor>
        </div>
    </div>
</template>

<style scoped>
@font-face {
    font-family: Russo-One;
    src: url('../assets/RussoOne-Regular.ttf');
}

:deep(.popper) {
    @apply bg-[#cccccc] text-black dark:bg-[#181818] dark:text-white !important;
    padding: 10px !important;
    border: 1px solid #ccc !important;
    border-radius: 6px !important;
}

#main {
    background-image: url('../assets/header/home.svg');
    filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg) brightness(70%)
        contrast(90%);
    margin-top: 15px;
    display: block;
}
/* .page:hover::after {
  content: attr(data-title);
  position: absolute;
  left: 50px;
  top: 5%;
  z-index: 19;
  background-color: #ffffff;
  font-family: Russo-One, sans-serif;
  font-size: 12px;
  padding: 5px 10px;
  border: 1px solid #333;
  border-radius: 10px;

  color: #838383;
  width: 150px;
  height: 15px;
  text-align: center;
  filter: invert(11%) sepia(0%) saturate(1%) hue-rotate(112deg) brightness(98%)
    contrast(85%);
} */
/* .page:hover::before {
  content: "";
  position: absolute;
  left: 45px;
  bottom: 13px;
  width: 13px;
  height: 13px;
  background: #ffffff;
  transform: rotate(41deg);
  filter: invert(11%) sepia(0%) saturate(1%) hue-rotate(112deg) brightness(98%)
    contrast(85%);
  z-index: 999;
  border-left: 1px solid #000;
  border-bottom: 1px solid #000;
} */
.pum {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    /* justify-content: space-around; */
    align-items: center;
    /* font-family: JetBrainsMono;
    font-weight: 900; */
}
.inline-block {
    margin: 0px !important;
    border: none !important;
}
/* #q:hover::after {
  width: 100px;
} */
#voenmeh {
    background-image: url('../assets/header/voenmeh.svg');
    background-size: contain;
    background-position: 50%;
    background-repeat: no-repeat;
    transform: scale(1.4);
    filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg) brightness(70%)
        contrast(90%);
}
#mailvoenmeh {
    background-image: url('../assets/header/mail.svg');
    background-size: contain;
    background-position: 50%;
    transform: scale(1.1);
    filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg) brightness(70%)
        contrast(90%);
}
#moodle {
    background-image: url('../assets/header/bottom/moodle.svg');
    background-size: contain;
    transform: scale(1.3);
    filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg) brightness(70%)
        contrast(90%);
}
#settings {
    background-image: url('../assets/header/bottom/settings.svg');
    background-size: contain;
    transform: scale(1.3);
    filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg) brightness(70%)
        contrast(90%);
}
#profile {
    background-image: url('../assets/header/bottom/profile.svg');
    background-size: contain;
    /* transform: scale(1); */
    filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg) brightness(70%)
        contrast(90%);
}
#q {
    background-image: url('../assets/header/second.svg');
    filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg) brightness(70%)
        contrast(90%);
    display: block;
}
.page-header-bottom {
    display: flex;
    flex-direction: column;
    font-size: 20px;
    /* margin-bottom: 10px; */
}
#w {
    background-image: url('../assets/header/third.svg');
    filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg) brightness(70%)
        contrast(90%);
    display: block;
}
#e {
    background-image: url('../assets/header/fourth.svg');
    filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg) brightness(70%)
        contrast(90%);
    display: block;
}
#f {
    background-image: url('../assets/header/prepod.svg');
    background-size: contain;
    filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg) brightness(70%)
        contrast(90%);
    display: block;
    transform: scale(1.3);
}
#r {
    /* background-image: url("../assets/voenmeh3.svg"); */
    transform: scale(2.5);
    filter: invert(63%) sepia(92%) saturate(7299%) hue-rotate(215deg) brightness(99%)
        contrast(94%);
    /* filter: invert(54%) sepia(1%) saturate(0%) hue-rotate(341deg) brightness(93%) contrast(89%); */
}
#r:hover {
    filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg) brightness(100%)
        contrast(110%);
}
#f:hover {
    filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg) brightness(100%)
        contrast(110%);
}
#moodle:hover {
    filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg) brightness(100%)
        contrast(110%);
}
#settings:hover {
    filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg) brightness(100%)
        contrast(110%);
}
#profile:hover {
    filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg) brightness(100%)
        contrast(110%);
}
#voenmeh:hover {
    filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg) brightness(100%)
        contrast(110%);
}
#mailvoenmeh:hover {
    filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg) brightness(100%)
        contrast(110%);
}
#e:hover::after {
    width: 100px;
}
#w:hover::after {
    width: 100px;
}
#moodle:hover::after {
    width: 100px;
}
#main:hover {
    filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg) brightness(100%)
        contrast(110%);
}
#q:hover {
    filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg) brightness(100%)
        contrast(110%);
}
#w:hover {
    filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg) brightness(100%)
        contrast(110%);
}
#e:hover {
    filter: invert(100%) sepia(10%) saturate(7%) hue-rotate(220deg) brightness(100%)
        contrast(110%);
}
.header-wrapper {
    position: sticky;
    top: 0;
    left: 0;
    height: 100vh;
    background-color: #0d101f;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    font-family: Russo-One;
    background: transparent;
}
.header-wrapper-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 31px;
    font-weight: 700;
    font-family: Jost;
    color: white;
    overflow: hidden;
}
.header-wrapper-anchor-container {
    width: 85%;
    height: 100%;
    overflow: hidden;
}
.title {
    font-size: 1.6vw;
    cursor: pointer;
    text-decoration: none;
    user-select: none;
    margin-left: 20px;
    margin-bottom: 20px;
}
.page-header {
    display: flex;
    flex-direction: column;
    font-size: 20px;
}
.page {
    cursor: pointer;
    font-weight: 300;
    width: 2vw;
    aspect-ratio: 1;
    margin-bottom: 20px;
    display: block;
}

.voenmeh-title {
    width: 40px;
    height: 40px;
}
#arrow_down:hover {
    transform: rotate(90deg);
}
</style>
