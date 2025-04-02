import type { RouteRecordRaw } from 'vue-router';
import CreateTeamsView from '@/views/CreateTeamsView.vue';
import ShowTeamView from '@/views/ShowTeamView.vue';
import EditTeamView from '@/views/EditTeamView.vue';

export default [
  {
    path: '/equipes/criar-equipes',
    name: 'create-teams',
    component: CreateTeamsView,
    meta: {
      requiresAuth: true,
      headerPath: 'teams',
      pageTitle: 'Nova equipe',
    },
  },
  {
    path: '/equipes/:id',
    name: 'show-team',
    component: ShowTeamView,
    meta: {
      requiresAuth: true,
      headerPath: 'teams',
    },
  },
  {
    path: '/equipes/:id/editar',
    name: 'edit-team',
    component: EditTeamView,
    meta: {
      requiresAuth: true,
      headerPath: 'teams',
    },
  },
] as RouteRecordRaw[];
