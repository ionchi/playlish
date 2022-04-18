<template>
  <app-navbar
    v-if="meta?.showNav"
    @searchContent="showSearch = true"
    @toHomePage="toHomePage"
    @toFavourites="toFavourites"
  />

  <div class="app-content full-page mx-auto flex flex-col">
    <router-view v-slot="{ Component, route }">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>

  <search-overlay
    :visible="showSearch"
    @closeOverlay="showSearch = false"
  />
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { $ref } from "vue/macros";
import AppNavbar from "@/components/AppNavbar.vue";
import SearchOverlay from "@/components/SearchOverlay.vue";

const currentRoute = useRoute();
const router = useRouter();
const { meta } = toRefs(currentRoute);

let showSearch = $ref(false);

const toHomePage = () => {
  router.push({ name: 'home' });
};

const toFavourites = () => {
  router.push({ name: 'favourites' });
};
</script>


<style scoped lang="scss">
</style>
