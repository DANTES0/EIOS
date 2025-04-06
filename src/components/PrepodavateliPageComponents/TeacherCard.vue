<script setup>
defineProps({
    photo: { type: String, default: '../../assets/default.png' },
    name: { type: String, default: 'Мажайцев Е.А.' },
    rank: { type: String, default: '' },
    post: { type: String, default: 'Преподаватель' },
});
</script>

<template>
    <div
        class="h-[430px] w-[338px] relative cursor-pointer hover:scale-105 transition-all"
    >
        <img
            class="max-w-[200px] max-h-[200px] w-[100%] h-[100%] rounded-full relative top-0 z-10 mx-auto object-cover object-top"
            :src="photo"
            style="background: #181818 no-repeat center/cover"
        />
        <div
            class="absolute bottom-0 h-[384px] w-[338px] bg-white dark:bg-[#181818] border-[3px] border-[#1E66F5] rounded-[24px] flex flex-col items-center font-[JetBrainsMono]"
        >
            <h1
                class="text-[#0C2340] dark:text-white text-[28px] mt-[55%] text-center px-4"
            >
                {{ name }}
            </h1>
            <ul
                class="text-[#0C2340] dark:text-white mt-[46px] font-thin text-center px-4 break-words whitespace-normal"
                type="i"
            >
                <li v-if="post">{{ post }}</li>
                <li v-if="rank">{{ rank }}</li>
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
