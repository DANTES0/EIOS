<script setup>
import { ref, onMounted, computed } from 'vue';
import { useFetch } from '@vueuse/core';
import config from '../../config';

let array = ref([]);

// Обработчики для изменения состояния видимости конкретного элемента
const handleMouseOver = (index) => {
    array.value[index].isVisible = true;
};

const handleMouseLeave = (index) => {
    array.value[index].isVisible = false;
};

const photo_url = computed(() => {
    return `${config.ServerURL}/gallery/get`;
});

const fetchPhoto = async () => {
    const response = await useFetch(photo_url).json();

    array.value = response.data.value.map((item) => ({
        ...item,
        isVisible: false,
    }));
    console.log(array.value);
};

const deletePhoto = async (id, index) => {
    await useFetch(`${config.ServerURL}/gallery/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).json();

    // Удаляем элемент из массива
    array.value.splice(index, 1);
};

const selectedFileName = ref('');
const selectedFile = ref(null);

const addPhoto = async (file) => {
    if (!file) return;

    const formData = new FormData();

    formData.append('file', file);

    const response = await fetch(`${config.ServerURL}/gallery/upload`, {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
        },
    });

    if (response.ok) {
        selectedFileName.value = '';
        selectedFile.value = null;
        fetchPhoto();
    } else {
        console.error('Error uploading file');
    }
};

const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
        selectedFileName.value = file.name;
        selectedFile.value = file;
        addPhoto(file); // Загрузка фото сразу после выбора
    } else {
        selectedFileName.value = '';
        selectedFile.value = null;
    }
};

onMounted(() => {
    fetchPhoto();
});
</script>

<template>
    <div class="content-wrap">
        <header class="content-header">
            <div class="line"></div>
            <h1>Фотогалерея</h1>
        </header>
        <div class="content-photo">
            <div class="content-photo-title">Фотографии которые видны</div>
            <div class="upload-section">
                <input
                    id="file-upload"
                    type="file"
                    class="file-input"
                    @change="handleFileChange"
                />
                <label for="file-upload" class="file-label">Выбрать фото</label>
                <input
                    type="text"
                    :value="selectedFileName"
                    readonly
                    class="file-name"
                    placeholder="Файл не выбран"
                />
            </div>
        </div>
        <div class="photogallery-wrap">
            <div
                v-for="(item, index) in array"
                :key="item.id"
                class="photo-div"
                @mouseover="handleMouseOver(index)"
                @mouseleave="handleMouseLeave(index)"
            >
                <img
                    :src="item.filename"
                    alt=""
                    class="photo"
                    :class="{ active: item.isVisible }"
                />
                <div v-if="item.isVisible" class="checked">
                    <div class="delete-title">Удалить?</div>
                    <div class="key">
                        <div class="yes-key" @click="deletePhoto(item.id, index)">Да</div>
                        <div class="no-key">Нет</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.add-photo {
    width: 186px;
    height: 40px;
    background-color: transparent;
    border: 1px solid #cccccc;
    font-family: JetBrainsMono;
    border-radius: 4px;
    color: #cccccc;
    font-size: 18px;
    margin-right: 130px;
    cursor: pointer;
}
.add-photo:hover {
    background-color: #222222;
    border-color: #1e66f5;
}
.add-photo:active {
    background-color: #333333;
    border-color: #1e66f5;
}
.content-photo {
    display: flex;
    align-items: center;
    font-family: JetBrainsMono;
    font-size: 24px;
    color: white;
    width: 100%;
    justify-content: space-between;
}
.content-photo-title {
    margin-left: 46px;
}
.upload-section {
    display: flex;
    align-items: center;
    margin-right: 130px;
}
.file-input {
    display: none;
}
.file-label {
    display: inline-block;
    width: 186px;
    height: 40px;
    background-color: transparent;
    border: 1px solid #cccccc;
    font-family: JetBrainsMono;
    border-radius: 4px;
    color: #cccccc;
    font-size: 18px;
    margin-right: 10px;
    cursor: pointer;
    text-align: center;
    line-height: 38px; /* to vertically center the text */
    transition: 0.3s ease;
}
.file-label:hover {
    background-color: #222222;
    border-color: #1e66f5;
}
.file-label:active {
    background-color: #333333;
    border-color: #1e66f5;
}
.file-name {
    width: 300px;
    height: 40px;
    background-color: transparent;
    border: 1px solid #cccccc;
    border-radius: 4px;
    color: #cccccc;
    font-family: JetBrainsMono;
    font-size: 18px;
    padding-left: 10px;
    outline: #1e66f5;
}
.active {
    opacity: 0.3;
}
.active {
    opacity: 0.3;
}
.key {
    display: flex;
    flex-direction: row;
    margin-top: 188px;
    margin-left: 59px;
}
.no-key {
    margin-left: 130px;
    cursor: pointer;
}
.yes-key {
    cursor: pointer;
}
.delete-title {
    margin-left: 90px;
    margin-top: 44px;
}
.checked {
    position: absolute;
    font-size: 36px;
    font-family: JetBrainsMono;
    color: white;
    cursor: default;
}
.cross {
    position: absolute;
    right: 0;
    margin-right: 12px;
    margin-top: 12px;
}
.photogallery-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
}
.photo-div {
    width: 360px;
    height: 360px;
    margin-left: 129px;
    margin-top: 56px;
    margin-bottom: 10px;
    position: relative;
}
.photo {
    width: 360px;
    height: 360px;
    position: absolute;
    object-fit: cover;
}
.content-wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
}
.content-header {
    font-family: JetBrainsMono;
    color: white;
    font-weight: 700;
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    height: 70.5px;
    border-bottom: solid 1px #2b2b2b;
    background-color: #181818;
}
.content-header h1 {
    font-size: 24px;
    margin-left: 42px;
}
.line {
    width: 1px;
    height: 100%;
    background-color: #2b2b2b;
}
</style>
