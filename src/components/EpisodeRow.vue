<template>
  <div class="flex flex-col">
    <div
      :title="episode.link ? 'External Link - ' + episode.link : episode.title"
      :class="[
        episode.link && 'cursor-pointer',
        episode.link && 'hover:text-slate-400'
      ]"
      class="text-lg font-bold mb-4 transition-colors w-fit flex items-center title-link"
      @click="toExternalLinkEpisode"
    >
      {{ episode.title }}
      <img
        v-if="episode.link"
        src="@/assets/icons/link.svg"
        alt="external link icon"
        class="icon-link ml-2"
      />
    </div>
    <div class="text-sm mb-4 text-slate-300">
      {{ visibleDescription }}
    </div>
    <div class="text-xs text-slate-500 w-fit">
      {{ visibleDate }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Episode } from "@/types";
import { formatDate } from "@/helpers";
import { $computed } from "vue/macros";

const props = defineProps<{
  episode: Episode
}>();

const visibleDate = $computed(() => {
  return formatDate(props.episode.datePublished);
});

const visibleDescription = $computed(() => {
  const temp = props.episode.description;
  return temp.replace(/<[^>]*>?/gm, '');
});

const toExternalLinkEpisode = () => {
  if (!window || !props.episode.link) { return; }
  window.open(props.episode.link, '_blank')?.focus();
};
</script>

<style scoped lang="scss">
.title-link {
  .icon-link {
    height: 16px;
    width: 16px;
    filter: invert(100%);
    transition: all 250ms ease;
  }
  &:hover {
    .icon-link {
      filter: invert(70%);
    }
  }
}

</style>
