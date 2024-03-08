<script setup>
import WelomTitle from '../components/WelomTitle.vue';
import DepartamentInNumbers from '../components/DepartamentInNumbers.vue';
import BriefNews from '../components/BriefNews.vue';
</script>

<template>
    <div class="Main-page">
        <div class="container">
            <WelomTitle></WelomTitle>
            <DepartamentInNumbers></DepartamentInNumbers>
            <BriefNews></BriefNews>
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
</style>