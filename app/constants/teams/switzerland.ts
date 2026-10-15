import { defineTeams, mapToTeamList } from '~/helpers/team';

export const SWITZERLAND_TEAM_LIST = mapToTeamList(defineTeams({
  'Young Boys': { id: 'CHE-1', badge: 'https://img.sofascore.com/api/v1/team/2445/image', country: 'CHE', type: TeamType.CLUB, tags: [] },
  'Lausanne': { id: 'CHE-2', badge: 'https://img.sofascore.com/api/v1/team/2446/image', country: 'CHE', type: TeamType.CLUB, tags: [] },
  'Grasshoppers': { id: 'CHE-3', badge: 'https://img.sofascore.com/api/v1/team/2449/image', country: 'CHE', type: TeamType.CLUB, tags: [] },
  'Zürich': { id: 'CHE-4', badge: 'https://img.sofascore.com/api/v1/team/2450/image', country: 'CHE', type: TeamType.CLUB, tags: [] },
  'Sion': { id: 'CHE-5', badge: 'https://img.sofascore.com/api/v1/team/2452/image', country: 'CHE', type: TeamType.CLUB, tags: [] },
  'Basel': { id: 'CHE-6', badge: 'https://img.sofascore.com/api/v1/team/2501/image', country: 'CHE', type: TeamType.CLUB, tags: [] },
  'Thun': { id: 'CHE-7', badge: 'https://img.sofascore.com/api/v1/team/2454/image', country: 'CHE', type: TeamType.CLUB, tags: [] },
  'St. Gallen': { id: 'CHE-8', badge: 'https://img.sofascore.com/api/v1/team/2442/image', country: 'CHE', type: TeamType.CLUB, tags: [] },
  'Lugano': { id: 'CHE-9', badge: 'https://img.sofascore.com/api/v1/team/2443/image', country: 'CHE', type: TeamType.CLUB, tags: [] },
  'Luzern': { id: 'CHE-10', badge: 'https://img.sofascore.com/api/v1/team/2453/image', country: 'CHE', type: TeamType.CLUB, tags: [] },
  'Servette': { id: 'CHE-11', badge: 'https://img.sofascore.com/api/v1/team/2448/image', country: 'CHE', type: TeamType.CLUB, tags: [] },
  'Winterthur': { id: 'CHE-12', badge: 'https://img.sofascore.com/api/v1/team/2458/image', country: 'CHE', type: TeamType.CLUB, tags: [] },
}));
