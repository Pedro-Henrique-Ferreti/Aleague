import { defineTeams, mapToTeamList } from '~/helpers/team-definition';

export const BELGIUM_TEAM_LIST = mapToTeamList(defineTeams({
  'Club Brugge': { id: 'BEL-1', badge: 'https://img.sofascore.com/api/v1/team/2888/image', country: 'BEL', type: TeamType.CLUB, tags: [] },
  'Royal Antwerp': { id: 'BEL-2', badge: 'https://img.sofascore.com/api/v1/team/2889/image', country: 'BEL', type: TeamType.CLUB, tags: [] },
  'Genk': { id: 'BEL-3', badge: 'https://img.sofascore.com/api/v1/team/2890/image', country: 'BEL', type: TeamType.CLUB, tags: [] },
  'Anderlecht': { id: 'BEL-4', badge: 'https://img.sofascore.com/api/v1/team/2900/image', country: 'BEL', type: TeamType.CLUB, tags: [] },
  'Gent': { id: 'BEL-5', badge: 'https://img.sofascore.com/api/v1/team/2903/image', country: 'BEL', type: TeamType.CLUB, tags: [] },
  'Union Saint-Gilloise': { id: 'BEL-6', badge: 'https://img.sofascore.com/api/v1/team/4860/image', country: 'BEL', type: TeamType.CLUB, tags: [] },
  'Mechelen': { id: 'BEL-7', badge: 'https://img.sofascore.com/api/v1/team/5044/image', country: 'BEL', type: TeamType.CLUB, tags: [] },
}));
