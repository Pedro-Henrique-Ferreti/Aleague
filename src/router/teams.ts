import type { RouteRecordRaw } from 'vue-router';
import TeamsView from '@/views/TeamsView.vue';
import NewTeamView from '@/views/NewTeamView.vue';

export default [
  {
    path: '/equipes',
    name: 'teams',
    component: TeamsView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/equipes/novo',
    name: 'new-team',
    component: NewTeamView,
    meta: {
      requiresAuth: true,
    },
  },
] as RouteRecordRaw[];
