<script setup>
import Kafedra from '../components/MainPageComponents/Kafedra.vue';
import News from '../components/MainPageComponents/News.vue';
import Tabs from '../components/Tabs.vue';
import PrepodavateliKafedri from '../components/MainPageComponents/PrepodavateliKafedri.vue';
import KafedraCifri from '../components/MainPageComponents/KafedraCifri.vue';
import PhotoGallery from '../components/MainPageComponents/PhotoGallery.vue';
import Footer from '../components/Footer.vue';
import Terminal from '../components/Terminal.vue';
import { useFetch } from '@vueuse/core';
import { computed, ref, onUnmounted, onMounted } from 'vue';
import config from '../config';

const url = computed(() => {
    //return `http://25.61.98.183:8080/news/1`
    return `${config.ServerURL}/api/v1/news?`;
});
const photo_url = computed(() => {
    return `${config.ServerURL}/api/v1/gallery?`;
});
const photoUrl = computed(() => {
    return `${config.ServerURL}/api/v1/image?`;
});
const extractedId = ref(null);
const text = ref(null);
const date = ref(null);
const category = ref(null);
const images = ref(null);
const photo_images = ref(null);
let photo_galleries = ref(null);
let array = ref(Array);

//массив для новостей
let news = ref([]);
const currentNewsIndex = ref(0);
const currentGalleryIndex = ref(0);

const tabsTitle = ref('о_кафедре.html');
const tabsIcon = ref('html.svg');

// Ссылки на блоки
const kafedraBlock = ref(null);
const novostiBlock = ref(null);
const prepodBlock = ref(null);
const cifriBlock = ref(null);
const photoGalleryBlock = ref(null);
const contactsBlock = ref(null);

// Настройка Intersection Observer
const observer = ref(null);

const updateTabs = (blockName) => {
    switch (blockName) {
        case 'kafedra':
            tabsTitle.value = 'о_кафедре.html';
            tabsIcon.value = 'html.svg';

            //IconHtml.vue
            break;

        case 'novosti':
            tabsTitle.value = 'главные_новости.css';
            tabsIcon.value = 'css.svg';

            break;

        case 'prepodavateli':
            tabsTitle.value = 'работники_кафедры.py';
            tabsIcon.value = 'py.svg';

            break;

        case 'cifri':
            tabsTitle.value = 'кафедра_в_цифрах.cpp';
            tabsIcon.value = 'c++.svg';

            break;

        case 'gallery':
            tabsTitle.value = 'фотогалерея.js';
            tabsIcon.value = 'js.svg';

            break;

        case 'contacts':
            tabsTitle.value = 'контакты.ts';
            tabsIcon.value = 'ts.svg';

            break;
    }
};

const handleIntersect = (entries) => {
    entries.forEach((entry) => {
        console.log(entry.target.dataset.blockName); // Добавьте лог для диагностики

        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            updateTabs(entry.target.dataset.blockName);
        }
    });
};

const nextPhotoGallery = () => {
    currentGalleryIndex.value =
        (currentGalleryIndex.value + 1) % photo_galleries.value.length;
    // console.log(currentGalleryIndex.value)
};

const prevPhotoGallery = () => {
    if (currentGalleryIndex.value == 0) {
        currentGalleryIndex.value = photo_galleries.value.length - 1;
    } else {
        currentGalleryIndex.value = Math.abs(
            (currentGalleryIndex.value - 1) % photo_galleries.value.length,
        );
    }
    // console.log(currentGalleryIndex.value)
};

const nextNews = () => {
    currentNewsIndex.value = (currentNewsIndex.value + 1) % news.value.length;
    // console.log(currentNewsIndex.value)
};

const prevNews = () => {
    if (currentNewsIndex.value == 0) {
        currentNewsIndex.value = news.value.length - 1;
    } else {
        currentNewsIndex.value = Math.abs(
            (currentNewsIndex.value - 1) % news.value.length,
        );
    }

    // console.log(currentNewsIndex.value);
};

const currentNews = computed(() =>
    // news.value = news.value[currentNewsIndex.value]
    news.value ? news.value[currentNewsIndex.value] : null,
);

const currentPhotoGallery = computed(() => {
    for (let i = 0; i < photo_galleries.value.length; i++) {
        // array[i] = updateGallery(photo_galleries.value[i].filename);
        array[i] =
            `${photoUrl.value}fileName=${photo_galleries.value[i].filename}&imageType=GalleryImage`;
    }

    return array;
});

const fetchGallery = async () => {
    const response_gallery = await useFetch(
        photo_url.value + new URLSearchParams({ pageSize: 10, pageNumber: 0 }).toString(),
    ).json();

    photo_galleries.value = response_gallery.data.value.data;

    photo_images.value = response_gallery.data.filename;
    console.log(response_gallery.data.value.data);
};

// const updateGallery = async () => {
//     const responsePhoto = await useFetch(
//         photoUrl.value +
//             new URLSearchParams({
//                 fileName: 'bear.jpg',
//                 imageType: 'GalleryImage',
//             }).toString(),
//     );

//     console.log(responsePhoto.data.value);

//     return responsePhoto.data.value;
// };

const aboba = async () => {
    const response = await useFetch(
        url.value + new URLSearchParams({ pageSize: 10, pageNumber: 0 }).toString(),
    ).json();
    // const response = await data.json();a

    // console.log(response.data.value.data);
    //если url - новость по индексу
    extractedId.value = response.data.value.data.id;
    text.value = response.data.value.data.headLine;

    news.value = response.data.value.data;
    images.value = response.data.value.data.images;
};

onMounted(() => {
    // Установите начальное значение для вкладок, соответствующее первому блоку
    updateTabs('kafedra');

    aboba();
    fetchGallery();

    observer.value = new IntersectionObserver(handleIntersect, { threshold: 0.5 });

    // Наблюдение за блоками
    if (novostiBlock.value) observer.value.observe(novostiBlock.value);
    if (kafedraBlock.value) observer.value.observe(kafedraBlock.value);
    if (prepodBlock.value) observer.value.observe(prepodBlock.value);
    if (cifriBlock.value) observer.value.observe(cifriBlock.value);
    if (photoGalleryBlock.value) observer.value.observe(photoGalleryBlock.value);
    if (contactsBlock.value) observer.value.observe(contactsBlock.value);
});

onUnmounted(() => {
    if (observer.value) observer.value.disconnect();
});

//console.log(text)
</script>

<template>
    <div class="Main-page">
        <Tabs :title="tabsTitle" :show-icon="true" :icon-filename="tabsIcon" />
        <div ref="kafedraBlock" data-block-name="kafedra">
            <Kafedra />
        </div>
        <div v-html="a"></div>
        <div ref="novostiBlock" data-block-name="novosti">
            <News
                v-if="news && news.length > 1 && currentNewsIndex !== null"
                :id="currentNews.id"
                :headline="currentNews.headline"
                :category="currentNews.category"
                :date="currentNews.date"
                :url="currentNews.images"
                @next="nextNews"
                @prev="prevNews"
            />
        </div>
        <div ref="prepodBlock" data-block-name="prepodavateli">
            <PrepodavateliKafedri />
        </div>
        <div ref="cifriBlock" data-block-name="cifri">
            <KafedraCifri />
        </div>
        <div ref="photoGalleryBlock" data-block-name="gallery">
            <PhotoGallery
                v-if="
                    photo_galleries &&
                    photo_galleries.length > 1 &&
                    currentGalleryIndex !== null
                "
                :id_photo="currentPhotoGallery"
                :photo="currentPhotoGallery"
                @prev_photo="prevPhotoGallery"
                @next_photo="nextPhotoGallery"
            />
        </div>
        <Footer />
        <Terminal />
        <div ref="contactsBlock" data-block-name="contacts" class="clp-cont"></div>
    </div>
</template>

<style scoped>
.container {
    margin-top: 71px;
    max-width: 1390px;
    margin: 0 auto;
    font-family: Jost;
    color: #408afa;
}
.clp {
    width: 700px;
    height: 700px;
    /* margin: 0 auto; */
}
.clp-cont {
    width: 100%;
    height: 100%;
    display: flex;
    /* justify-content: center; */
    align-items: center;
}
.Main-page {
    height: 100%;
    position: relative;
}
</style>
