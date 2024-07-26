<script setup>
defineProps({
    img: { type: String, default: '../../assets/default.png' },
    title: { type: String, default: 'Мажайцев Е.А.' },
});
</script>

<template>
    <div
        class="h-[430px] w-[338px] relative cursor-pointer hover:scale-105 transition-all"
    >
        <img
            class="w-[200px] h-[200px] rounded-full border border-white relative top-0 z-10 mx-auto bg-no-repeat object-cover object-top"
            src="../../assets/default.png"
        />
        <div
            class="absolute bottom-0 h-[384px] w-[338px] bg-[#181818] border border-[#CCCCCC] rounded-[24px] flex flex-col items-center font-[JetBrainsMono]"
        >
            <h1 class="text-white text-[28px] mt-[55%]">Мажайцев Е.А</h1>
            <ul class="text-white mt-[46px]" type="i">
                <li>Преподаватель</li>
                <li>Доцент технических наук</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
ul {
    list-style-type: '-  ';
}
li::marker {
    color: #006aff;
}
li {
    margin-bottom: 15px;
}
</style>
