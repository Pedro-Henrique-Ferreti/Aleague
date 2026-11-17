import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const SWITZERLAND_TEAM_LIST = mapToTeamList(defineTeams({ country: 'CHE', type: TeamType.CLUB }, {
  'Young Boys': { id: 'CHE-1', badge: 'https://img.sofascore.com/api/v1/team/2445/image', tags: [] },
  'Lausanne': { id: 'CHE-2', badge: 'https://img.sofascore.com/api/v1/team/2446/image', tags: [] },
  'Grasshoppers': { id: 'CHE-3', badge: 'https://img.sofascore.com/api/v1/team/2449/image', tags: [] },
  'Zürich': { id: 'CHE-4', badge: 'https://img.sofascore.com/api/v1/team/2450/image', tags: [] },
  'Sion': { id: 'CHE-5', badge: 'https://img.sofascore.com/api/v1/team/2452/image', tags: [] },
  'Basel': { id: 'CHE-6', badge: 'https://img.sofascore.com/api/v1/team/2501/image', tags: [] },
  'Thun': { id: 'CHE-7', badge: 'https://img.sofascore.com/api/v1/team/2454/image', tags: [] },
  'St. Gallen': { id: 'CHE-8', badge: 'https://img.sofascore.com/api/v1/team/2442/image', tags: [] },
  'Lugano': { id: 'CHE-9', badge: 'https://img.sofascore.com/api/v1/team/2443/image', tags: [] },
  'Luzern': { id: 'CHE-10', badge: 'https://img.sofascore.com/api/v1/team/2453/image', tags: [] },
  'Servette': { id: 'CHE-11', badge: 'https://img.sofascore.com/api/v1/team/2448/image', tags: [] },
  'Winterthur': { id: 'CHE-12', badge: 'https://img.sofascore.com/api/v1/team/2458/image', tags: [] },
}));
