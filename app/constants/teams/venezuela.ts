import { defineTeams, mapToTeamList } from '~/helpers/team';

export const VENEZUELA_TEAM_LIST = mapToTeamList(defineTeams({
  'Carabobo': { id: 'VEN-1', badge: 'https://img.sofascore.com/api/v1/team/6229/image', country: 'VEN', type: TeamType.CLUB, tags: [] },
  'Caracas': { id: 'VEN-2', badge: 'https://img.sofascore.com/api/v1/team/6230/image', country: 'VEN', type: TeamType.CLUB, tags: [] },
  'Deportivo Táchira': { id: 'VEN-3', badge: 'https://img.sofascore.com/api/v1/team/6231/image', country: 'VEN', type: TeamType.CLUB, tags: [] },
  'Monagas': { id: 'VEN-4', badge: 'https://img.sofascore.com/api/v1/team/6233/image', country: 'VEN', type: TeamType.CLUB, tags: [] },
  'Zamora': { id: 'VEN-5', badge: 'https://img.sofascore.com/api/v1/team/6237/image', country: 'VEN', type: TeamType.CLUB, tags: [] },
  'Deportivo La Guaira': { id: 'VEN-6', badge: 'https://img.sofascore.com/api/v1/team/36437/image', country: 'VEN', type: TeamType.CLUB, tags: [] },
  'Metropolitanos': { id: 'VEN-7', badge: 'https://img.sofascore.com/api/v1/team/162480/image', country: 'VEN', type: TeamType.CLUB, tags: [] },
  'Puerto Cabello': { id: 'VEN-8', badge: 'https://img.sofascore.com/api/v1/team/230725/image', country: 'VEN', type: TeamType.CLUB, tags: [] },
  'Rayo Zuliano': { id: 'VEN-9', badge: 'https://img.sofascore.com/api/v1/team/386310/image', country: 'VEN', type: TeamType.CLUB, tags: [] },
  'Universidad Central': { id: 'VEN-10', badge: 'https://img.sofascore.com/api/v1/team/249952/image', country: 'VEN', type: TeamType.CLUB, tags: [] },
  'Portuguesa': { id: 'VEN-11', badge: 'https://img.sofascore.com/api/v1/team/6234/image', country: 'VEN', type: TeamType.CLUB, tags: [] },
  'Estudiantes de Mérida': { id: 'VEN-12', badge: 'https://img.sofascore.com/api/v1/team/7745/image', country: 'VEN', type: TeamType.CLUB, tags: [] },
  'Anzoátegui': { id: 'VEN-13', badge: 'https://img.sofascore.com/api/v1/team/418693/image', country: 'VEN', type: TeamType.CLUB, tags: [] },
  'Trujillanos': { id: 'VEN-14', badge: 'https://img.sofascore.com/api/v1/team/6235/image', country: 'VEN', type: TeamType.CLUB, tags: [] },
}));
