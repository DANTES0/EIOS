<script setup>
import { ref, shallowReactive } from 'vue';
import {
  VueFlux,
  FluxCaption,
  FluxControls,
  FluxIndex,
  FluxPagination,
  FluxPreloader,
  Img,
  Book,
  Zip,
  Slide,
} from 'vue-flux';
import 'vue-flux/style.css';

const transitions = shallowReactive([
  {
    component: Slide,
    options: shallowReactive({
      totalDuration: 1400,
      easing: 'ease-in-out',
    }),
  },
]);

const $vueFlux = ref();

const vfOptions = shallowReactive({
  autoplay: true,
});

import pivo1 from "../../assets/NewsContent/pivo1.jpg";
import pivo2 from "../../assets/NewsContent/pivo2.jpg";
import pivo3 from "../../assets/NewsContent/pivo3.jpg";


const vfRscs = shallowReactive([
      new Img(pivo1),
    new Img(pivo2),
new Img(pivo3),
]);

// const vfTransitions = shallowReactive([Book, Zip]);
</script>

<template>

  <div class="photo-slider">
    <VueFlux
        :options="vfOptions"
        :rscs="vfRscs"
        :transitions="transitions"
        ref="$vueFlux">

      <template #preloader="preloaderProps">
        <FluxPreloader v-bind="preloaderProps"/>
      </template>

      <template #caption="captionProps">
        <FluxCaption v-bind="captionProps"/>
      </template>

      <template #controls="controlsProps">
        <FluxControls v-bind="controlsProps"/>
      </template>

      <template #pagination="paginationProps">
        <FluxPagination v-bind="paginationProps"/>
      </template>

      <template #index="indexProps">
        <FluxIndex v-bind="indexProps"/>
      </template>
    </VueFlux>

  </div>

  <!--  <button @click="$vueFlux.show('next')">NEXT</button>-->
</template>

<style>

.photo-slider{
  width: 70%;
}


</style>