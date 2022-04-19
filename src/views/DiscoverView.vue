<template>
  <div class="text-white safe-area">
    <div class="text-2xl mb-6">
      Trending
    </div>
    <shows-grid
      :shows="shows"
      :loading="loading"
      :dark="true"
      :dense="false"
      @toDetails="goToDetails"
    />
  </div>
</template>

<script lang="ts" setup>
import { $ref } from "vue/macros";
import { onMounted } from "vue";
import type { Show } from "@/types";
import ShowsGrid from "@/components/ShowsGrid.vue";
import { PodcastService } from "@/service/pocast.service";
import { useRouter } from "vue-router";

let shows = $ref([] as Show[]);
let loading = $ref(false);
const router = useRouter();

const goToDetails = (feedId: number) => {
  router.push({ name: 'show-details', params: { id: feedId } });
};

onMounted(async () => {
  try {
    loading = true;
    shows = await PodcastService.getTrendingShows(12);
  } catch (e) {
    console.log(e);
  } finally {
    loading = false;
  }
});
</script>

<style scoped lang="scss">
</style>
