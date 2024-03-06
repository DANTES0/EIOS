<script setup>

</script>

<template>
    
        <div class="header-wrapper">
            <div class="header-wrapper-container">
                <div class="title">О<span style="color:#408AFA">7</span></div>
                <div class="page-header"> 
                    <a class="page"> Новости</a>
                    <a class="page"> Поступающим</a>
                    <a class="page"> Фотогалерея</a>
                </div>
            </div>
        </div>

</template>

<style scoped>
    
    .header-wrapper {
        width: 100%;
        height: 142px;
        background-color: #0d101f;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .header-wrapper-container {
        width: 100%;
        max-width: 1390px;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        font-size: 31px;
        font-weight: 700;
        font-family: Jost;
        color: white;
        
    }
    .title {
        margin-left: 54px;
        margin-right: 40px;
        font-size: 42px;
    }
    .page-header {
        display: flex;
        flex-direction: row;
    }
    .page {
        margin-right: 36px;
        cursor: pointer;
        font-weight: 300;
    }
</style>