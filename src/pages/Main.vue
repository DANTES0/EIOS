<script setup>
</script>

<template>
    <div class="Main-page">
        <div class="container">
            <section class="promo">
                <div class="wrapper">
                    <h1 class="main_title">
                        Кафедра 
                        <span class="cathedra">
                            <span style="color:white">O</span>
                            7
                        </span>
                    </h1>
                    <h2 class="subtitle">Информационные системы и программная инженерия</h2>
                    <p class="descr">Студенты в процессе обучения получают знания о последних технологиях и методах моделирования, осваивают навыки разработки информационных систем, компьютерной графики, а также программного обеспечения для автоматизированных систем.</p>
                </div>
            </section>

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
.container {
    margin-top: 71px;
    max-width: 1390px;
    margin: 0 auto;
    font-family: Jost;
    color: #408AFA;
}
.wrapper {
    width: 653px;
}

.promo {
    padding: 80px 0 160px;

    background-image: url('../assets/pictures.png');
    background-repeat: no-repeat;
    background-size: auto calc(100% - 50px);
    background-position: right 50px;
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