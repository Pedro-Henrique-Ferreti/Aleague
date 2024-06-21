import type { RouteLocationRaw } from 'vue-router';

export type Breadcrumb = string | {
  title: string;
  to: RouteLocationRaw;
}
