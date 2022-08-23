import type { RouteRecordRaw } from 'vue-router';
import LeaguesView from '@/views/LeaguesView.vue';
import CreateLeagueView from '@/views/CreateLeagueView.vue';

export default [
  {
    path: '/create-league',
    name: 'create-league',
    component: CreateLeagueView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/leagues',
    name: 'leagues',
    component: LeaguesView,
    meta: {
      requiresAuth: true,
    },
  },
] as RouteRecordRaw[];