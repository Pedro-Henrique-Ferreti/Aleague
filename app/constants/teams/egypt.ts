import { defineTeams, mapToTeamList } from '~/helpers/team';

export const EGYPT_TEAM_LIST = mapToTeamList(defineTeams({
  'Al Ahly': { id: 'EGY-1', badge: 'https://img.sofascore.com/api/v1/team/6910/image', country: 'EGY', type: TeamType.CLUB, tags: [] },
  'Pyramids': { id: 'EGY-2', badge: 'https://img.sofascore.com/api/v1/team/175002/image', country: 'EGY', type: TeamType.CLUB, tags: [] },
}));
