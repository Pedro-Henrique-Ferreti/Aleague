import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const RUSSIA_TEAM_LIST = mapToTeamList(defineTeams({ country: Country.RUSSIA, type: TeamType.CLUB }, {
  'Dynamo Moscow': { id: 'RUS-1', badge: 'https://img.sofascore.com/api/v1/team/2315/image', tags: [] },
  'Lokomotiv': { id: 'RUS-2', badge: 'https://img.sofascore.com/api/v1/team/2320/image', tags: [] },
  'Zenit': { id: 'RUS-3', badge: 'https://img.sofascore.com/api/v1/team/2321/image', tags: [] },
  'Spartak ': { id: 'RUS-4', badge: 'https://img.sofascore.com/api/v1/team/2323/image', tags: [] },
  'CSKA': { id: 'RUS-5', badge: 'https://img.sofascore.com/api/v1/team/2325/image', tags: [] },
  'Rostov': { id: 'RUS-6', badge: 'https://img.sofascore.com/api/v1/team/2326/image', tags: [] },
  'Rubin Kazan': { id: 'RUS-7', badge: 'https://img.sofascore.com/api/v1/team/2333/image', tags: [] },
  'Krasnodar': { id: 'RUS-8', badge: 'https://img.sofascore.com/api/v1/team/34425/image', tags: [] },
}));
