import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const PORTUGAL_TEAM_LIST = mapToTeamList(defineTeams({ country: Country.PORTUGAL, type: TeamType.CLUB }, {
  'Boavista': { id: 'PRT-1', badge: 'https://img.sofascore.com/api/v1/team/2995/image', tags: [] },
  'Farense': { id: 'PRT-2', badge: 'https://img.sofascore.com/api/v1/team/2998/image', tags: [] },
  'Braga': { id: 'PRT-3', badge: 'https://img.sofascore.com/api/v1/team/2999/image', tags: [] },
  'Sporting': { id: 'PRT-4', badge: 'https://img.sofascore.com/api/v1/team/3001/image', tags: [] },
  'Porto': { id: 'PRT-5', badge: 'https://img.sofascore.com/api/v1/team/3002/image', tags: [] },
  'Benfica': { id: 'PRT-6', badge: 'https://img.sofascore.com/api/v1/team/3006/image', tags: [] },
  'Santa Clara': { id: 'PRT-7', badge: 'https://img.sofascore.com/api/v1/team/3011/image', tags: [] },
  'Estrela Amadora': { id: 'PRT-8', badge: 'https://img.sofascore.com/api/v1/team/3035/image', tags: [] },
  'Rio Ave': { id: 'PRT-9', badge: 'https://img.sofascore.com/api/v1/team/3036/image', tags: [] },
  'Estoril Praia': { id: 'PRT-10', badge: 'https://img.sofascore.com/api/v1/team/4500/image', tags: [] },
  'Casa Pia': { id: 'PRT-11', badge: 'https://img.sofascore.com/api/v1/team/36365/image', tags: [] },
  'Famalicão': { id: 'PRT-12', badge: 'https://img.sofascore.com/api/v1/team/49531/image', tags: [] },
  'Gil Vicente': { id: 'PRT-13', badge: 'https://img.sofascore.com/api/v1/team/3010/image', tags: [] },
  'Moreirense': { id: 'PRT-14', badge: 'https://img.sofascore.com/api/v1/team/3014/image', tags: [] },
  'Vitória': { id: 'PRT-15', badge: 'https://img.sofascore.com/api/v1/team/3009/image', tags: [] },
  'Alverca': { id: 'PRT-16', badge: 'https://img.sofascore.com/api/v1/team/190328/image', tags: [] },
  'Arouca': { id: 'PRT-17', badge: 'https://img.sofascore.com/api/v1/team/25777/image', tags: [] },
  'Nacional': { id: 'PRT-18', badge: 'https://img.sofascore.com/api/v1/team/3013/image', tags: [] },
  'Tondela': { id: 'PRT-19', badge: 'https://img.sofascore.com/api/v1/team/38396/image', tags: [] },
  'AVS': { id: 'PRT-20', badge: 'https://img.sofascore.com/api/v1/team/483088/image', tags: [] },
}));
