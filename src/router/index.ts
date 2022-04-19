import 'vue-router';
import { createRouter, createWebHistory } from "vue-router";
import DiscoverView from '../views/DiscoverView.vue';
import ShowDetailsView from '../views/ShowDetailsView.vue';
import FavouritesView from '../views/FavouritesView.vue';
import SearchView from '../views/SearchView.vue';


declare module 'vue-router' {
  interface RouteMeta {
    showNav?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DiscoverView,
      meta: {
        showNav: true
      }
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: FavouritesView,
      meta: {
        showNav: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      meta: {
        showNav: true
      }
    },
    {
      path: '/show/:id',
      name: 'show-details',
      component: ShowDetailsView,
      meta: {
        showNav: true
      }
    }
  ]
});

export default router;
