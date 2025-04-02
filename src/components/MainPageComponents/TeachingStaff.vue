<script setup>
import PrepodavateliKafedriCarousel from './TeachingStaffСarousel.vue';
import SectionTitle from './SectionTitle.vue';
</script>

<template>
    <div class="wrapper-prepod text-[#0C2340] dark:text-[#999999]">
        <div class="numbers-wrapper text-[#0C2340] dark:text-[#999999]">
            <div v-for="i in 22" :key="i" class="numbers">{{ i }}</div>
        </div>
        <div id="prepod" class="content-prepod-wrapper bg-white dark:bg-[#1f1f1f]">
            <SectionTitle title="ПРЕПОДАВАТЕЛИ КАФЕДРЫ" :base-length="13" />
            <PrepodavateliKafedriCarousel></PrepodavateliKafedriCarousel>
        </div>
    </div>
</template>

<style scoped>
.wrapper-prepod {
    min-height: 850px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
}
.title-prepod {
    font-size: 48px;
    font-family: JetBrainsMono;
    font-weight: 200;
    margin-left: 128px;
    margin-top: 18px;
    width: 650px;
}
.title-prepod-wrapper {
    width: 650px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.line-dashed {
    position: relative;
    top: -38px;
    left: 66px;
    font-size: 48px;
    font-weight: 500;
    letter-spacing: 8px;
    user-select: none;
}
.content-prepod-wrapper {
    width: 100%;
}
</style>
