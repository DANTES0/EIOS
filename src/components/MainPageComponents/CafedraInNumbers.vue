<script setup>
import SectionTitle from './SectionTitle.vue';

const cifri = [
    {
        title: '1000+',
        description: 'студентов',
    },
    {
        title: '110+',
        description: 'бюджетных мест',
    },
    {
        title: '43+',
        description: 'преподавателей',
    },
];
</script>

<template>
    <div class="wrapper-cifri text-[#0C2340] dark:text-[#999999]">
        <div class="numbers-wrapper text-[#0C2340] dark:text-[#999999]">
            <div v-for="i in 18" :key="i" class="numbers">{{ i }}</div>
        </div>
        <div id="cifri" class="content-cifri-wrapper bg-white dark:bg-[#1f1f1f]">
            <SectionTitle title="КАФЕДРА В ЦИФРАХ" :base-length="10" />
            <div class="cifri-frame">
                <div v-for="(item, i) in cifri" :key="i" class="cifri-block">
                    <div class="image-block-cifri">
                        <h1 class="title-cifri">{{ item.title }}</h1>
                    </div>
                    <h2 class="description-cifri">{{ item.description }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.description-cifri {
    font-family: JetBrainsMono;
    font-size: 18px;
    font-weight: 500;
    width: 180px;
    height: 41px;
    text-align: center;
    margin-top: 15px;
}
.image-block-cifri h1 {
    /* margin: 0; */
    font-size: 29px;
    font-family: Ubuntu-Bold;
    margin: 0 auto;
    text-align: center;
    width: 100%;
}
.image-block-cifri {
    background-image: url('../../assets/KafedraCifri/cifri_file.svg');
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    height: 202px;
    display: flex;
    justify-content: start;
    align-items: center;
}
.cifri-block {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.content-cifri-wrapper {
    width: 100%;
}
.cifri-frame {
    width: 80%; /* Занимает 90% ширины родителя */
    min-height: 470px; /* Минимальная высота */
    background: url('../../assets/KafedraCifri/frame.png') no-repeat center / contain;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap; /* Перенос блоков при нехватке места */
    justify-content: center; /* Центрирование по горизонтали */
    align-items: center; /* Центрирование по вертикали */
    gap: 1rem; /* Отступ между блоками */
}
.line-dashed-cifri {
    position: relative;
    top: -38px;
    left: -167px;
    font-size: 48px;
    font-weight: 500;
    letter-spacing: 8px;
    user-select: none;
}
.content-cifri-prepod {
    height: 700px;
    width: 100%;
    border-top: 1px solid #1e66f5;
    border-bottom: 1px solid #1e66f5;
    margin-left: 52px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.wrapper-cifri {
    /* height: 850px; */
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    margin-top: 90px;
}
.title-cifri {
    font-size: 48px;
    font-family: JetBrainsMono;
    font-weight: 200;
    margin-left: 128px;
    margin-top: 18px;
    width: 650px;
}
.title-cifri-wrapper {
    width: 650px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

@media (max-width: 1280px) {
    .cifri-frame {
        min-height: 300px;
        gap: 0rem;
    }

    .image-block-cifri {
        width: 65%;
        height: 138px;
    }

    .image-block-cifri h1 {
        font-size: 1.2rem;
    }

    .description-cifri {
        font-size: 0.9rem;
    }
}
</style>
