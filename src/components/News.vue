<script setup></script>
<template>
  <div class="news-wrapper">
    <div class="numbers-wrapper">
      <div class="numbers" v-for="i in 19">{{ i }}</div>
    </div>
    <div class="content-news-wrapper">
      <div class="title-news-wrapper">
        <h1 class="title-news"><span style="color: #1e66f5">#</span>НОВОСТИ</h1>
        <label class="line-dashed">----------</label>
      </div>
    </div>
  </div>
</template>

<style>
.news-wrapper {
  height: 664px;
  width: 100%;
  background-color: #191919;
  margin-top: 33px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
}
.title-news {
  font-size: 48px;
  font-family: JetBrainsMono;
  font-weight: 200;
  color: white;
  margin-left: 128px;
  margin-top: 18px;
  width: 230px;
}
.title-news-wrapper {
  width: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
