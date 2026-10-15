import { defineTeams, mapToTeamList } from '~/helpers/team';

export const UKRAINE_TEAM_LIST = mapToTeamList(defineTeams({
  'Dynamo Kyiv': { id: 'UKR-1', badge: 'https://img.sofascore.com/api/v1/team/3305/image', country: 'UKR', type: TeamType.CLUB, tags: [] },
  'Shakhtar': { id: 'UKR-2', badge: 'https://img.sofascore.com/api/v1/team/3313/image', country: 'UKR', type: TeamType.CLUB, tags: [] },
}));
