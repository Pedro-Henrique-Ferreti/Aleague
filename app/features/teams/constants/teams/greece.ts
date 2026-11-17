import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const GREECE_TEAM_LIST = mapToTeamList(defineTeams({ country: 'GRC', type: TeamType.CLUB }, {
  'Olympiacos': { id: 'GRC-1', badge: 'https://img.sofascore.com/api/v1/team/3245/image', tags: [] },
  'Panathinaikos': { id: 'GRC-2', badge: 'https://img.sofascore.com/api/v1/team/3248/image', tags: [] },
  'AEK Athens': { id: 'GRC-3', badge: 'https://img.sofascore.com/api/v1/team/3250/image', tags: [] },
  'PAOK': { id: 'GRC-4', badge: 'https://img.sofascore.com/api/v1/team/3251/image', tags: [] },
  'Levadiakos': { id: 'GRC-5', badge: 'https://img.sofascore.com/api/v1/team/5063/image', tags: [] },
  'OFI Crete': { id: 'GRC-6', badge: 'https://img.sofascore.com/api/v1/team/3241/image', tags: [] },
  'Volos': { id: 'GRC-7', badge: 'https://img.sofascore.com/api/v1/team/267459/image', tags: [] },
  'Aris': { id: 'GRC-8', badge: 'https://img.sofascore.com/api/v1/team/3252/image', tags: [] },
  'Atromitos': { id: 'GRC-9', badge: 'https://img.sofascore.com/api/v1/team/5062/image', tags: [] },
  'Kifisia': { id: 'GRC-10', badge: 'https://img.sofascore.com/api/v1/team/120224/image', tags: [] },
  'Panetolikos': { id: 'GRC-11', badge: 'https://img.sofascore.com/api/v1/team/7004/image', tags: [] },
  'AEL Novibet': { id: 'GRC-12', badge: 'https://img.sofascore.com/api/v1/team/3265/image', tags: [] },
  'Panserraikos': { id: 'GRC-13', badge: 'https://img.sofascore.com/api/v1/team/6347/image', tags: [] },
  'Asteras': { id: 'GRC-14', badge: 'https://img.sofascore.com/api/v1/team/6342/image', tags: [] },
}));
