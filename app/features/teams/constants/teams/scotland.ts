import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const SCOTLAND_TEAM_LIST = mapToTeamList(defineTeams({ country: Country.SCOTLAND, type: TeamType.CLUB }, {
  'Celtic': { id: 'SCT-1', badge: 'https://img.sofascore.com/api/v1/team/2352/image', tags: [] },
  'Hearts': { id: 'SCT-2', badge: 'https://img.sofascore.com/api/v1/team/2353/image', tags: [] },
  'Rangers': { id: 'SCT-3', badge: 'https://img.sofascore.com/api/v1/team/2351/image', tags: [] },
  'Motherwell': { id: 'SCT-4', badge: 'https://img.sofascore.com/api/v1/team/2346/image', tags: [] },
  'Hibernian': { id: 'SCT-5', badge: 'https://img.sofascore.com/api/v1/team/2354/image', tags: [] },
  'Falkirk': { id: 'SCT-6', badge: 'https://img.sofascore.com/api/v1/team/2363/image', tags: [] },
  'Dundee Utd': { id: 'SCT-7', badge: 'https://img.sofascore.com/api/v1/team/2349/image', tags: [] },
  'Aberdeen': { id: 'SCT-8', badge: 'https://img.sofascore.com/api/v1/team/2355/image', tags: [] },
  'Dundee': { id: 'SCT-9', badge: 'https://img.sofascore.com/api/v1/team/2357/image', tags: [] },
  'St Mirren': { id: 'SCT-10', badge: 'https://img.sofascore.com/api/v1/team/2359/image', tags: [] },
  'Kilmarnock': { id: 'SCT-11', badge: 'https://img.sofascore.com/api/v1/team/2347/image', tags: [] },
  'Livingston': { id: 'SCT-12', badge: 'https://img.sofascore.com/api/v1/team/2356/image', tags: [] },
}));
