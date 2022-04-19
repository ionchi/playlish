/// <reference types="vite/client" />
declare module 'v-lazy-image';
declare module '@/plugins/supabase';
declare module '@vueuse/router';

interface ImportMetaEnv {
  readonly VITE_TRENDING: string
  readonly VITE_SEARCH_PODCAST: string
  readonly VITE_GET_BY_ID: string
  readonly VITE_GET_EPISODE_BY_FEED: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
