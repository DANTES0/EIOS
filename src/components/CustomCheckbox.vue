<template>
    <input type="checkbox" v-model="model" :value="value" />
    <span>{{ label }}</span>
</template>

<script setup>
    import { computed} from "vue";

    const props = defineProps({
        modelValue: { type: [Array, Boolean] },
        value: { type: [Boolean, Object] },
        label: { type: String },
    });

    const emit = defineEmits(["update:modelValue"]);

    const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
    });
</script>

<style>
    span {
        margin-left: 10px;
        user-select: none;
    }
    input[type="checkbox"] {
        /* accent-color:  transparent; */
        outline: 1px solid rgb(128, 128, 128);
        /* background: transparent; */
        /* background: rgba(40,40,40,0.2); */
        background: rgba(196, 196, 196, 0);
        border: none;
        /* accent-color: red; */
        /* outline: 3px solid; */
    }
    input[type=checkbox]:checked{
        /* background: rgba(40,40,40,0.2); */
        background: rgba(196, 196, 196, 0);
        content: "\2713";
        text-shadow: 1px 1px 1px rgba(0, 0, 0, .2);
        font-size: 12px;
        color: #fff;
        text-align: center;
        line-height: 12px;
    }

    input[type="checkbox"]:before {
        position: relative;
        display: block;
        width: 11px;
        height: 11px;
        border: 1px solid #808080;
        content: "";
        /* background: transparent; */
        background: rgba(196, 196, 196, 0);
    }
    input[type="checkbox"]:after {
        position: relative;
        display: block;
        left: 2px;
        top: -11px;
        width: 7px;
        height: 7px;
        border-width: 1px;
        border-style: solid;
        border-color: #B3B3B3 #dcddde #dcddde #B3B3B3;
        content: "";
        /* background-image: linear-gradient(135deg, #B1B6BE 0%, #FFF 100%); */
        /* background-repeat: no-repeat; */
        background-position: center;
    }
    input[type="checkbox"]:checked:after {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAQAAABuW59YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAB2SURBVHjaAGkAlv8A3QDyAP0A/QD+Dam3W+kCAAD8APYAAgTVZaZCGwwA5wr0AvcA+Dh+7UX/x24AqK3Wg/8nt6w4/5q71wAAVP9g/7rTXf9n/+9N+AAAtpJa/zf/S//DhP8H/wAA4gzWj2P4lsf0JP0A/wADAHB0Ngka6UmKAAAAAElFTkSuQmCC'), linear-gradient(135deg, #B1B6BE 0%, #FFF 100%);
    }

    input[type="checkbox"]:disabled:after {
        filter: opacity(0.4);
    }

    input[type="checkbox"]:not(:disabled):checked:hover:after {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAQAAABuW59YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAB2SURBVHjaAGkAlv8A3QDyAP0A/QD+Dam3W+kCAAD8APYAAgTVZaZCGwwA5wr0AvcA+Dh+7UX/x24AqK3Wg/8nt6w4/5q71wAAVP9g/7rTXf9n/+9N+AAAtpJa/zf/S//DhP8H/wAA4gzWj2P4lsf0JP0A/wADAHB0Ngka6UmKAAAAAElFTkSuQmCC'), linear-gradient(135deg, #8BB0C2 0%, #FFF 100%);
    }

    input[type="checkbox"]:not(:disabled):hover:after {
        /* background-image: linear-gradient(135deg, #8BB0C2 0%, #FFF 100%); */
        border-color: #85A9BB #92C2DA #92C2DA #85A9BB;
    }

    input[type="checkbox"]:not(:disabled):hover:before {
        border-color: #3D7591;
    }
</style>