<script setup>
import Kafedra from '../components/MainPageComponents/Kafedra.vue';
import News from '../components/MainPageComponents/News.vue';
import Tabs from '../components/Tabs.vue';
import PrepodavateliKafedri from '../components/MainPageComponents/PrepodavateliKafedri.vue';
import KafedraCifri from '../components/MainPageComponents/KafedraCifri.vue';
import PhotoGallery from '../components/MainPageComponents/PhotoGallery.vue';
import Footer from '../components/Footer.vue';
import Terminal from '../components/Terminal.vue';
import config from '../config';
import { useFetch } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { computed, ref, onUnmounted, onMounted } from 'vue';

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

//переменные для новостей
const extractedId = ref(null);
const text = ref('');
const date = ref('');
const category = ref('');
const images = ref([]);

const photo_images = ref(null);

let photo_galleries = ref(null);
const isPhotoGalleryLoading = ref(false);
const photoGalleryError = ref(null);

let array = ref(Array);

//массив для новостей
let news = ref([]);
const currentNewsIndex = ref(0);
const newsError = ref(null);

const currentGalleryIndex = ref(0);

const router = useRouter(); // Подключаем Vue Router
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

const updateRoute = (hash) => {
    const currentRoute = router.currentRoute.value;

    if (currentRoute.hash !== hash) {
        router.push({ hash });
    }
};

const updateTabs = (blockName) => {
    switch (blockName) {
        case 'kafedra':
            tabsTitle.value = 'о_кафедре.html';
            tabsIcon.value = 'html.svg';
            updateRoute('#kafedra');

            //IconHtml.vue
            break;

        //отсутствует вообще
        case 'novosti':
            tabsTitle.value = 'главные_новости.css';
            tabsIcon.value = 'css.svg';
            updateRoute('#news');

            break;

        //отсутствует пустой блок, но присутствует
        case 'prepodavateli':
            tabsTitle.value = 'работники_кафедры.py';
            tabsIcon.value = 'py.svg';
            updateRoute('#prepod');

            break;

        case 'cifri':
            tabsTitle.value = 'кафедра_в_цифрах.cpp';
            tabsIcon.value = 'c++.svg';
            updateRoute('#cifri');

            break;

        //отсутствует вообще
        case 'gallery':
            tabsTitle.value = 'фотогалерея.js';
            tabsIcon.value = 'js.svg';
            updateRoute('#gallery');

            break;

        case 'contacts':
            tabsTitle.value = 'контакты.ts';
            tabsIcon.value = 'ts.svg';
            updateRoute('#footer');

            break;
    }
};

const handleIntersect = (entries) => {
    entries.forEach((entry) => {
        //console.log(entry.target.dataset.blockName); // Добавьте лог для диагностики

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
    // console.log(response_gallery.data.value.data);
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

const newsAreLoading = ref(false);
const newsAreLoaded = ref(false);
const fetchNews = async () => {
    newsAreLoading.value = true; // Начало загрузки
    newsAreLoaded.value = false;

    try {
        console.log('пффыводалфоджыва');

        const { statusCode, data } = await useFetch(
            url.value + new URLSearchParams({ pageSize: 10, pageNumber: 0 }).toString(),
        ).json();

        if (statusCode.value == 200) {
            extractedId.value = data.value.data.id;
            text.value = data.value.data.headLine;
            news.value = data.value.data;
            images.value = data.value.data.images;
            newsAreLoaded.value = true;
        } else {
            //console.log('statusCode.value = ' + statusCode.value);
            newsAreLoaded.value = false;
        }
    } catch (error) {
        console.log(error);
        newsAreLoaded.value = false;
    } finally {
        newsAreLoading.value = false;
    }
};

onMounted(() => {
    // Установите начальное значение для вкладок, соответствующее первому блоку
    updateTabs('kafedra');

    fetchNews();
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
</script>

<template>
    <div class="Main-page">
        <Tabs :title="tabsTitle" :show-icon="true" :icon-filename="tabsIcon" />
        <div ref="kafedraBlock" data-block-name="kafedra">
            <Kafedra />
        </div>
        <div ref="novostiBlock" data-block-name="novosti">
            <!-- <News
                v-if="news && news.length > 1 && currentNewsIndex !== null"
                :id="currentNews.id"
                :are-loaded="newsAreLoaded"
                :is-loading="newsAreLoading"
            /> -->
            <News
                v-if="news && news.length > 1 && currentNewsIndex !== null"
                :id="currentNews.id || null"
                :are-loaded="newsAreLoaded"
                :is-loading="newsAreLoading"
                :headline="currentNews.headline || ''"
                :category="currentNews.category || ''"
                :date="currentNews.date || ''"
                :url="currentNews.images || []"
                @next="nextNews"
                @prev="prevNews"
            />
            <News v-else :are-loaded="newsAreLoaded" :is-loading="newsAreLoading" />
            <!-- <News /> -->
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
