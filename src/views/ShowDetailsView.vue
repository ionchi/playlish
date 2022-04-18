<template>
  <div class="pb-20">
    <show-details-header
      :loading="loading"
      :show-details="showData"
      class="flex flex-col justify-center items-center pt-10 mb-8"
    />
    <episodes-list v-if="episodes.length > 0" :episodes="episodes" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { PodcastService } from "@/service/pocast.service";
import type { Episode, Show } from "@/types";
import { $ref } from "vue/macros";
import { useRoute } from "vue-router";
import ShowDetailsHeader from "@/components/ShowDetailsHeader.vue";
import EpisodesList from "@/components/EpisodesList.vue";

let episodes = $ref([] as Episode[]);
let showData = $ref({} as Show);
let loading = $ref(false);
const currentRoute = useRoute();

onMounted(async () => {
  try {
    loading = true;
    const feedId = parseInt(currentRoute.params.id as string);
    await getShowDetails(feedId);
  } catch (e) {
    console.log(e);
  } finally {
    loading = false;
  }
});
watch(
  () => currentRoute.params.id,
  async (newId) => {
    await getShowDetails(parseInt(newId as string));
  }
);

const getShowDetails = async (feedId: number) => {
  if (!feedId) { return; }
  showData = await PodcastService.getFeedById(feedId);
  episodes = await PodcastService.getEpisodesByFeedId(feedId, 50);
};
</script>

<style scoped lang="scss">

</style>
