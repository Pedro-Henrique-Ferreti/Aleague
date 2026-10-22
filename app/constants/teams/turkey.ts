import { defineTeams, mapToTeamList } from '~/helpers/team-definition';

export const TURKEY_TEAM_LIST = mapToTeamList(defineTeams({
  Beşiktaş: { id: 'TUR-1', badge: 'https://img.sofascore.com/api/v1/team/3050/image', country: 'TUR', type: TeamType.CLUB, tags: [] },
  Trabzonspor: { id: 'TUR-2', badge: 'https://img.sofascore.com/api/v1/team/3051/image', country: 'TUR', type: TeamType.CLUB, tags: [] },
  Fenerbahçe: { id: 'TUR-3', badge: 'https://img.sofascore.com/api/v1/team/3052/image', country: 'TUR', type: TeamType.CLUB, tags: [] },
  Galatasaray: { id: 'TUR-4', badge: 'https://img.sofascore.com/api/v1/team/3061/image', country: 'TUR', type: TeamType.CLUB, tags: [] },
}));
