import type { RouteRecordRaw } from 'vue-router';
import TournamentsView from '@/views/TournamentsView.vue';
import NewTournamentView from '@/views/NewTournamentView.vue';

export default [
  {
    path: '/campeonatos',
    name: 'tournaments',
    component: TournamentsView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/campeonatos/novo',
    name: 'new-tournament',
    component: NewTournamentView,
    meta: {
      requiresAuth: true,
      headerPath: 'tournaments',
    },
  },
] as RouteRecordRaw[];
