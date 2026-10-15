import { defineTeams, mapToTeamList } from '~/helpers/team';

export const MEXICO_TEAM_LIST = mapToTeamList(defineTeams({
  Monterrey: { id: 'MEX-1', badge: 'https://img.sofascore.com/api/v1/team/1932/image', country: 'MEX', type: TeamType.CLUB, tags: [] },
  Pachuca: { id: 'MEX-2', badge: 'https://img.sofascore.com/api/v1/team/1936/image', country: 'MEX', type: TeamType.CLUB, tags: [] },
  América: { id: 'MEX-3', badge: 'https://img.sofascore.com/api/v1/team/1939/image', country: 'MEX', type: TeamType.CLUB, tags: [] },
  Tigres: { id: 'MEX-4', badge: 'https://img.sofascore.com/api/v1/team/1940/image', country: 'MEX', type: TeamType.CLUB, tags: [] },
  León: { id: 'MEX-5', badge: 'https://img.sofascore.com/api/v1/team/36534/image', country: 'MEX', type: TeamType.CLUB, tags: [] },
}));
