import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const CZECH_REPUBLIC_TEAM_LIST = mapToTeamList(defineTeams({ country: 'CZE', type: TeamType.CLUB }, {
  'Slavia Praha': { id: 'CZE-1', badge: 'https://img.sofascore.com/api/v1/team/2216/image', tags: [] },
  'Sparta Praha': { id: 'CZE-2', badge: 'https://img.sofascore.com/api/v1/team/2218/image', tags: [] },
  'Viktoria Plzeň': { id: 'CZE-3', badge: 'https://img.sofascore.com/api/v1/team/4502/image', tags: [] },
}));
