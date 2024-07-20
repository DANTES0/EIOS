<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useFetch } from '@vueuse/core';
import { authState } from '../../authState';
import eventBus from '../../eventBus.js';
import config from '../../config';

let array = ref([]);
let filteredArray = ref([]);
let searchQuery = ref('');
let searchCriterion = ref('id');
let flag = ref(true);
let flagLogin = ref(true);
let flagName = ref(true);
let flagCourse = ref(true);

const url = computed(() => {
    return `${config.KirURL}/api/v1/students/all`;
});

const fetchGroup = async () => {
    const response = await useFetch(url).json();
    array.value = response.data.value;
    filteredArray.value = array.value;
    console.log('LOG', array);
};

const filterUsers = () => {
    if (searchQuery.value) {
        filteredArray.value = array.value.filter((user) => {
            if (searchCriterion.value === 'id') {
                return user.id.toString().includes(searchQuery.value);
            } else if (searchCriterion.value === 'login') {
                return user.login.toLowerCase().includes(searchQuery.value.toLowerCase());
            } else if (searchCriterion.value === 'name') {
                return user.name.toLowerCase().includes(searchQuery.value.toLowerCase());
            } else if (searchCriterion.value === 'course') {
                return user.course.toString().includes(searchQuery.value);
            }
        });
    } else {
        filteredArray.value = array.value;
    }
};

watch([searchQuery, searchCriterion], filterUsers);

onMounted(() => {
    fetchGroup();
});

watch(array.value, () => {
    fetchGroup();
});

watch(authState.isVisibleModalAddUsers, (newVal) => {
    if (!newVal) {
        fetchGroup();
    }
});

const editUser = (id) => {
    authState.editUserId = id;
    authState.isVisibleEditStudentModelComponent = true;
};

eventBus.on('studentAdded', fetchGroup);

function sortById() {
    if (flag.value) {
        filteredArray.value.sort((a, b) => a.id - b.id);
        flag.value = !flag.value;
    } else {
        filteredArray.value.sort((a, b) => b.id - a.id);
        flag.value = !flag.value;
    }
}

function sortByLogin() {
    if (flagLogin.value) {
        filteredArray.value.sort((a, b) => a.login.localeCompare(b.login));
        flagLogin.value = !flagLogin.value;
    } else {
        filteredArray.value.sort((a, b) => b.login.localeCompare(a.login));
        flagLogin.value = !flagLogin.value;
    }
}

function sortByName() {
    if (flagName.value) {
        filteredArray.value.sort((a, b) => a.name.localeCompare(b.name));
        flagName.value = !flagName.value;
    } else {
        filteredArray.value.sort((a, b) => b.name.localeCompare(a.name));
        flagName.value = !flagName.value;
    }
}

function sortByCourse() {
    if (flagCourse.value) {
        filteredArray.value.sort((a, b) => a.course - b.course);
        flagCourse.value = !flagCourse.value;
    } else {
        flagCourse.value = !flagCourse.value;
        filteredArray.value.sort((a, b) => b.course - a.course);
    }
}

const deleteUser = async (id) => {
    try {
        const response = await fetch(`${config.KirURL}/user/delete/${id}`, {
            method: 'POST',
        });

        if (response.ok) {
            await fetchGroup();
        } else {
            console.error('Failed to delete user', await response.text());
        }
    } catch (error) {
        console.error('Failed to delete user', error);
    }
};
</script>

<template>
    <div class="content-userAll">
        <header class="content-header">
            <div class="line"></div>
            <h1>Студенты</h1>
        </header>
        <div class="wrap-input-btn">
            <select v-model="searchCriterion" class="search-select">
                <option class="search-select-option" value="id">Id</option>
                <option class="search-select-option" value="login">Логин</option>
                <option class="search-select-option" value="name">Имя</option>
                <option class="search-select-option" value="course">Курс</option>
            </select>

            <input
                type="text"
                placeholder="Поиск..."
                v-model="searchQuery"
                class="placeholder-userAll"
            />
            <button @click="authState.isVisibleModalAddUsers = true" class="addUser">
                Новый пользователь
            </button>
        </div>
        <div class="text-list-userAll">Список студентов</div>
        <div class="user-list">
            <div class="user-list-header">
                <span class="user-id"
                    >Id
                    <button>
                        <img
                            src="../../assets/admin/bottom.svg"
                            @click="sortById"
                        /></button
                ></span>
                <span class="user-login"
                    >Логин
                    <button>
                        <img
                            src="../../assets/admin/bottom.svg"
                            @click="sortByLogin"
                        /></button
                ></span>
                <span class="user-role"
                    >Группа<button>
                        <img src="../../assets/admin/bottom.svg" /></button
                ></span>
                <span class="user-role"
                    >Курс<button>
                        <img
                            src="../../assets/admin/bottom.svg"
                            @click="sortByCourse"
                        /></button
                ></span>
                <span class="user-name"
                    >Имя
                    <button>
                        <img
                            src="../../assets/admin/bottom.svg"
                            @click="sortByName"
                        /></button
                ></span>
                <span class="user-edit">Редактировать</span>
                <span class="user-delete">Удалить</span>
            </div>

            <div
                v-if="filteredArray.length"
                v-for="item in filteredArray"
                :key="item.id"
                class="user-item"
            >
                <span class="user-id">{{ item.id }}</span>
                <span class="user-login">{{ item.login }}</span>
                <span class="user-role">{{ item.group }}</span>
                <span class="user-role">{{ item.course }}</span>
                <span class="user-name">{{ item.name }}</span>
                <span class="user-edit"
                    ><button>
                        <img
                            src="../../assets/admin/piece_of_paper_and_pencil.svg"
                            @click="editUser(item.id)"
                        /></button
                ></span>
                <span class="user-delete"
                    ><button>
                        <img
                            src="../../assets/admin/cross-svgrepo-com.svg"
                            @click="deleteUser(item.id)"
                        /></button
                ></span>
            </div>

            <div v-else class="user-item">
                Данные о пользователях или пользователе отсутсвуют
            </div>
        </div>
    </div>
</template>

<style scoped>
@font-face {
    font-family: JetBrainsMono;
    src: url('../../assets/JetBrainsMono.ttf');
}
.wrap-input-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
}
.addUser {
    margin-left: auto;
    width: 240px;
    height: 40px;
    background-color: transparent;
    border: 1px solid #cccccc;
    font-family: JetBrainsMono;
    font-size: 18px;
    color: #cccccc;
    border-radius: 4px;
    transition: 0.3s ease;
    margin-right: 30px;
}
.addUser:hover {
    background-color: #222222;
    border-color: #1e66f5;
}
.addUser:active {
    background-color: #333333;
    border-color: #1e66f5;
}
.content-userAll {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.content-header {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    height: 70.5px;
    border-bottom: solid 1px #2b2b2b;
    /* border-left: solid 1px #2B2B2B; */

    background-color: #181818;
}

.line {
    width: 1px;
    height: 100%;
    background-color: #2b2b2b;
}

.content-header h1 {
    font-family: 'JetBrains Mono', monospace;
    margin-left: 20px;
    font-size: 1.5em;
    color: white;
}

.placeholder-userAll {
    width: 50%;
    margin: 20px;
    padding: 8px;
    font-size: 1em;
    border: 1px solid #333;
    border-radius: 5px;
    background-color: #1a1a1a;
    color: #ffffff;
    outline: #1e66f5;
    transition: 0.3s ease;
}
.placeholder-userAll::placeholder {
    font-family: JetBrainsMono;
}

.search-select {
    padding: 8px;
    padding-right: 30px;
    margin-right: 10px;
    border: 1px solid #333;
    border-radius: 5px;
    font-size: 1em;
    background-color: #1a1a1a;
    color: #ffffff;
    outline: #1e66f5;
    background: url('../../assets/admin/bottom.svg') no-repeat right center;
    transition: 0.3s ease;
}

.search-select-option {
    font-size: 0.8em;
    background-color: #1a1a1a;
}

.search-select:focus {
    border-color: #1e66f5;
}

.placeholder-userAll:focus {
    border-color: #1e66f5;
}

.text-list-userAll {
    font-family: 'JetBrains Mono', monospace;
    margin-left: 20px;
    font-size: 1.3em;
    color: white;
}

.user-list {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    margin-right: 30px;
}

.user-id {
    width: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.user-login {
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.user-role {
    width: 15%;
    display: flex;
    justify-content: center;
}

.user-name {
    width: 30%;
    display: flex;
    justify-content: center;
}

.user-edit {
    width: 10%;
    display: flex;
    justify-content: center;
}

.user-delete {
    width: 10%;
    display: flex;
    justify-content: center;
}

.user-list-header,
.user-item {
    justify-content: center;
    display: flex;
    align-items: center;
    margin: 10px 0;
    padding-bottom: 15px;
    border-bottom: 1px solid #818181;
}

.user-list-header {
    width: 100%;
    display: flex;
    align-items: center;
    font-family: 'JetBrains Mono', monospace;
    margin-left: 20px;
    font-size: 1.3em;
    color: white;
    text-align: center;
}

.user-item {
    width: 100%;
    display: flex;
    align-items: center;
    font-family: 'JetBrains Mono', monospace;
    margin-left: 20px;
    font-size: 1.3em;
    color: white;
    text-align: center;
}

.user-item span,
.user-list-header span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.user-item button,
.user-id button,
.user-name button,
.user-password button,
.user-role button,
.user-login button {
    background: none;
    border: none;
    color: #ffffff;
    cursor: pointer;
    justify-content: center;
    align-items: center;
}

.user-item button:hover {
    color: #00a0ff;
}
</style>
