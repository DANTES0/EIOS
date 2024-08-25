<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import Inputmask from 'inputmask';
import IconDownArrow from '../Icons/Icon/IconDownArrow.vue';
import IconBase from '../Icons/IconBase.vue';

const selectedItem = ref(null);
const showDropdown = ref(false);
const placeholderText = ref('Поиск...');
const typeSearch = ref('');
const isRotated = ref(false);

const dropdownRef = ref(null);
const input = ref(null);

//types: 'default, selectedInput', 'stairsInput'
const props = defineProps({
    modelValue: { type: String, default: '', require: true },
    placeholder: { type: String, default: 'Поиск...' },
    mask: { type: String, default: '' },
    typeInput: {
        type: String,
        default: '',
        require: true,
    },
    styleInput: {
        type: String,
        default: 'modern',
    },
    options: {
        type: Array,
        default() {
            return [];
        },
    },
    items: {
        type: Array,
        default() {
            return [];
        },
    },
    items2: {
        type: Array,
        default() {
            return [];
        },
    },
});
const searchText = ref(props.modelValue);
const itemsType = ref([
    { id: 1, name: 'Преподаватели' },
    { id: 2, name: 'Группы' },
]);

const filteredItems = computed(() => {
    return props.items.filter((item) =>
        item.name.toLowerCase().includes(searchText.value.toLowerCase()),
    );
});

const filteredItems2 = computed(() => {
    return props.items2.filter((item) =>
        item.name.toLowerCase().includes(searchText.value.toLowerCase()),
    );
});

const filteredTypes = computed(() => {
    return itemsType.value.filter((item) =>
        item.name.toLowerCase().includes(searchText.value.toLowerCase()),
    );
});

const emit = defineEmits(['update:modelValue']);
const selectItem = (item) => {
    // selectedItem.value = item;
    emit('update:modelValue', item);
    searchText.value = item.name;
    showDropdown.value = false;
};

const handleFocus = () => {
    showDropdown.value = true;
    isRotated.value = true;
};

const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        showDropdown.value = false;
        isRotated.value = false;
        // typeSearch.value = '';
    }
};

watch(
    () => props.modelValue,
    (newValue) => {
        searchText.value = newValue;
    },
);
watch(searchText, (value) => {
    if (props.typeInput === 'default') {
        emit('update:modelValue', value);
    }
});

// watch(selectItem.value)
onMounted(() => {
    document.addEventListener('click', handleClickOutside);

    if (props.mask) {
        Inputmask({
            mask: props.mask,
            placeholder: '_',
            showMaskOnHover: false,
            showMaskOnFocus: true,
        }).mask(input.value);
        // input.value.mask('+7 (999) 999 99 99');
    }
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <div
        v-if="typeInput === 'selectedInput'"
        ref="dropdownRef"
        class="relative w-[200px] font-light font-[JetBrainsMono]"
    >
        <input
            v-model="searchText"
            class="w-full bg-[#181818] border border-[#cccccc] outline-none font-light font-[JetBrainsMono] p-1 rounded"
            :placeholder="'Поиск...'"
            @focus="handleFocus"
        />

        <div
            v-if="showDropdown"
            class="absolute z-10 w-full bg-[#181818] border border-[#cccccc] mt-1 rounded"
        >
            <ul v-if="filteredItems.length">
                <li
                    v-for="item in filteredItems"
                    :key="item.id"
                    class="p-1 hover:bg-[#333333] cursor-pointer"
                    @click="selectItem(item)"
                >
                    {{ item.name }}
                </li>
            </ul>
            <div v-else class="p-1 text-gray-400 font-light">Ничего не найдено</div>
        </div>
    </div>
    <div
        v-if="typeInput === 'stairsInput'"
        ref="dropdownRef"
        class="relative w-full font-light font-[JetBrainsMono]"
    >
        <input
            v-model="searchText"
            class="w-full bg-[#181818] border border-[#cccccc] outline-none font-light font-[JetBrainsMono] p-1 rounded focus:border-[#1E66F5]"
            :placeholder="placeholderText"
            @focus="handleFocus"
        />
        <div
            v-if="placeholderText === 'Преподаватели' || placeholderText === 'Группы'"
            class="absolute top-[5.5px] right-0 mr-[12px] cursor-pointer hover:text-[#1E66F5]"
            @click="
                () => {
                    typeSearch = '';
                    placeholderText = 'Поиск...';
                    searchText = '';
                }
            "
        >
            X
        </div>

        <icon-base
            v-if="placeholderText === 'Поиск...'"
            :width="24"
            :height="24"
            class="absolute top-[5.5px] right-0 mr-[5px] cursor-pointer hover:text-[#1E66F5]"
            :class="[{ 'rotate-180': isRotated }, { 'rotate-90': !isRotated }]"
            @click="handleFocus"
            ><icon-down-arrow></icon-down-arrow
        ></icon-base>
        <div
            v-if="showDropdown"
            class="absolute z-10 w-full bg-[#181818] border border-[#1E66F5] mt-1 rounded"
        >
            <ul v-if="filteredTypes.length && typeSearch === ''">
                <li
                    v-for="item in filteredTypes"
                    :key="item.id"
                    class="p-1 hover:bg-[#333333] cursor-pointer"
                    @click="
                        () => {
                            typeSearch = item.name;
                            placeholderText = item.name;
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
                    class="p-1 hover:bg-[#333333] cursor-pointer"
                    @click="selectItem(item)"
                >
                    {{ item.name }}
                </li>
            </ul>
            <ul v-if="filteredItems.length && typeSearch === 'Группы'">
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
                class="p-1 text-gray-400 font-light"
            >
                Ничего не найдено
            </div>
            <!-- <div v-else class="p-1 text-gray-400 font-light">Ничего не найдено</div> -->
        </div>
    </div>
    <div
        v-if="typeInput === 'default'"
        ref="dropdownRef"
        class="relative w-full font-light font-[JetBrainsMono]"
    >
        <input
            ref="input"
            v-model="searchText"
            class="w-full bg-transparent outline-none font-light font-[JetBrainsMono] placeholder:text-[18px] text-[20px]"
            :class="[
                props.styleInput === 'classic'
                    ? 'border border-[#cccccc]  p-1 rounded focus:border-[#1E66F5]'
                    : props.styleInput === 'modern'
                      ? 'border-b border-[#cccccc] pl-[11px] pb-[8px]'
                      : '',
            ]"
            :placeholder="placeholder"
            @focus="handleFocus"
        />
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
</style>
