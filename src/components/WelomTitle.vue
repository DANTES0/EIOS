<script setup>

</script>

<template>
<section class="promo">
                <div class="wrapper">
                    <h1 class="main_title">
                        <span class="cathedra">
                            Кафедра<span>O</span>7
                        </span>
                        Информационные системы и программная инженерия
                    </h1>
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
</template>

<style>
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
    line-height: 37px;
    font-weight: 600;
    max-width: 540px;

    display: flex;
    flex-direction: column;
    gap: 20px;
}

.cathedra span {
    font-weight: 700;
    margin-left: 10px;
    color: white;
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