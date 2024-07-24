<script setup>
import { ref } from 'vue';

const activeIndex = ref(0);
</script>

<template>
    <div class="wrapper">
        <div class="container">
            <button class="arrow">
                <img src="/src/assets/pagination/double_arrow_left.svg" alt="" />
            </button>

            <button class="arrow">
                <img src="/src/assets/pagination/arrow_left.svg" alt="" />
            </button>

            <div class="pages-container">
                <img
                    class="bracket"
                    src="/src/assets/pagination/bracket_left.svg"
                    alt=""
                />

                <div class="numbers-container">
                    <div v-for="(item, index) in 10" :key="index" class="numbers-wrapper">
                        <div v-if="activeIndex === index" class="triangle" />
                        <button @click="activeIndex = index">
                            {{ index }}
                        </button>
                    </div>
                </div>

                <img
                    class="bracket"
                    src="/src/assets/pagination/bracket_right.svg"
                    alt=""
                />
            </div>

            <button class="arrow">
                <img src="/src/assets/pagination/arrow_right.svg" alt="" />
            </button>

            <button class="arrow">
                <img src="/src/assets/pagination/double_arrow_right.svg" alt="" />
            </button>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    display: block;
    margin: 0 auto;
}
.container {
    display: flex;
    align-items: center;
    gap: 28px;
}
.arrow {
    cursor: pointer;
}
.pages-container {
    display: flex;
    align-items: center;
}
.numbers-container {
    margin: 0 12px 20px 12px;
    font-family: JetBrainsMono;
    font-size: 36px;
    color: rgb(104, 103, 103);
    display: flex;
    gap: 25px;
}
.numbers-wrapper {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center; /* Center the button vertically */
    position: relative; /* Create a positioning context for the triangle */
    padding-top: 20px; /* Add space for the triangle */
}
.numbers-wrapper button {
    width: 54px;
    position: relative; /* Ensure button is in the normal document flow */
}
.triangle {
    position: absolute; /* Position triangle absolutely */
    top: 0; /* Align the top of the triangle with the top of the numbers-wrapper */
    left: 50%; /* Center the triangle horizontally */
    transform: translateX(-50%) rotate(180deg); /* Centering and rotation */
    width: 0;
    height: 0;
    border-left: 12px solid transparent; /* правый нижний угол */
    border-right: 12px solid transparent; /* левый нижний угол */
    border-bottom: 20px solid #1e66f5;
    transition: all 0.3s ease-in-out;
}
</style>
