<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import Inputmask from 'inputmask';

const selectedItem = ref(null);
const showDropdown = ref(false);
const placeholderText = ref('Поиск...');
const typeSearch = ref('');
const isRotated = ref(false);

const dropdownRef = ref(null);
const input = ref(null);

const props = defineProps({
    modelValue: { type: String, default: '', require: true },
    placeholder: { type: String, default: 'Поиск...' },
    mask: { type: String, default: '' },
    typeInput: { type: String, default: '', require: true },
    styleInput: { type: String, default: 'modern' },
    items: { type: Array, default: () => [] },
    items2: { type: Array, default: () => [] },
});

const searchText = ref(props.modelValue);
const itemsType = ref([
    { id: 1, name: 'Преподаватели' },
    { id: 2, name: 'Группы' },
]);

const filteredItems = computed(() => {
    // Если выбран пункт "Группы", фильтруем группы
    if (typeSearch.value === 'Группы') {
        return props.items.filter((item) =>
            item.name.toLowerCase().includes(searchText.value.toLowerCase()),
        );
    }

    return [];
});

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
        const allItems = [...props.items, ...props.items2];

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
    selectedItem.value = item;
    searchText.value = item.name;
    emit('update:modelValue', JSON.parse(JSON.stringify(item)));
    showDropdown.value = false;
    isRotated.value = false;

    if (typeSearch.value === '') {
        typeSearch.value = item.name.includes('Преподаватели')
            ? 'Преподаватели'
            : 'Группы';
    }

    placeholderText.value = item.name;

    // Добавляем класс для изменения цвета текста
    inputClass.value = 'selected-text';
};

const handleFocus = () => {
    showDropdown.value = true;
    isRotated.value = true;
};

const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        showDropdown.value = false;
        isRotated.value = false;
    }
};

const goBack = () => {
    typeSearch.value = '';
    placeholderText.value = 'Поиск...';
};

watch(
    () => props.modelValue,
    (newValue) => {
        if (newValue && typeof newValue === 'object') {
            searchText.value = newValue.name || '';
        } else {
            searchText.value = '';
        }
    },
    { immediate: true },
);

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
            class="w-full bg-[#181818] border border-[#cccccc] outline-none font-light p-1 rounded focus:border-[#1E66F5]"
            :placeholder="placeholderText"
            :class="inputClass"
            autocomplete="off"
            @focus="handleFocus"
        />

        <div
            v-if="placeholderText !== 'Поиск...'"
            class="absolute top-[5.5px] right-0 mr-[12px] cursor-pointer hover:text-[#1E66F5]"
            @click="
                () => {
                    searchText = '';
                    placeholderText = 'Поиск...';
                    typeSearch = '';
                }
            "
        >
            X
        </div>
        <div
            v-if="showDropdown"
            class="absolute z-10 w-full bg-[#181818] border border-[#1E66F5] mt-1 rounded"
        >
            <ul v-if="typeSearch === '' && !searchText.trim()">
                <li
                    v-for="item in itemsType"
                    :key="item.id"
                    class="p-1 hover:bg-[#333333] cursor-pointer"
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
                    class="p-1 hover:bg-[#333333] cursor-pointer"
                    @click="
                        () => {
                            if (props.items2.includes(item)) {
                                placeholderText = 'Преподаватели';
                                typeSearch = 'Преподаватели';
                            } else if (props.items.includes(item)) {
                                placeholderText = 'Группы';
                                typeSearch = 'Группы';
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
                    class="p-1 text-blue-400 cursor-pointer hover:underline"
                    @click="goBack"
                >
                    Вернуться назад
                </li>
                <li
                    v-for="item in filteredItems2"
                    :key="item.id"
                    class="p-1 hover:bg-[#333333] cursor-pointer"
                    @click="selectItem(item)"
                >
                    {{ item.name }}
                </li>
            </ul>

            <ul v-if="filteredItems.length && typeSearch === 'Группы'">
                <li
                    class="p-1 text-blue-400 cursor-pointer hover:underline"
                    @click="goBack"
                >
                    Вернуться назад
                </li>
                <li
                    v-for="item in filteredItems"
                    :key="item.id"
                    class="p-1 hover:bg-[#333333] cursor-pointer"
                    @click="selectItem(item)"
                >
                    {{ item.name }}
                </li>
            </ul>

            <div
                v-if="
                    !filteredItems2.length &&
                    !filteredTypes.length &&
                    !filteredItems.length
                "
                class="p-1 text-gray-400"
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
input::placeholder {
    color: #fbfbfe;
}
</style>
