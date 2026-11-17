import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const VENEZUELA_TEAM_LIST = mapToTeamList(defineTeams({ country: 'VEN', type: TeamType.CLUB }, {
  'Carabobo': { id: 'VEN-1', badge: 'https://img.sofascore.com/api/v1/team/6229/image', tags: [] },
  'Caracas': { id: 'VEN-2', badge: 'https://img.sofascore.com/api/v1/team/6230/image', tags: [] },
  'Deportivo Táchira': { id: 'VEN-3', badge: 'https://img.sofascore.com/api/v1/team/6231/image', tags: [] },
  'Monagas': { id: 'VEN-4', badge: 'https://img.sofascore.com/api/v1/team/6233/image', tags: [] },
  'Zamora': { id: 'VEN-5', badge: 'https://img.sofascore.com/api/v1/team/6237/image', tags: [] },
  'Deportivo La Guaira': { id: 'VEN-6', badge: 'https://img.sofascore.com/api/v1/team/36437/image', tags: [] },
  'Metropolitanos': { id: 'VEN-7', badge: 'https://img.sofascore.com/api/v1/team/162480/image', tags: [] },
  'Puerto Cabello': { id: 'VEN-8', badge: 'https://img.sofascore.com/api/v1/team/230725/image', tags: [] },
  'Rayo Zuliano': { id: 'VEN-9', badge: 'https://img.sofascore.com/api/v1/team/386310/image', tags: [] },
  'Universidad Central': { id: 'VEN-10', badge: 'https://img.sofascore.com/api/v1/team/249952/image', tags: [] },
  'Portuguesa': { id: 'VEN-11', badge: 'https://img.sofascore.com/api/v1/team/6234/image', tags: [] },
  'Estudiantes de Mérida': { id: 'VEN-12', badge: 'https://img.sofascore.com/api/v1/team/7745/image', tags: [] },
  'Anzoátegui': { id: 'VEN-13', badge: 'https://img.sofascore.com/api/v1/team/418693/image', tags: [] },
  'Trujillanos': { id: 'VEN-14', badge: 'https://img.sofascore.com/api/v1/team/6235/image', tags: [] },
}));
