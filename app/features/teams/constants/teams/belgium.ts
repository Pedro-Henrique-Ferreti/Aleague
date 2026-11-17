import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const BELGIUM_TEAM_LIST = mapToTeamList(defineTeams({ country: 'BEL', type: TeamType.CLUB }, {
  'Club Brugge': { id: 'BEL-1', badge: 'https://img.sofascore.com/api/v1/team/2888/image', tags: [] },
  'Royal Antwerp': { id: 'BEL-2', badge: 'https://img.sofascore.com/api/v1/team/2889/image', tags: [] },
  'Genk': { id: 'BEL-3', badge: 'https://img.sofascore.com/api/v1/team/2890/image', tags: [] },
  'Anderlecht': { id: 'BEL-4', badge: 'https://img.sofascore.com/api/v1/team/2900/image', tags: [] },
  'Gent': { id: 'BEL-5', badge: 'https://img.sofascore.com/api/v1/team/2903/image', tags: [] },
  'Union Saint-Gilloise': { id: 'BEL-6', badge: 'https://img.sofascore.com/api/v1/team/4860/image', tags: [] },
  'Mechelen': { id: 'BEL-7', badge: 'https://img.sofascore.com/api/v1/team/5044/image', tags: [] },
}));
