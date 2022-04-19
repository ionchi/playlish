<template>
  <div class="text-white safe-area">
    <div v-if="shows.length > 0" class="text-2xl mb-6">
      Favourites
    </div>
    <shows-grid
      v-if="shows.length > 0"
      :shows="shows"
      :loading="loading"
      :dark="true"
      :dense="false"
      @toDetails="goToDetails"
    />
    <div v-else class="text-center text-3xl tracking-wider text-slate-500">
      No favourites
    </div>
  </div>
</template>

<script lang="ts" setup>
import ShowsGrid from "@/components/ShowsGrid.vue";
import { $ref } from "vue/macros";
import type { Show } from "@/types";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { PodcastService } from "@/service/pocast.service";

let shows = $ref([] as Show[]);
let loading = $ref(false);
const router = useRouter();

const goToDetails = (feedId: number) => {
  router.push({ name: 'show-details', params: { id: feedId } });
};

onMounted(async () => {
  loading = true;
  shows = PodcastService.getFavourites();
  setTimeout(() => {
    loading = false;
  }, 300);
});
</script>

<style scoped lang="scss">
</style>
