<script setup>
</script>

<template>
    <div class="Main-page">
        <div class="container">
            <div class="wrapper">
                <h1 class="main_title">Кафедра 
                    <span class="cathedra">
                        <span style="color:white">O</span>
                        7
                    </span>
                </h1>
                <h2 class="subtitle">Информационные системы и программная инженерия</h2>
                <div class="descr">Студенты в процессе обучения получают знания о последних технологиях и методах моделирования, осваивают навыки разработки информационных систем, компьютерной графики, а также программного обеспечения для автоматизированных систем.</div>
            </div>

            <div class="pictures">
                <div class="debug"></div>
                <div class="error"></div>
                <div class="warning"></div>
                <div class="code"></div>
                <div class="laptop"></div>
            </div>
        </div>
    </div>
</template>

<style>
.Main-page {
    display: flex;
    justify-content: center;
    align-items: center;
}
.container {
    max-width: 1390px;
    font-family: Jost;
    color: #408AFA;
}
.wrapper {
    margin-top: 71px;
    width: 653px;
}

.main_title {
    font-size: 42px;
    font-weight: 600;
}

.cathedra {
    font-weight: 700;
    letter-spacing: -6px;
}

.subtitle {
    width: 522px;
    margin-top: 15px;
    font-weight: 600;
    font-size: 41px;
    line-height: 37px;
}

.descr {
    margin-top: 56px;
    color:white;
    font-weight: 400;
    font-size: 33px;
    line-height: 34px;
    letter-spacing: 1px;
}
</style>