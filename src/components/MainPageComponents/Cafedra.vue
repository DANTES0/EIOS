<script setup>
import KafedraText from './CafedraText.vue';
import SectionTitle from './SectionTitle.vue';
import NumberColumn from './NumberColumn.vue';

const TextKafedra = [
    {
        title: 'Обучение новейшим технологиям',
        description:
            'Студенты получают знания о последних технологиях и методах разработки информационных систем, компьютерной графики, а также программного обеспечения для автоматизированных систем;',
    },
    {
        title: 'Направления кафедры',
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
    <div class="wrapper flex flex-col md:flex-row items-start">
        <!-- <NumberColumn
            :item-height="36"
            :vertical-padding="20"
            :horizontal-padding="10"
            :gap="8"
            :max-numbers="50"
        /> -->
        <div class="numbers-wrapper">
            <div
                v-for="i in 25"
                :key="i"
                class="numbers text-[#0C2340] dark:text-[#999999]"
            >
                {{ i }}
            </div>
        </div>
        <div id="kafedra" class="content-kafedra-wrapper">
            <SectionTitle title="КАФЕДРА" />
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

<style scoped>
.content-kafedra-wrapper {
    width: 100%;
}
.wrapper {
    padding-top: 0.5rem;
    height: auto; /* Уберите фиксированную высоту */
    min-height: 850px; /* Если нужно минимальное значение */
    width: 100%; /* Замените на 100vw для учета окна просмотра */
    overflow-x: hidden; /* Скройте горизонтальное переполнение */
    box-sizing: border-box; /* Убедитесь, что padding включен в размеры */
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
}
.title-kafedra {
    font-size: 48px;
    font-family: JetBrainsMono;
    font-weight: 200;
    width: 230px;
}
.title-kafedra-wrapper {
    width: 230px;
    padding-left: 7rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.line-dashed {
    position: relative;
    top: -38px;
    /* left: 71px; */
    font-size: 48px;
    font-weight: 500;
    letter-spacing: 8px;
    user-select: none;
    width: 15rem;
}
.cathedra span {
    font-weight: 700;
    margin-left: 10px;
    color: white;
}

@media (min-width: 1024px) and (max-width: 1440px) {
    .wrapper {
        /* padding: 40px 60px; */
        padding-left: 1rem;
    }

    .numbers {
        margin-left: 0;
    }
}

@media (min-width: 1441px) {
}
</style>
