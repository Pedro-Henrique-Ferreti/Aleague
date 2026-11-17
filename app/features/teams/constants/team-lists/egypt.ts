import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const EGYPT_TEAM_LIST = mapToTeamList(defineTeams({ country: Country.EGYPT, type: TeamType.CLUB }, {
  'Al Ahly': { id: 'EGY-1', badge: 'https://img.sofascore.com/api/v1/team/6910/image', tags: [] },
  'Pyramids': { id: 'EGY-2', badge: 'https://img.sofascore.com/api/v1/team/175002/image', tags: [] },
}));
