import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const UKRAINE_TEAM_LIST = mapToTeamList(defineTeams({ country: Country.UKRAINE, type: TeamType.CLUB }, {
  'Dynamo Kyiv': { id: 'UKR-1', badge: 'https://img.sofascore.com/api/v1/team/3305/image', tags: [] },
  'Shakhtar': { id: 'UKR-2', badge: 'https://img.sofascore.com/api/v1/team/3313/image', tags: [] },
}));
