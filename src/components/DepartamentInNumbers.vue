<script setup>

</script>

<template>
    <div class="wrapper-numbers">
        <h1 class="title-numbers">Кафедра в цифрах</h1>
        <div class="content-block-wrapper">
            <div class="content-block">
                <h2 class="title-content-block">1000+</h2>
                <h3 class="text-conent-block">студентов</h3>
            </div>
            <div class="content-block">
                <h2 class="title-content-block">110+</h2>
                <h3 class="text-conent-block">бюджетных мест</h3>
            </div>
            <div class="content-block" style="margin-right: 0;">
                <h2 class="title-content-block">43+</h2>
                <h3 class="text-conent-block">преподавателя</h3>
            </div>
        </div>
    </div>
</template>

<style>
.title-numbers {
    font-family: Jost;
    font-size: 67px;
    font-weight: 700;
    text-shadow: 0px 8px #000000;
}
.wrapper-numbers {
    width: 100%;
    max-width: 1390px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 200px;
    flex-direction: column;
}
.content-block-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 52px;
}
.content-block {
    width: 386px;
    height: 272px;
    border: 2px solid #324563;
    margin-right: 116px;
}
.title-content-block {
    font-size: 64px;
    color: white;
    font-weight: 500;
    margin-top: 26px;
    margin-left: 21px;
}
.text-conent-block {
    font-size: 48px;
    color: #A8A8A8;
    font-weight: 400;
    margin-left: 21px;
}
</style>