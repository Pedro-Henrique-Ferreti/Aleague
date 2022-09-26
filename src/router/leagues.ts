import type { RouteRecordRaw } from 'vue-router';
import LeaguesView from '@/views/LeaguesView.vue';
import LeagueView from '@/views/LeagueView.vue';
import CreateLeagueView from '@/views/CreateLeagueView.vue';
import CreateLeagueFormatView from '@/views/CreateLeagueFormatView.vue';
import CreateLeagueRulesView from '@/views/CreateLeagueRulesView.vue';
import CreateLeagueParticipantsView from '@/views/CreateLeagueParticipantsView.vue';

export default [
  {
    path: '/create-league',
    component: CreateLeagueView,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'create-league',
        component: CreateLeagueFormatView,
        props: true,
      },
      {
        path: ':id',
        name: 'create-league-format',
        component: CreateLeagueFormatView,
        props: true,
      },
      {
        path: ':id/rules',
        name: 'create-league-rules',
        component: CreateLeagueRulesView,
      },
      {
        path: ':id/participants',
        name: 'create-league-participants',
        component: CreateLeagueParticipantsView,
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
  {
    path: '/leagues/:id',
    name: 'view-league',
    component: LeagueView,
    meta: {
      requiresAuth: true,
    },
  },
] as RouteRecordRaw[];