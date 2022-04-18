<template>
  <div class="flex justify-start flex-wrap">
    <div
      v-if="loading"
      v-for="show of loadingItems"
      :key="show.id"
      class="mb-4 basis-1/2 sm:basis-1/3 md:basis-1/5 lg:basis-1/6 p-3"
    >
      <div class="animate-pulse">
        <div class="rounded-2xl bg-slate-700 tile-placeholder mb-3"></div>
      </div>
      <div class="h-2 bg-slate-700 rounded w-20"></div>
    </div>
    <transition-group
      v-else
      appear
      @before-enter="beforeEnter"
      @enter="enter"
    >
      <div
        v-for="(show, index) of shows"
        :key="show.id"
        :data-index="index"
        class="mb-4 basis-1/2 sm:basis-1/3 md:basis-1/5 lg:basis-1/6 p-3"
      >
        <v-lazy-image
          :src="show.image"
          :alt="show.title"
          :class="[dense && 'dense']"
          src-placeholder="/podcast_placeholder.png"
          class="show-tile rounded-2xl mb-3 cursor-pointer"
          @click="$emit('toDetails', show.id)"
        />
        <div
          :class="[
          dark ? 'text-white' : 'text-black'
        ]"
          class="font-black line-clamp-2 cursor-pointer hover:text-slate-400 transition-colors"
          @click="$emit('toDetails', show.id)"
        >
          {{ show.title }}
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import type { Show } from "@/types";
import { $ref } from "vue/macros";
import VLazyImage from "v-lazy-image";
import gsap from 'gsap';

const props = defineProps<{
  shows: Show[]
  loading: boolean
  dark: boolean
  dense: boolean
}>();

defineEmits<{
  (e: 'toDetails', feedId: number): void
}>();

const loadingItems = $ref([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);

// Transition
const beforeEnter = (el: Element) => {
  if (el instanceof HTMLElement) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(100px)';
  }
};
const enter = (el: Element) => {
  if (el instanceof HTMLElement) {
    const elIndex = el.dataset.index ? parseInt(el.dataset.index) : 1;
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      delay: elIndex * 0.1
    });
  }
};
</script>

<style scoped lang="scss">
.show-tile {
  width: 100%;
  max-width: 200px;
  transition: transform 250ms ease;
  &.dense {
    max-width: 120px !important;
  }
  &:hover {
    transform: scale(1.05);
  }
}
.tile-placeholder {
  width: 110px;
  height: 110px;
}
</style>
