import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const POLAND_TEAM_LIST = mapToTeamList(defineTeams({ country: Country.POLAND, type: TeamType.CLUB }, {
  'Legia Warszawa': { id: 'POL-1', badge: 'https://img.sofascore.com/api/v1/team/3106/image', tags: [] },
}));
