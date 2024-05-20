<script setup>
</script>

<template>
  <div class="content-userAll">
    <header class="content-header">
      <h1>Пользователи</h1>
    </header>
    <input type="text" placeholder="Поиск..." class="placeholder-userAll">
    <div class="text-list-userAll">Список пользователей</div>
    <div class="user-list">
      <div class="user-list-header">
        <span class="user-id">Id <button><img src="../../assets/admin/bottom.svg" alt="Sort"></button></span>
        <span class="user-login">Логин <button><img src="../../assets/admin/bottom.svg" alt="Sort"></button></span>
        <span class="user-password">Пароль <button><img src="../../assets/admin/bottom.svg" alt="Sort"></button></span>
        <span class="user-role">Права <button><img src="../../assets/admin/bottom.svg" alt="Sort"></button></span>
        <span class="user-name">Имя <button><img src="../../assets/admin/bottom.svg" alt="Sort"></button></span>
        <span class="user-edit">Редактировать</span>
        <span class="user-delete">Удалить</span>
      </div>
      <div class="user-item">
        <span class="user-id">1</span>
        <span class="user-login">o714b27</span>
        <span class="user-password">oo12pog</span>
        <span class="user-role">Администратор/Преподаватель</span>
        <span class="user-name">Петриков Кирилл Романович</span>
        <span class="user-edit" ><button><img src="../../assets/admin/piece_of_paper_and_pencil.svg" alt="Edit"></button></span>
        <span class="user-delete"><button><img src="../../assets/admin/cross-svgrepo-com.svg" alt="Delete"></button></span>
      </div>
      <div class="user-item">
        <span class="user-id">2</span>
        <span class="user-login">o714b27</span>
        <span class="user-password">oo12pog</span>
        <span class="user-role">Администратор/Преподаватель</span>
        <span class="user-name">Петриков Кирилл Романович</span>
        <span class="user-edit"><button><img src="../../assets/admin/piece_of_paper_and_pencil.svg" alt="Edit"></button></span>
        <span class="user-delete"><button><img src="../../assets/admin/cross-svgrepo-com.svg" alt="Delete"></button></span>
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
  align-items: center;
  margin-bottom: 20px;
  height: 70.5px;
  border-bottom: solid 1px #2B2B2B;
  border-left: solid 1px #2B2B2B;
  background-color: #181818;
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
}

.placeholder-userAll:focus {
  background-color: #333333;
  border-color: #1E66F5;
}

.text-list-userAll{
  font-family: "JetBrains Mono", monospace;
  margin-left: 20px;
  font-size: 1.3em;
  color: white;
}


/* Список пользователей */
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
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-password{
  width: 15%;
  display: flex;
  justify-content: center;
}

.user-role{
  width: 20%;
  display: flex;
  justify-content: center;

}
.user-name{
  width: 25%;
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
  /*border-bottom: 1px solid #333;*/
  width: 100%;
  display: flex;
  align-items: center;
  font-family: "JetBrains Mono", monospace;
  margin-left: 20px;
  font-size: 1.3em;
  color: white;
  text-align: center;

}

/* Общие стили для элементов списка */
.user-item span, .user-list-header span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* Кнопки редактирования и удаления */
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
