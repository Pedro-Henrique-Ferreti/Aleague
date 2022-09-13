import type { RouteRecordRaw } from 'vue-router';
import LeaguesView from '@/views/LeaguesView.vue';
import CreateLeagueView from '@/views/CreateLeagueView.vue';
import CreateLeagueFormat from '@/components/CreateLeagueFormat.vue';
import CreateLeagueRules from '@/components/CreateLeagueRules.vue';
import CreateLeagueParticipants from '@/components/CreateLeagueParticipants.vue';

export default [
  {
    path: '/create-league',
    name: 'create-league',
    component: CreateLeagueView,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: ':id',
        component: CreateLeagueFormat,
      },
      {
        path: ':id/rules',
        name: 'create-league-rules',
        component: CreateLeagueRules,
      },
      {
        path: ':id/participants',
        name: 'create-league-participants',
        component: CreateLeagueParticipants,
      },
    ],
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