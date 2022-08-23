export {};

import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    layout?: 'landing' | 'notFound' | 'auth';
  }
}