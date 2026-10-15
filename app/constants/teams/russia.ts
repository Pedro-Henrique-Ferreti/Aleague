import { defineTeams, mapToTeamList } from '~/helpers/team';

export const RUSSIA_TEAM_LIST = mapToTeamList(defineTeams({
  'Dynamo Moscow': { id: 'RUS-1', badge: 'https://img.sofascore.com/api/v1/team/2315/image', country: 'RUS', type: TeamType.CLUB, tags: [] },
  'Lokomotiv': { id: 'RUS-2', badge: 'https://img.sofascore.com/api/v1/team/2320/image', country: 'RUS', type: TeamType.CLUB, tags: [] },
  'Zenit': { id: 'RUS-3', badge: 'https://img.sofascore.com/api/v1/team/2321/image', country: 'RUS', type: TeamType.CLUB, tags: [] },
  'Spartak ': { id: 'RUS-4', badge: 'https://img.sofascore.com/api/v1/team/2323/image', country: 'RUS', type: TeamType.CLUB, tags: [] },
  'CSKA': { id: 'RUS-5', badge: 'https://img.sofascore.com/api/v1/team/2325/image', country: 'RUS', type: TeamType.CLUB, tags: [] },
  'Rostov': { id: 'RUS-6', badge: 'https://img.sofascore.com/api/v1/team/2326/image', country: 'RUS', type: TeamType.CLUB, tags: [] },
  'Rubin Kazan': { id: 'RUS-7', badge: 'https://img.sofascore.com/api/v1/team/2333/image', country: 'RUS', type: TeamType.CLUB, tags: [] },
  'Krasnodar': { id: 'RUS-8', badge: 'https://img.sofascore.com/api/v1/team/34425/image', country: 'RUS', type: TeamType.CLUB, tags: [] },
}));
