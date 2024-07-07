<script setup></script>
<template>
    <div class="tabs">
        <div class="tabs-line">
            <img
                src="../assets/anchor_header/html.svg"
                alt=""
                class="tabs-image"
            />
            <label class="tabs-title">о_кафедре.html</label>
        </div>
    </div>
</template>
<style>
.tabs {
    position: sticky;
    top: 0;
    z-index: 99;
    border-bottom: 1px solid #2b2b2b;
}
.tabs-image {
    width: 16px;
    height: 16px;
    margin-left: 7px;
}
.tabs-title {
    font-family: Rubik;
    font-size: 14px;
    font-weight: 100;
    color: #cccccc;
    margin-right: 14px;
}
.tabs-line {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 158px;
    height: 100%;
    background-color: #1f1f1f;
    border-right: 1px solid #2b2b2b;
}
</style>
