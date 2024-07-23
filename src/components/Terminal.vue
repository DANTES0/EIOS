<template>
    <div class="terminal-tabs">
        <div class="termainal-tabs-wrapper">
            <div class="title-terminal">ТЕРМИНАЛ</div>
            <div class="arrow-terminal-up" />
        </div>
    </div>
</template>

<style scoped>
@font-face {
    font-family: JetBrainsMono;
    src: url('../assets/JetBrainsMono.ttf');
}
.termainal-tabs-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.arrow-terminal-up {
    background-image: url('../assets/Upper.svg');
    width: 22px;
    height: 22px;
    background-repeat: no-repeat;
    background-size: contain;
    margin-right: 40px;
    cursor: pointer;
}
.arrow-terminal-up:hover {
    filter: brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(3534%)
        hue-rotate(146deg) brightness(122%) contrast(120%);
}
.title-terminal {
    width: 150px;
    font-family: JetBrainsMono;
    font-weight: 700;
    color: #9ea6b1;
    font-size: 26px;
    margin-left: 15px;
    /* margin-top: 15px; */
}
.terminal-tabs {
    width: 100%;
    height: 40px;
    border-top: 1px solid white;
    position: sticky;
    bottom: 0;
    z-index: 99;
    background-color: #181818;
}
</style>
