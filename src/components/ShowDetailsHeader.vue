<template>
  <div>
    <v-lazy-image
      v-if="!loading && showDetails.image"
      :src="showDetails.image"
      :alt="showDetails.title"
      src-placeholder="/podcast_placeholder.png"
      class="show-tile rounded-full mb-6"
    />
    <div v-else class="animate-pulse">
      <div class="rounded-full bg-slate-700 tile-placeholder mb-6"></div>
    </div>

    <div
      v-if="!loading"
      class="text-white font-black text-3xl mb-6"
    >
      {{ showDetails.title }}
    </div>
    <div v-else class="h-2 bg-slate-700 rounded w-20 mb-6"></div>

    <div class="flex justify-center items-center mb-6">
      <button
        :class="[loading && 'disabled']"
        :title="'External link - ' + showDetails.link"
        type="button"
        class="base-button bg-white font-bold"
        aria-label="to podcast page"
        @click="externalLinkToPodcast"
      >
        External Link
      </button>
      <button
        :class="[
          loading && 'disabled',
          isFavourite && 'added'
        ]"
        :title="isFavourite ? 'Remove from favourites' : 'Add to favourites'"
        type="button"
        class="base-button favourite-button icon bg-white font-bold ml-3 flex justify-center items-center"
        aria-label="toggle favourite"
        @click="toggleFavourites"
      >
        <img src="@/assets/icons/heart.svg" alt="heart-icon"/>
      </button>
    </div>

    <div v-if="!loading" class="self-stretch">
      {{ showDetails.description }}
    </div>
    <div v-else class="self-stretch">
      <div class="h-3 bg-slate-700 rounded w-20 mb-2"></div>
      <div class="h-3 bg-slate-700 rounded w-15"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VLazyImage from "v-lazy-image";
import type { Show } from "@/types";
import { useToast } from "vue-toastification";
import { $computed, $ref } from "vue/macros";
import { PodcastService } from "@/service/pocast.service";
import { onMounted } from "vue";

const props = defineProps<{
  showDetails: Show
  loading: boolean
}>();

const toast = useToast();
let favourites = $ref([] as Show[]);

onMounted(() => {
  favourites = PodcastService.getFavourites();
});

const isFavourite = $computed(() => {
  return !!favourites.find(el => el.id === props.showDetails.id);
});

const externalLinkToPodcast = () => {
  if (!window || props.loading) { return; }
  window.open(props.showDetails.link, '_blank')?.focus();
};

const toggleFavourites = () => {
  toast.clear();
  if (isFavourite) {
    PodcastService.removeFavourite(props.showDetails.id);
    favourites = PodcastService.getFavourites();
    toast.error('Removed from favourites', { timeout: 3000 });
  } else {
    PodcastService.addFavourite(props.showDetails);
    favourites = PodcastService.getFavourites();
    toast.success('Added to favourites', { timeout: 3000 });
  }

};
</script>

<style scoped lang="scss">
.show-tile, .tile-placeholder {
  width: 150px;
  height: 150px;
}
.favourite-button {
  background-color: #FFFFFF;
  transition: background-color 300ms linear;
  &.added {
    background-color: #ff5252;
    transition: background-color 300ms linear;
    &:hover {
      background-color: #fb2f2f !important;
    }
  }
}
</style>
