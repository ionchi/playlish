<template>
  <div class="divide-y divide-solid divide-slate-700">
    <div class="font-bold mb-4">
      {{ episodes.length }} Available Episodes
    </div>
    <div class="divide-y divide-solid divide-slate-700">
      <episode-row
        v-for="episode of episodes"
        :key="episode.id"
        :episode="episode"
        class="py-4 md:px-8"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Episode } from "@/types";
import EpisodeRow from "@/components/EpisodeRow.vue";

defineProps<{
  episodes: Episode[]
}>();

</script>

<style scoped lang="scss">

</style>
