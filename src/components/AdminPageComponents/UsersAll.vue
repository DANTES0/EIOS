<script setup>

import {computed, onMounted, ref, watch} from "vue";
import {useFetch} from "@vueuse/core";
import { authState } from "../../authState";

let array = ref([])
let flag = ref(true);
let flagLogin = ref(true);
let flagName = ref(true);

const url = computed(()=> {
  return `http://25.59.204.137:8080/api/v1/admin/users/all`
})

const fetchGroup = async () => {
  const response = await useFetch(url).json();
  array.value = response.data.value;
  console.log('LOG', array);
};

onMounted(() => {
  fetchGroup()
})

watch(array.value, () => {
  fetchGroup()
})

function sortById() {
  if(flag.value) {
    array.value.sort((a, b) => a.id - b.id);
    flag.value = !flag.value;
  } else{
    flag.value = !flag.value;
    array.value.sort((a, b) => b.id - a.id);
  }
}
function sortByLogin() {
  if(flagLogin.value) {
    array.value.sort((a, b) => a.login.localeCompare(b.login));
    flagLogin.value = !flagLogin.value;
  } else{
    flagLogin.value = !flagLogin.value;
    array.value.sort((a, b) =>b.login.localeCompare(a.login));
  }
}

function sortByName() {
  if(flagName.value) {
    array.value.sort((a, b) => a.name.localeCompare(b.name));
    flagName.value = !flagName.value;
  } else{
    flagName.value = !flagName.value;
    array.value.sort((a, b) =>b.name.localeCompare(a.name));
  }
}

</script>

<template>
  <div class="content-userAll">

    <header class="content-header">
        <div class="line"></div>
      <h1>Пользователи</h1>
    </header>
    <div class="wrap-input-btn">
      <input type="text" placeholder="Поиск..." class="placeholder-userAll">
      <button @click="authState.isVisibleModalAddUsers = true" class="addUser">Новый пользователь</button>
    </div>
    <div class="text-list-userAll">Список пользователей</div>
    <div class="user-list">
      <div class="user-list-header">
        <span class="user-id">Id <button><img src="../../assets/admin/bottom.svg" @click="sortById" ></button></span>
        <span class="user-login">Логин <button><img src="../../assets/admin/bottom.svg" @click="sortByLogin"></button></span>
        <span class="user-role">Права<button><img src="../../assets/admin/bottom.svg" ></button></span>
        <span class="user-name">Имя <button><img src="../../assets/admin/bottom.svg" @click="sortByName"></button></span>
        <span class="user-edit">Редактировать</span>
        <span class="user-delete">Удалить</span>
      </div>

      <div v-for="item in array"   class="user-item">
        <span class="user-id">{{ item.id }}</span>
        <span class="user-login">{{ item.login }}</span>
        <span class="user-role">{{ item.roles[0] }}</span>
        <span class="user-name">{{ item.name }}</span>
        <span class="user-edit"><button><img src="../../assets/admin/piece_of_paper_and_pencil.svg" alt="Edit"></button></span>
        <span class="user-delete"><button><img src="../../assets/admin/cross-svgrepo-com.svg" alt="Delete"></button></span>
      </div>

    </div>
  </div>
</template>

<style scoped>

@font-face {
  font-family: JetBrainsMono;
  src: url("../../assets/JetBrainsMono.ttf");
}
.wrap-input-btn {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.addUser {
  width: 240px;
  height: 40px;
  background-color: transparent;
  border: 1px solid #CCCCCC;
  font-family: JetBrainsMono;
  font-size: 18px;
  color: #CCCCCC;
  border-radius: 4px;
  transition: 0.3s ease;
  margin-right: 30px;
}
.addUser:hover {
  background-color: #222222;
    border-color: #1E66F5;
}
.addUser:active {
  background-color: #333333;
    border-color: #1E66F5;
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
  border-bottom: solid 1px #2B2B2B;
  /* border-left: solid 1px #2B2B2B; */

  background-color: #181818;
}

.line {
    width: 1px;
    height: 100%;
    background-color: #2B2B2B;
}

.content-header h1 {
  font-family: "JetBrains Mono", monospace;
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
  background-color: #1A1A1A;
  color: #FFFFFF;
  outline: #1E66F5;
  transition: 0.3s ease
}
.placeholder-userAll::placeholder {
    font-family: JetBrainsMono;
}

.placeholder-userAll:focus {
  border-color: #1E66F5;
}

.text-list-userAll{
  font-family: "JetBrains Mono", monospace;
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

.user-id{
  width: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-login{
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-role{
  width: 20%;
  display: flex;
  justify-content: center;
}

.user-name{
  width: 35%;
  display: flex;
  justify-content: center;
}

.user-edit{
  width: 10%;
  display: flex;
  justify-content: center;
}

.user-delete{
  width: 10%;
  display: flex;
  justify-content: center;
}

.user-list-header, .user-item {
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
  font-family: "JetBrains Mono", monospace;
  margin-left: 20px;
  font-size: 1.3em;
  color: white;
  text-align: center;
}

.user-item {
  width: 100%;
  display: flex;
  align-items: center;
  font-family: "JetBrains Mono", monospace;
  margin-left: 20px;
  font-size: 1.3em;
  color: white;
  text-align: center;

}

.user-item span, .user-list-header span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.user-item button, .user-id button, .user-name button, .user-password button, .user-role button, .user-login button {
  background: none;
  border: none;
  color: #FFFFFF;
  cursor: pointer;
  justify-content: center;
  align-items: center;
}

.user-item button:hover {
  color: #00A0FF;
}
</style>
