import { defineTeams, mapToTeamList } from '~/helpers/team';

export const PERU_TEAM_LIST = mapToTeamList(defineTeams({
  'Alianza Lima': { id: 'PER-1', badge: 'https://img.sofascore.com/api/v1/team/2311/image', country: 'PER', type: TeamType.CLUB, tags: [] },
  'Los Chankas': { id: 'PER-2', badge: 'https://img.sofascore.com/api/v1/team/252254/image', country: 'PER', type: TeamType.CLUB, tags: [] },
  'Cienciano': { id: 'PER-3', badge: 'https://img.sofascore.com/api/v1/team/2301/image', country: 'PER', type: TeamType.CLUB, tags: [] },
  'Universitario': { id: 'PER-4', badge: 'https://img.sofascore.com/api/v1/team/2305/image', country: 'PER', type: TeamType.CLUB, tags: [] },
  'Melgar': { id: 'PER-5', badge: 'https://img.sofascore.com/api/v1/team/2308/image', country: 'PER', type: TeamType.CLUB, tags: [] },
  'Cusco': { id: 'PER-6', badge: 'https://img.sofascore.com/api/v1/team/63760/image', country: 'PER', type: TeamType.CLUB, tags: [] },
  'Comerciantes Unidos': { id: 'PER-7', badge: 'https://img.sofascore.com/api/v1/team/213609/image', country: 'PER', type: TeamType.CLUB, tags: [] },
  'Alianza Atlético': { id: 'PER-8', badge: 'https://img.sofascore.com/api/v1/team/2307/image', country: 'PER', type: TeamType.CLUB, tags: [] },
  'Asociación Deportiva Tarma': { id: 'PER-9', badge: 'https://img.sofascore.com/api/v1/team/335557/image', country: 'PER', type: TeamType.CLUB, tags: [] },
  'Deportivo Garcilaso': { id: 'PER-10', badge: 'https://img.sofascore.com/api/v1/team/458584/image', country: 'PER', type: TeamType.CLUB, tags: [] },
  'Moquegua': { id: 'PER-11', badge: 'https://img.sofascore.com/api/v1/team/492848/image', country: 'PER', type: TeamType.CLUB, tags: [] },
  'Sporting Cristal': { id: 'PER-12', badge: 'https://img.sofascore.com/api/v1/team/2302/image', country: 'PER', type: TeamType.CLUB, tags: [] },
  'ADC Juan Pablo II': { id: 'PER-13', badge: 'https://img.sofascore.com/api/v1/team/511206/image', country: 'PER', type: TeamType.CLUB, tags: [] },
  'Sport Boys': { id: 'PER-14', badge: 'https://img.sofascore.com/api/v1/team/2312/image', country: 'PER', type: TeamType.CLUB, tags: [] },
  'Sport Huancayo': { id: 'PER-15', badge: 'https://img.sofascore.com/api/v1/team/33895/image', country: 'PER', type: TeamType.CLUB, tags: [] },
  'Atlético Grau': { id: 'PER-16', badge: 'https://img.sofascore.com/api/v1/team/282538/image', country: 'PER', type: TeamType.CLUB, tags: [] },
}));
