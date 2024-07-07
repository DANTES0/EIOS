<template>
    <div>
        <div class="pagination-row">
            <button class="pagination-button">
                <img
                    src="/src/assets/pagination/double_arrow_left.svg"
                    alt=""
                />
            </button>

            <button class="pagination-button">
                <img src="/src/assets/pagination/arrow_left.svg" alt="" />
            </button>

            <img
                class="bracket"
                src="/src/assets/pagination/bracket_left.svg"
                alt=""
            />

            <div class="buttons-container">
                <span
                    v-for="(item, index) in 10"
                    :key="index"
                    class="button-wrapper"
                >
                    <div v-if="activeIndex === index" class="triangle"></div>
                    <button
                        class="pagination-button"
                        @click="activeIndex = index"
                    >
                        {{ index }}
                    </button>
                </span>
            </div>

            <img src="/src/assets/pagination/bracket_right.svg" alt="" />

            <button class="pagination-button">
                <img src="/src/assets/pagination/arrow_right.svg" alt="" />
            </button>

            <button class="pagination-button">
                <img
                    src="/src/assets/pagination/double_arrow_right.svg"
                    alt=""
                />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const activeIndex = ref(0);
</script>

<style>
.pagination-row {
    display: flex;
    align-items: center;
    position: relative;
}

.pagination-button {
    display: flex;
    justify-content: center;
    padding: 8px;
    margin: 2px;
    border-radius: 3px;
    font-size: 1em;
    cursor: pointer;
    position: relative;
    z-index: 1;
}

.bracket {
}

.triangle {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
    width: 0;
    height: 0;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-bottom: 22px solid #1e66f5;
    transition: all 0.3s ease-in-out;
}

.buttons-container {
    position: relative;
}

.button-wrapper {
    position: relative;
    display: inline-block;
}
</style>
