<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useFetch } from '@vueuse/core';
import { authState } from '../../authState';
import config from '../../config';

let array = ref([]);
let filteredArray = ref([]);
let searchQuery = ref('');
let searchCriterion = ref('id');
let flag = ref(true);
let flagLogin = ref(true);
let flagName = ref(true);

const url = computed(() => {
    return `${config.KirURL}/api/v1/users/all`;
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
            } else if (searchCriterion.value === 'roles') {
                return user.roles[0]
                    .toLowerCase()
                    .includes(searchQuery.value.toLowerCase());
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
            <h1>Пользователи</h1>
        </header>
        <div class="wrap-input-btn">
            <select v-model="searchCriterion" class="search-select">
                <option class="search-select-option" value="id">Id</option>
                <option class="search-select-option" value="login">Логин</option>
                <option class="search-select-option" value="name">Имя</option>
                <option class="search-select-option" value="roles">Роль</option>
            </select>

            <input
                v-model="searchQuery"
                type="text"
                placeholder="Поиск..."
                class="placeholder-userAll"
            />
        </div>
        <div class="text-list-userAll">Список пользователей</div>
        <div class="user-list">
            <div class="user-list-header">
                <span class="user-id">
                    Id
                    <button @click="sortById">
                        <img src="../../assets/admin/bottom.svg" />
                    </button>
                </span>
                <span class="user-login">
                    Логин
                    <button @click="sortByLogin">
                        <img src="../../assets/admin/bottom.svg" />
                    </button>
                </span>
                <span class="user-role">
                    Права<button>
                        <img src="../../assets/admin/bottom.svg" />
                    </button>
                </span>
                <span class="user-name">
                    Имя
                    <button @click="sortByName">
                        <img src="../../assets/admin/bottom.svg" />
                    </button>
                </span>
                <span class="user-edit">Редактировать</span>
                <span class="user-delete">Удалить</span>
            </div>

            <div
                v-for="item in filteredArray"
                v-if="filteredArray.length"
                :key="item.id"
                class="user-item"
            >
                <span class="user-id">{{ item.id }}</span>
                <span class="user-login">{{ item.login }}</span>
                <span class="user-role">{{ item.roles[0] }}</span>
                <span class="user-name">{{ item.name }}</span>
                <span class="user-edit">
                    <button>
                        <img
                            src="../../assets/admin/piece_of_paper_and_pencil.svg"
                            alt="Edit"
                        />
                    </button>
                </span>
                <span class="user-delete">
                    <button @click="deleteUser(item.id)">
                        <img src="../../assets/admin/cross-svgrepo-com.svg" />
                    </button>
                </span>
            </div>

            <div v-else class="user-item">
                Данные о пользователях или пользователе отсутсвуют
            </div>
        </div>
    </div>
</template>

<style scoped>
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

.wrap-input-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
}

.search-select-option {
    font-size: 0.8em;
}

.search-select {
    padding: 8px;
    padding-right: 30px;
    margin-right: 10px;
    border: 1px solid #333;
    border-radius: 5px;
    font-size: 16px;
    background-color: #1a1a1a;
    color: #ffffff;
    outline: #1e66f5;
    background: url('../../assets/admin/bottom.svg') no-repeat right center;
    transition: 0.3s ease;
}

.search-select:focus {
    border-color: #1e66f5;
    background-color: #1a1a1a;
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
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.user-role {
    width: 20%;
    display: flex;
    justify-content: center;
}

.user-name {
    width: 35%;
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
