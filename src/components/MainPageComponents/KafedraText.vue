<script setup>
defineProps({
    id: Number,
    title: String,
    description: String,
});
</script>

<template>
    <div v-if="id % 2 == 0" class="kafedraText-content-wrapper">
        <div class="kafedraText-line"></div>
        <div class="kafedraText-content">
            <h1 class="kafedraText-title">{{ title }}</h1>
            <h2 class="kafedraText-description">
                {{ description }}
            </h2>
        </div>
    </div>
    <div v-if="id % 2 != 0" class="kafedraText-content-wrapper-nechet">
        <div class="kafedraText-content-nechet">
            <h1 class="kafedraText-title-nechet">{{ title }}</h1>
            <h2 class="kafedraText-description-nechet">
                {{ description }}
            </h2>
        </div>
        <div class="kafedraText-line-nechet"></div>
    </div>
</template>

<style>
@font-face {
    font-family: JetBrainsMono;
    src: url('../../assets/JetBrainsMono.ttf');
}
.kafedraText-title-nechet {
    font-size: 30px;
    color: #d9d9d9;
    text-align: right;
}
.kafedraText-description-nechet {
    margin-top: 27px;
    font-size: 24px;
    width: 880px;
    text-align: right;
}
.kafedraText-line-nechet {
    width: 3px;
    background-color: #1e66f5;
    margin-right: 60px;
}
.kafedraText-content-wrapper-nechet {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin-top: 50px;
    margin-bottom: 50px;
}
.kafedraText-content-nechet {
    color: #999999;
    font-family: JetBrainsMono;
    margin-right: 30px;
}
.kafedraText-title {
    font-size: 30px;
    color: #d9d9d9;
}
.kafedraText-description {
    margin-top: 27px;
    font-size: 24px;
    width: 880px;
}
.kafedraText-content-wrapper {
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
}
.kafedraText-line {
    width: 3px;
    background-color: #1e66f5;
    margin-left: 60px;
}
.kafedraText-content {
    color: #999999;
    font-family: JetBrainsMono;
    margin-left: 30px;
}
</style>
