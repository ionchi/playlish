<template>
  <div class="text-white safe-area">
    <div class="search-box">
      <input
        ref="searchInput"
        class="search-input"
        v-model="searchString"
        placeholder="type here"
        type="search"
      />
      <transition name="fade">
        <img
          v-if="searchString && !typing"
          src="@/assets/icons/close.svg"
          alt="close-icon"
          class="clear-btn"
          title="Clear search"
          @click="clearSearch"
        />
      </transition>
    </div>
    <div class="results-box mt-5">
      <transition-group name="fade" mode="in-out">
        <shows-grid
          v-if="!typing && !loading && results.length > 0"
          :shows="results"
          :loading="false"
          :dark="true"
          :dense="false"
          @toDetails="goToDetails"
        />
        <div v-else-if="loading || typing" class="text-center text-2xl text-slate-600">
          Searching...
        </div>
        <div v-else-if="!loading && !typing && results.length === 0 && searchString" class="text-center text-2xl text-slate-600">
          No results for "{{ searchString }}"
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router';
import { watchDebounced } from '@vueuse/core';
import { useFocus } from '@vueuse/core';
import { $ref } from "vue/macros";
import type { Show } from "@/types";
import { useRouter } from "vue-router";
import { PodcastService } from "@/service/pocast.service";
import ShowsGrid from "@/components/ShowsGrid.vue";
import { onMounted, ref, watch } from "vue";

let searchString = useRouteQuery('q');
let results = $ref([] as Show[]);
let loading = $ref(false);
let typing = $ref(false);

const router = useRouter();

const searchInput = ref();
const { focused } = useFocus(searchInput);

const search = async () => {
  loading = true;
  if (searchString.value) {
    results = await PodcastService.searchShows(searchString.value, 12);
  } else {
    results = [];
  }
  typing = false;
  loading = false;
};

watch(() => searchString.value, (val, oldVal) => {
  if (val && val !== oldVal) {
    typing = true;
  }
});

watchDebounced(
  searchString,
  search,
  { debounce: 500 }
);

onMounted(async () => {
  await search();
  focused.value = true;
});

const goToDetails = (feedId: number) => {
  router.push({ name: 'show-details', params: { id: feedId } });
};

const clearSearch = () => {
  searchString.value = '';
  focused.value = true;
};
</script>

<style scoped lang="scss">
.search-box {
  position: relative;
  .search-input {
    background: transparent;
    border: solid var(--white-color);
    border-width: 0 0 1px 0;
    color: var(--white-color);
    flex: 1 0 auto;
    font-size: 2rem;
    height: 2rem;
    width: 100%;
    outline: 0;
    z-index: 0;
    padding: 2rem 3rem 2rem 1rem;
  }
  .clear-btn {
    cursor: pointer;
    height: 1rem;
    width: 1rem;
    position: absolute;
    top: 1.7rem;
    right: 1rem;
    filter: invert(100%);
    z-index: 1;
  }
}
</style>
