import type { RouteRecordRaw } from 'vue-router';
import TeamsView from '@/views/TeamsView.vue';
import NewTeamView from '@/views/NewTeamView.vue';
import TeamListView from '@/views/TeamListView.vue';

export default [
  {
    path: '/equipes',
    name: 'teams',
    component: TeamsView,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/equipes/novo',
        name: 'new-team',
        component: NewTeamView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/equipes/listas',
        name: 'team-list',
        component: TeamListView,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
] as RouteRecordRaw[];
