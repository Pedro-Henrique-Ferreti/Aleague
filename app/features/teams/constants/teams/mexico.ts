import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const MEXICO_TEAM_LIST = mapToTeamList(defineTeams({ country: Country.MEXICO, type: TeamType.CLUB }, {
  Monterrey: { id: 'MEX-1', badge: 'https://img.sofascore.com/api/v1/team/1932/image', tags: [] },
  Pachuca: { id: 'MEX-2', badge: 'https://img.sofascore.com/api/v1/team/1936/image', tags: [] },
  América: { id: 'MEX-3', badge: 'https://img.sofascore.com/api/v1/team/1939/image', tags: [] },
  Tigres: { id: 'MEX-4', badge: 'https://img.sofascore.com/api/v1/team/1940/image', tags: [] },
  León: { id: 'MEX-5', badge: 'https://img.sofascore.com/api/v1/team/36534/image', tags: [] },
}));
