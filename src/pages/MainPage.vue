<script setup>
import Kafedra from '../components/MainPageComponents/Kafedra.vue';
import News from '../components/MainPageComponents/News.vue';
import Tabs from '../components/Tabs.vue';
import PrepodavateliKafedri from '../components/MainPageComponents/TeachingStaff.vue';
import KafedraCifri from '../components/MainPageComponents/KafedraCifri.vue';
import PhotoGallery from '../components/MainPageComponents/PhotoGallery.vue';
import Footer from '../components/Footer.vue';
import Terminal from '../components/Terminal.vue';
import config from '../config';
import { useFetch } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { computed, ref, onUnmounted, onMounted, watch } from 'vue';

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

const photo_images = ref(null);

let photo_galleries = ref(null);

let array = ref(Array);

//массив для новостей
let news = ref([]);
const currentNewsIndex = ref(0);

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

            break;

        case 'novosti':
            tabsTitle.value = 'главные_новости.css';
            tabsIcon.value = 'css.svg';
            updateRoute('#news');

            break;

        //пустой блок, но присутствует
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

const preloadImage = (imageUrl) => {
    if (!imageUrl) return;
    const img = new Image();

    img.src = imageUrl;
};

const nextNews = () => {
    currentNewsIndex.value = (currentNewsIndex.value + 1) % news.value.length;
    preloadNextPrevImages();
};

const prevNews = () => {
    currentNewsIndex.value =
        currentNewsIndex.value === 0 ? news.value.length - 1 : currentNewsIndex.value - 1;
    preloadNextPrevImages();
};

const preloadNextPrevImages = () => {
    console.log('Предзагрузка изображений. Текущий индекс:', currentNewsIndex.value);

    // Логика предзагрузки изображений
    const nextIndex = (currentNewsIndex.value + 1) % news.value.length;
    const prevIndex =
        currentNewsIndex.value === 0 ? news.value.length - 1 : currentNewsIndex.value - 1;

    const nextImage = news.value[nextIndex]?.images?.[0]?.filename;
    const prevImage = news.value[prevIndex]?.images?.[0]?.filename;

    if (nextImage)
        preloadImage(`${photoUrl.value}fileName=${nextImage}&imageType=NewsImage`);
    if (prevImage)
        preloadImage(`${photoUrl.value}fileName=${prevImage}&imageType=NewsImage`);
};

watch(currentNewsIndex, preloadNextPrevImages);

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

const galleryIsLoading = ref(false);
const galleryIsLoaded = ref(false);
const fetchGallery = async () => {
    galleryIsLoading.value = true; // Начало загрузки
    galleryIsLoaded.value = false;

    try {
        const { statusCode, data } = await useFetch(
            photo_url.value +
                new URLSearchParams({ pageSize: 10, pageNumber: 0 }).toString(),
        ).json();

        if (statusCode.value == 200) {
            photo_galleries.value = data.value.data;
            photo_images.value = data.filename;
            galleryIsLoaded.value = true;
        } else {
            //console.log('statusCode.value = ' + statusCode.value);
            galleryIsLoaded.value = false;
        }
    } catch (error) {
        console.log(error);
        galleryIsLoaded.value = false;
    } finally {
        galleryIsLoading.value = false;
    }
};

const newsAreLoading = ref(false);
const newsAreLoaded = ref(false);
const fetchNews = async () => {
    newsAreLoading.value = true; // Начало загрузки
    newsAreLoaded.value = false;

    try {
        const { statusCode, data } = await useFetch(
            url.value +
                new URLSearchParams({
                    pageSize: 10,
                    pageNumber: 0,
                    cover: true,
                }).toString(),
        ).json();

        if (statusCode.value == 200) {
            news.value = data.value.data;
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
    preloadNextPrevImages();
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
    preloadNextPrevImages();
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
            <News
                v-if="news && news.length > 1 && currentNewsIndex !== null"
                :id="currentNews.id || null"
                :are-loaded="newsAreLoaded"
                :are-loading="newsAreLoading"
                :headline="currentNews.headline || ''"
                :category="currentNews.category || ''"
                :date="currentNews.date || ''"
                :url="currentNews.images || []"
                @next="nextNews"
                @prev="prevNews"
            />
            <News v-else :are-loaded="newsAreLoaded" :are-loading="newsAreLoading" />
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
                :is-loaded="galleryIsLoaded"
                :is-loading="galleryIsLoading"
                :id_photo="Number(currentPhotoGallery) || null"
                :photo="currentPhotoGallery || []"
                @prev_photo="prevPhotoGallery"
                @next_photo="nextPhotoGallery"
            />
            <PhotoGallery
                v-else
                :is-loaded="galleryIsLoaded"
                :is-loading="galleryIsLoading"
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
