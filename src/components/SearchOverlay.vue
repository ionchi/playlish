<template>
  <div id="search" :class="[showOverlay && 'show']">
    <img
      src="@/assets/icons/close.svg"
      alt="close-icon"
      class="close-btn"
      @click="$emit('closeOverlay')"
    />
    <div>
      <input
        id="search-box"
        placeholder="type here"
        type="search"
        @input="debounce"
      />
    </div>
    <div class="results-box mt-5">
      <transition-group name="fade" mode="in-out">
        <shows-grid
          v-if="!loading && results.length > 0"
          :shows="results"
          :loading="false"
          :dark="false"
          :dense="true"
          @toDetails="goToDetails"
        />
        <div v-else-if="loading" class="text-center text-2xl text-slate-600">
          Searching...
        </div>
        <div v-else-if="!loading && results.length === 0 && searchString" class="text-center text-2xl text-slate-600">
          No results for "{{ searchString }}"
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch } from "vue";
import { $ref } from "vue/macros";
import { createDebounce } from "@/helpers";
import type { Show } from "@/types";
import { PodcastService } from "@/service/pocast.service";
import ShowsGrid from "@/components/ShowsGrid.vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  visible: boolean
}>();
const emits = defineEmits<{
  (e: 'closeOverlay'): void
}>();

let showOverlay = $ref(false);
let searchString = $ref('');
let results = $ref([] as Show[]);
let loading = $ref(false);

const router = useRouter();

watch(() => props.visible, (val) => {
  showOverlay = val;
});

const debounce = createDebounce(async (event: any) => {
  searchString = event.target.value;
  loading = true;
  if (searchString) {
    results = await PodcastService.searchShows(searchString, 6);
  } else {
    results = [];
  }
  loading = false;
});

const goToDetails = (feedId: number) => {
  emits('closeOverlay');
  router.push({ name: 'show-details', params: { id: feedId } });
};
</script>

<style scoped lang="scss">
#search {
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  height: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  opacity: 0;
  position: fixed;
  transition: all 0.5s;
  width: 100vw;
  will-change: transform, opacity;
  z-index: -1;
  top: 0;
  left: 0;
  &.show {
    opacity: 1;
    z-index: 10;
    height: 100vh;
    .close-btn {
      display: block;
      position: fixed;
    }
  }
  &.fade {
    height: 100vh;
    width: 100vw;
    transition: opacity 0.5s;
  }
  .close-btn {
    cursor: pointer;
    height: 24px;
    width: 24px;
    display: none;
    font-size: 2rem;
    position: absolute;
    top: 2rem;
    right: 2rem;
    @media screen and (min-width: 768px) {
      display: none;
    }
    @media screen and (max-width: 1100px) {
      top: 1rem;
      right: 1rem;
    }
  }
  #search-box {
    background: transparent;
    border: solid var(--brand-color-4);
    border-width: 0 0 1px 0;
    color: var(--brand-color-4);
    flex: 1 0 auto;
    font-size: 2rem;
    height: 2rem;
    max-width: 400px;
    outline: 0;
    padding: 2rem 1rem;
    @media screen and (max-width: 960px) {
      max-width: 100%;
    }
  }
}

.results-box {
  width: 1080px;
  height: 200px;
  @media screen and (max-width: 1100px) {
    width: 100%;
    height: auto;
    padding: 0 20px;
    min-height: 100px;
  }
}
</style>
