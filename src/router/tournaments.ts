import type { RouteRecordRaw } from 'vue-router';
import TournamentsView from '@/views/TournamentsView.vue';
import NewTournamentView from '@/views/NewTournamentView.vue';
import ShowTournamentView from '@/views/ShowTournamentView.vue';

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
  {
    path: '/campeonatos/:id',
    name: 'show-tournament',
    component: ShowTournamentView,
    meta: {
      requiresAuth: true,
      headerPath: 'tournaments',
    },
  },
] as RouteRecordRaw[];
