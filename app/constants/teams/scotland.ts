import { defineTeams, mapToTeamList } from '~/helpers/team-definition';

export const SCOTLAND_TEAM_LIST = mapToTeamList(defineTeams({
  'Celtic': { id: 'SCT-1', badge: 'https://img.sofascore.com/api/v1/team/2352/image', country: 'SCT', type: TeamType.CLUB, tags: [] },
  'Hearts': { id: 'SCT-2', badge: 'https://img.sofascore.com/api/v1/team/2353/image', country: 'SCT', type: TeamType.CLUB, tags: [] },
  'Rangers': { id: 'SCT-3', badge: 'https://img.sofascore.com/api/v1/team/2351/image', country: 'SCT', type: TeamType.CLUB, tags: [] },
  'Motherwell': { id: 'SCT-4', badge: 'https://img.sofascore.com/api/v1/team/2346/image', country: 'SCT', type: TeamType.CLUB, tags: [] },
  'Hibernian': { id: 'SCT-5', badge: 'https://img.sofascore.com/api/v1/team/2354/image', country: 'SCT', type: TeamType.CLUB, tags: [] },
  'Falkirk': { id: 'SCT-6', badge: 'https://img.sofascore.com/api/v1/team/2363/image', country: 'SCT', type: TeamType.CLUB, tags: [] },
  'Dundee Utd': { id: 'SCT-7', badge: 'https://img.sofascore.com/api/v1/team/2349/image', country: 'SCT', type: TeamType.CLUB, tags: [] },
  'Aberdeen': { id: 'SCT-8', badge: 'https://img.sofascore.com/api/v1/team/2355/image', country: 'SCT', type: TeamType.CLUB, tags: [] },
  'Dundee': { id: 'SCT-9', badge: 'https://img.sofascore.com/api/v1/team/2357/image', country: 'SCT', type: TeamType.CLUB, tags: [] },
  'St Mirren': { id: 'SCT-10', badge: 'https://img.sofascore.com/api/v1/team/2359/image', country: 'SCT', type: TeamType.CLUB, tags: [] },
  'Kilmarnock': { id: 'SCT-11', badge: 'https://img.sofascore.com/api/v1/team/2347/image', country: 'SCT', type: TeamType.CLUB, tags: [] },
  'Livingston': { id: 'SCT-12', badge: 'https://img.sofascore.com/api/v1/team/2356/image', country: 'SCT', type: TeamType.CLUB, tags: [] },
}));
