import type { RouteRecordRaw } from 'vue-router';
import CompetitionsView from '@/views/CompetitionsView.vue';
import LeagueView from '@/views/LeagueView.vue';
import PlayoffView from '@/views/PlayoffView.vue';
import CreateCompetitionView from '@/views/CreateCompetitionView.vue';
import CreateCompetitionFormatView from '@/views/CreateCompetitionFormatView.vue';
import CreateCompetitionLeagueFormatView from '@/views/CreateCompetitionLeagueFormatView.vue';
import CreateCompetitionPlayoffFormatView from '@/views/CreateCompetitionPlayoffFormatView.vue';
import CreateCompetitionLeagueRulesView from '@/views/CreateCompetitionLeagueRulesView.vue';
import CreateCompetitionPlayoffRulesView from '@/views/CreateCompetitionPlayoffRulesView.vue';
import CreateCompetitionLeagueParticipantsView from '@/views/CreateCompetitionLeagueParticipantsView.vue';
import CreateCompetitionPlayoffParticipantsView from '@/views/CreateCompetitionPlayoffParticipantsView.vue';

export default [
  {
    path: '/create-league',
    component: CreateCompetitionView,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'create-league',
        component: CreateCompetitionFormatView,
        props: true,
      },
      {
        path: 'league/:id',
        name: 'create-league-format',
        component: CreateCompetitionLeagueFormatView,
        props: true,
      },
      {
        path: 'playoff/:id',
        name: 'create-playoff-format',
        component: CreateCompetitionPlayoffFormatView,
        props: true,
      },
      {
        path: 'league/:id/rules',
        name: 'create-league-rules',
        component: CreateCompetitionLeagueRulesView,
        props: true,
      },
      {
        path: 'playoff/:id/rules',
        name: 'create-playoff-rules',
        component: CreateCompetitionPlayoffRulesView,
        props: true,
      },
      {
        path: 'league/:id/participants',
        name: 'create-league-participants',
        component: CreateCompetitionLeagueParticipantsView,
        props: true,
      },
      {
        path: 'playoff/:id/participants',
        name: 'create-playoff-participants',
        component: CreateCompetitionPlayoffParticipantsView,
        props: true,
      },
    ],
  },
  {
    path: '/leagues',
    name: 'leagues',
    component: CompetitionsView,
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
  {
    path: '/playoffs/:id',
    name: 'view-playoff',
    component: PlayoffView,
    meta: {
      requiresAuth: true,
    },
  },
] as RouteRecordRaw[];