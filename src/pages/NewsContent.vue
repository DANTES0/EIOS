<script setup>
import NewsContentHeader from '../components/NewsContentPageComponents/NewsContentHeader.vue'
import NewsContentBase from '../components/NewsContentPageComponents/NewsContentBase.vue'
import NewsContentPageSlider from '../components/NewsContentPageComponents/NewsContentPageSlider.vue'

</script>

<template>

  <div class="page-container-header">
    <NewsContentHeader></NewsContentHeader>
      </div>


  <div class="page-container-base">
    <NewsContentBase></NewsContentBase>
  </div>
  <div class="page-container-base-slider">
    <NewsContentPageSlider></NewsContentPageSlider>
  </div>


</template>

<style scoped>

.page-container-header {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.page-container-base {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

}
.page-container-base-slider{
  padding-top: 40px;
  width: 90%;
  background-color: #181818;
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  margin: 0 auto;
  padding-bottom: 50px;
  margin-bottom: 50px;
}

</style>