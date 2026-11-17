import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const PERU_TEAM_LIST = mapToTeamList(defineTeams({ country: 'PER', type: TeamType.CLUB }, {
  'Alianza Lima': { id: 'PER-1', badge: 'https://img.sofascore.com/api/v1/team/2311/image', tags: [] },
  'Los Chankas': { id: 'PER-2', badge: 'https://img.sofascore.com/api/v1/team/252254/image', tags: [] },
  'Cienciano': { id: 'PER-3', badge: 'https://img.sofascore.com/api/v1/team/2301/image', tags: [] },
  'Universitario': { id: 'PER-4', badge: 'https://img.sofascore.com/api/v1/team/2305/image', tags: [] },
  'Melgar': { id: 'PER-5', badge: 'https://img.sofascore.com/api/v1/team/2308/image', tags: [] },
  'Cusco': { id: 'PER-6', badge: 'https://img.sofascore.com/api/v1/team/63760/image', tags: [] },
  'Comerciantes Unidos': { id: 'PER-7', badge: 'https://img.sofascore.com/api/v1/team/213609/image', tags: [] },
  'Alianza Atlético': { id: 'PER-8', badge: 'https://img.sofascore.com/api/v1/team/2307/image', tags: [] },
  'Asociación Deportiva Tarma': { id: 'PER-9', badge: 'https://img.sofascore.com/api/v1/team/335557/image', tags: [] },
  'Deportivo Garcilaso': { id: 'PER-10', badge: 'https://img.sofascore.com/api/v1/team/458584/image', tags: [] },
  'Moquegua': { id: 'PER-11', badge: 'https://img.sofascore.com/api/v1/team/492848/image', tags: [] },
  'Sporting Cristal': { id: 'PER-12', badge: 'https://img.sofascore.com/api/v1/team/2302/image', tags: [] },
  'ADC Juan Pablo II': { id: 'PER-13', badge: 'https://img.sofascore.com/api/v1/team/511206/image', tags: [] },
  'Sport Boys': { id: 'PER-14', badge: 'https://img.sofascore.com/api/v1/team/2312/image', tags: [] },
  'Sport Huancayo': { id: 'PER-15', badge: 'https://img.sofascore.com/api/v1/team/33895/image', tags: [] },
  'Atlético Grau': { id: 'PER-16', badge: 'https://img.sofascore.com/api/v1/team/282538/image', tags: [] },
}));
