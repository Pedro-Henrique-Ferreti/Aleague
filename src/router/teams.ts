import type { RouteRecordRaw } from 'vue-router';
import TeamsView from '@/views/TeamsView.vue';
import NewTeamView from '@/views/NewTeamView.vue';
import TeamListView from '@/views/TeamListView.vue';
import CreateTeamsView from '@/views/CreateTeamsView.vue';
import ShowTeamView from '@/views/ShowTeamView.vue';
import EditTeamView from '@/views/EditTeamView.vue';

export default [
  {
    path: '/equipes',
    name: 'teams',
    component: TeamsView,
    meta: {
      requiresAuth: true,
      pageTitle: 'Equipes',
    },
  },
  {
    path: '/equipes/novo',
    name: 'new-team',
    component: NewTeamView,
    meta: {
      requiresAuth: true,
      headerPath: 'teams',
      pageTitle: 'Adicionar equipe',
    },
  },
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
    path: '/equipes/listas',
    name: 'team-list',
    component: TeamListView,
    meta: {
      requiresAuth: true,
      headerPath: 'teams',
      pageTitle: 'Listas de equipes',
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
