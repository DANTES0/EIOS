<script setup>
import KafedraText from './KafedraText.vue';

const TextKafedra = [
    {
        title: 'Обучение новейшим технологиям',
        description:
            'Студенты получают знания о последних технологиях и методах разработки информационных систем, компьютерной графики, а также программного обеспечения для автоматизированных систем;',
    },
    {
        title: 'Направления Кафедры',
        description:
            'Мы осуществляем обучение бакалавров по двум направлениям: «Информационные системы и технологии» и «Программная инженерия», а также подготовку магистров по направлению «Программная инженерия»;',
    },
    {
        title: 'Опытные преподаватели',
        description:
            'У нас высококвалифицированный состав преподавателей, большая часть которых имеет ученые степени, а также богатый опыт работы по тематике преподаваемых дисциплин на ведущих предприятиях Санкт-Петербурга;',
    },
];
</script>

<template>
    <div class="wrapper">
        <div class="numbers-wrapper">
            <div v-for="i in 25" :key="i" class="numbers">{{ i }}</div>
        </div>
        <div id="kafedra" class="content-kafedra-wrapper">
            <div class="title-kafedra-wrapper">
                <h1 class="title-kafedra">
                    <span style="color: #1e66f5">#</span>КАФЕДРА
                </h1>
                <label class="line-dashed">----------</label>
            </div>
            <KafedraText
                v-for="(value, index) in TextKafedra"
                :id="index"
                :key="index"
                :title="value.title"
                :description="value.description"
            ></KafedraText>
        </div>
    </div>
</template>

<style>
@font-face {
    font-family: JetBrainsMono;
    src: url('../../assets/JetBrainsMono.ttf');
}
@font-face {
    font-family: Rubik;
    src: url('../../assets/Rubik.ttf');
}

.content-kafedra-wrapper {
    width: 100%;
}
.wrapper {
    height: 850px;
    background-color: #1f1f1f;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
}
.tabs {
    width: 100%;
    height: 28px;
    background-color: #181818;
}
.numbers {
    color: #999999;
    margin-top: 14px;
    font-size: 16px;
    font-family: JetBrainsMono;
    font-weight: 100;
    margin-left: 26px;
}
.numbers-wrapper {
    display: flex;
    flex-direction: column;
}
.title-kafedra {
    font-size: 48px;
    font-family: JetBrainsMono;
    font-weight: 200;
    color: white;
    margin-left: 128px;
    margin-top: 18px;
    width: 230px;
}
.title-kafedra-wrapper {
    width: 230px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.line-dashed {
    position: relative;
    top: -38px;
    left: 70px;
    font-size: 48px;
    font-weight: 500;
    color: white;
    letter-spacing: 8px;
    user-select: none;
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
    color: white;
    font-weight: 400;
    font-size: 33px;
    line-height: 34px;
    letter-spacing: 1px;
}
</style>
