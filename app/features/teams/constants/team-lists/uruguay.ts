import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const URUGUAY_TEAM_LIST = mapToTeamList(defineTeams({ country: Country.URUGUAY, type: TeamType.CLUB }, {
  'Peñarol': { id: 'URY-1', badge: 'https://img.sofascore.com/api/v1/team/3227/image', tags: [] },
  'Danubio': { id: 'URY-2', badge: 'https://img.sofascore.com/api/v1/team/3228/image', tags: [] },
  'Defensor': { id: 'URY-3', badge: 'https://img.sofascore.com/api/v1/team/3229/image', tags: [] },
  'Nacional': { id: 'URY-4', badge: 'https://img.sofascore.com/api/v1/team/3230/image', tags: [] },
  'Liverpool UY': { id: 'URY-5', badge: 'https://img.sofascore.com/api/v1/team/6879/image', tags: [] },
  'Cerro Largo': { id: 'URY-6', badge: 'https://img.sofascore.com/api/v1/team/25009/image', tags: [] },
  'Racing UY': { id: 'URY-7', badge: 'https://img.sofascore.com/api/v1/team/25010/image', tags: [] },
  'Boston River': { id: 'URY-8', badge: 'https://img.sofascore.com/api/v1/team/174970/image', tags: [] },
  'Deportivo Maldonado': { id: 'URY-9', badge: 'https://img.sofascore.com/api/v1/team/3234/image', tags: [] },
  'Albion': { id: 'URY-10', badge: 'https://img.sofascore.com/api/v1/team/278204/image', tags: [] },
  'Central Español': { id: 'URY-11', badge: 'https://img.sofascore.com/api/v1/team/3232/image', tags: [] },
  'Torque': { id: 'URY-12', badge: 'https://img.sofascore.com/api/v1/team/174972/image', tags: [] },
  'Wanderers': { id: 'URY-13', badge: 'https://img.sofascore.com/api/v1/team/3240/image', tags: [] },
  'Juventud': { id: 'URY-14', badge: 'https://img.sofascore.com/api/v1/team/3224/image', tags: [] },
  'Progreso': { id: 'URY-15', badge: 'https://img.sofascore.com/api/v1/team/3238/image', tags: [] },
  'Cerro': { id: 'URY-16', badge: 'https://img.sofascore.com/api/v1/team/22011/image', tags: [] },
}));
