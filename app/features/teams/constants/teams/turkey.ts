import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const TURKEY_TEAM_LIST = mapToTeamList(defineTeams({ country: 'TUR', type: TeamType.CLUB }, {
  Beşiktaş: { id: 'TUR-1', badge: 'https://img.sofascore.com/api/v1/team/3050/image', tags: [] },
  Trabzonspor: { id: 'TUR-2', badge: 'https://img.sofascore.com/api/v1/team/3051/image', tags: [] },
  Fenerbahçe: { id: 'TUR-3', badge: 'https://img.sofascore.com/api/v1/team/3052/image', tags: [] },
  Galatasaray: { id: 'TUR-4', badge: 'https://img.sofascore.com/api/v1/team/3061/image', tags: [] },
}));
