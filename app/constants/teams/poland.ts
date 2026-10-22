import { defineTeams, mapToTeamList } from '~/helpers/team-definition';

export const POLAND_TEAM_LIST = mapToTeamList(defineTeams({
  'Legia Warszawa': { id: 'POL-1', badge: 'https://img.sofascore.com/api/v1/team/3106/image', country: 'POL', type: TeamType.CLUB, tags: [] },
}));
