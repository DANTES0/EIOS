<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import Inputmask from 'inputmask';
import eventBus from '../../eventBus.js';

const selectedItem = ref(null);
const showDropdown = ref(false);
const placeholderText = ref('Поиск...');
const typeSearch = ref('Преподаватели');
const isRotated = ref(false);

const dropdownRef = ref(null);
const input = ref(null);

const props = defineProps({
    modelValue: { type: String, default: '', require: true },
    placeholder: { type: String, default: 'Поиск...' },
    mask: { type: String, default: '' },
    typeInput: { type: String, default: '', require: true },
    styleInput: { type: String, default: 'modern' },
    items2: { type: Array, default: () => [] },
});

const searchText = ref(props.modelValue);
const itemsType = ref([{ id: 1, name: 'Преподаватели' }]);

const filteredItems2 = computed(() => {
    // Если выбран пункт "Преподаватели", фильтруем преподавателей
    if (typeSearch.value === 'Преподаватели') {
        return props.items2.filter((item) =>
            item.name.toLowerCase().includes(searchText.value.toLowerCase()),
        );
    }

    return [];
});

const filteredTypes = computed(() => {
    if (typeSearch.value === '') {
        // Если текст поиска пустой, показываем категории "Преподаватели" и "Группы"
        if (!searchText.value.trim()) {
            return itemsType.value;
        }

        // Если есть ввод текста, объединяем списки для поиска
        const allItems = [...props.items2];

        return allItems.filter((item) =>
            item.name.toLowerCase().includes(searchText.value.toLowerCase()),
        );
    }

    // Если выбрана категория, возвращаем пункты меню, соответствующие вводу
    return itemsType.value.filter((item) =>
        item.name.toLowerCase().includes(searchText.value.toLowerCase()),
    );
});

const emit = defineEmits(['update:modelValue']);
const inputClass = ref('');
const selectItem = (item) => {
    console.log('SELECTED2', selectedItem.value);

    if (selectedItem.value && selectedItem.value.id === item.id) {
        showDropdown.value = false;
        isRotated.value = false;
        inputClass.value = 'custom-placeholder';

        // Обновляем placeholderText даже если элемент не изменился
        placeholderText.value = item.name;

        return;
    }

    selectedItem.value = item;
    searchText.value = item.name;
    emit('update:modelValue', JSON.parse(JSON.stringify(item)));
    showDropdown.value = false;
    isRotated.value = false;

    // Обновляем placeholderText
    placeholderText.value = item.name;

    if (typeSearch.value === '') {
        typeSearch.value = item.name.includes('Преподаватели');
    }

    inputClass.value = 'custom-placeholder';
};

eventBus.on('optionSelectedClick', (value) => {
    console.log('SELECTED', value);

    const [id, type, name] = value; // Распаковываем массив значений

    selectItem({ id, type, name }); // Вызываем метод selectItem с объектом

    if (type === 'teacher') {
        typeSearch.value = 'Преподаватели';
    }
});

const handleClearButton = () => {
    searchText.value = '';
    placeholderText.value = 'Поиск...';
    typeSearch.value = '';
    inputClass.value = '';
};

const handleFocus = () => {
    showDropdown.value = true;
    isRotated.value = true;
    inputClass.value = '';
};

const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        showDropdown.value = false;
        isRotated.value = false;

        if (
            placeholderText.value !== 'Поиск...' &&
            placeholderText.value !== 'Преподаватели'
        )
            inputClass.value = 'custom-placeholder';
    }
};

const goBack = () => {
    // Если уже выбран элемент, не очищаем плейсхолдер
    if (selectedItem.value) {
        placeholderText.value = selectedItem.value.name;
    } else {
        placeholderText.value = 'Поиск...';
    }

    typeSearch.value = '';
};

watch(
    () => props.modelValue,
    (newValue) => {
        if (newValue && typeof newValue === 'object') {
            searchText.value = newValue.name || '';
            // eventBus.emit('searchPrepod', newValue.fullName);
        } else {
            searchText.value = '';
        }
    },
    { immediate: true },
);

watch(searchText, (newValue) => {
    eventBus.emit('searchPrepod', newValue); // Отправляем событие при изменении текста
});

onMounted(() => {
    document.addEventListener('click', handleClickOutside, true); // Используем "capture" фазу.

    if (props.mask) {
        Inputmask({
            mask: props.mask,
            placeholder: '_',
            showMaskOnHover: false,
            showMaskOnFocus: true,
        }).mask(input.value);
    }
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside, true);
});
</script>

<template>
    <div v-if="typeInput === 'stairsInput'" ref="dropdownRef" class="relative w-full">
        <input
            v-model="searchText"
            class="w-full bg-white dark:bg-[#181818] border border-[#cccccc] outline-none font-light p-1 focus:border-[#1E66F5] placeholder:text-[#0c2340] dark:placeholder:text-gray-300"
            :placeholder="placeholderText"
            :class="inputClass"
            autocomplete="off"
            @focus="handleFocus"
        />

        <div
            v-if="placeholderText !== 'Поиск...'"
            class="absolute top-[5.5px] right-0 mr-[12px] cursor-pointer hover:text-[#1E66F5]"
            @click="handleClearButton"
        >
            X
        </div>
        <div
            v-if="showDropdown"
            class="absolute z-10 w-full bg-white dark:bg-[#181818] border border-[#1E66F5] mt-1"
        >
            <ul v-if="typeSearch === '' && !searchText.trim()">
                <li
                    v-for="item in itemsType"
                    :key="item.id"
                    class="p-1 hover:bg-gray-400 hover:dark:bg-[#333333] cursor-pointer"
                    @click="
                        () => {
                            placeholderText = item.name;
                            typeSearch = item.name;
                        }
                    "
                >
                    {{ item.name }}
                </li>
            </ul>

            <!-- Объединённый список при вводе текста -->
            <ul v-if="typeSearch === '' && searchText.trim()">
                <li
                    v-for="item in filteredTypes"
                    :key="item.id"
                    class="p-1 hover:bg-gray-400 hover:dark:bg-[#333333] text-[#0c2340] dark:text-white cursor-pointer"
                    @click="
                        () => {
                            if (props.items2.includes(item)) {
                                placeholderText = 'Преподаватели';
                                typeSearch = 'Преподаватели';
                            }
                            selectItem(item);
                        }
                    "
                >
                    {{ item.name }}
                </li>
            </ul>

            <ul
                v-if="filteredItems2.length && typeSearch === 'Преподаватели'"
                class="overflow-y-auto max-h-[200px]"
            >
                <li
                    v-for="item in filteredItems2"
                    :key="item.id"
                    class="p-1 hover:bg-gray-400 hover:dark:bg-[#333333] text-[#0c2340] dark:text-white cursor-pointer"
                    @click="selectItem(item)"
                >
                    {{ item.name }}
                </li>
            </ul>

            <div
                v-if="
                    !filteredItems2.length &&
                    !filteredTypes.length
                "
                class="p-1 text-[#0c2340] dark:text-gray-400"
            >
                Ничего не найдено
            </div>
        </div>
    </div>
</template>

<style scoped>
.rotate-180 {
    transform: rotate(90deg);
    transition: transform 0.3s ease;
}
.rotate-90 {
    transform: rotate(0);
    transition: transform 0.3s ease;
}
/* .selected-text {
    color: #1e66f5 !important;
} */
/*input.custom-placeholder::placeholder {
    color: #fbfbfe;
}*/
div {
    font-family: Nunito;
}
input {
    border-color: rgb(128, 128, 128);
}
</style>
