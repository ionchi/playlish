<template>
  <header class="bg-white shadow flex flex-col items-center justify-center ">
    <div class="flex justify-between items-center app-content">
      <div class="brand-logo flex select-none cursor-pointer" @click="$emit('toHomePage')">
        <img
          src="@/assets/icons/logo-play.svg"
          alt="logo-play-icon"
          class="logo-icon"
        />
        <img
          src="@/assets/playlish-logo.svg"
          alt="logo-playlish"
          class="ml-3 logo-text"
        />
      </div>
      <div class="flex">
        <button
          title="search content"
          class="navbar-icon-button select-none"
          @click="$emit('searchContent')"
        >
          <img src="@/assets/icons/search.svg" alt="search-icon"/>
        </button>

        <button
          title="favourites"
          class="navbar-icon-button select-none ml-3"
          @click="$emit('toFavourites')"
        >
          <img src="@/assets/icons/heart.svg" alt="heart-icon"/>
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
defineEmits<{
  (e: 'searchContent'): void
  (e: 'toHomePage'): void
  (e: 'toFavourites'): void
}>();
</script>

<style scoped lang="scss">
header {
  height: 56px;
  .brand-logo {
    .logo-icon {
      height: 22px;
      width: 22px;
    }
    .logo-text {
      width: 90px;
    }
  }
  .navbar-icon-button {
    height: 24px;
    width: 24px;
    border: none;
    background: none;
    cursor: pointer;
    transition: transform 0.15s linear;
    &:hover {
      transform: scale(1.1);
    }
    &::-moz-focus-inner {
      border: 0;
    }
  }
}
</style>
