/// <reference types="vite/client" />

import 'vue-router';

export {};

declare module 'vue-router' {
  interface RouteMeta {
    layout?: 'landing-page' | 'auth';
    requiresAuth?: boolean;
    headerPath?: 'teams' | 'careers' | 'tournaments';
  }
}
