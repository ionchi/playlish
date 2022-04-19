<template>
  <app-navbar
    v-if="meta?.showNav"
    @searchContent="toSearch"
    @toHomePage="toHomePage"
    @toFavourites="toFavourites"
  />

  <div class="app-content full-page mx-auto flex flex-col">
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppNavbar from "@/components/AppNavbar.vue";

const currentRoute = useRoute();
const router = useRouter();
const { meta } = toRefs(currentRoute);

const toHomePage = () => {
  router.push({ name: 'home' });
};

const toFavourites = () => {
  router.push({ name: 'favourites' });
};

const toSearch = () => {
  router.push({ name: 'search' });
};
</script>


<style scoped lang="scss">
</style>
