import { defineTeams, mapToTeamList } from '~/helpers/team';

export const GREECE_TEAM_LIST = mapToTeamList(defineTeams({
  'Olympiacos': { id: 'GRC-1', badge: 'https://img.sofascore.com/api/v1/team/3245/image', country: 'GRC', type: TeamType.CLUB, tags: [] },
  'Panathinaikos': { id: 'GRC-2', badge: 'https://img.sofascore.com/api/v1/team/3248/image', country: 'GRC', type: TeamType.CLUB, tags: [] },
  'AEK Athens': { id: 'GRC-3', badge: 'https://img.sofascore.com/api/v1/team/3250/image', country: 'GRC', type: TeamType.CLUB, tags: [] },
  'PAOK': { id: 'GRC-4', badge: 'https://img.sofascore.com/api/v1/team/3251/image', country: 'GRC', type: TeamType.CLUB, tags: [] },
  'Levadiakos': { id: 'GRC-5', badge: 'https://img.sofascore.com/api/v1/team/5063/image', country: 'GRC', type: TeamType.CLUB, tags: [] },
  'OFI Crete': { id: 'GRC-6', badge: 'https://img.sofascore.com/api/v1/team/3241/image', country: 'GRC', type: TeamType.CLUB, tags: [] },
  'Volos': { id: 'GRC-7', badge: 'https://img.sofascore.com/api/v1/team/267459/image', country: 'GRC', type: TeamType.CLUB, tags: [] },
  'Aris': { id: 'GRC-8', badge: 'https://img.sofascore.com/api/v1/team/3252/image', country: 'GRC', type: TeamType.CLUB, tags: [] },
  'Atromitos': { id: 'GRC-9', badge: 'https://img.sofascore.com/api/v1/team/5062/image', country: 'GRC', type: TeamType.CLUB, tags: [] },
  'Kifisia': { id: 'GRC-10', badge: 'https://img.sofascore.com/api/v1/team/120224/image', country: 'GRC', type: TeamType.CLUB, tags: [] },
  'Panetolikos': { id: 'GRC-11', badge: 'https://img.sofascore.com/api/v1/team/7004/image', country: 'GRC', type: TeamType.CLUB, tags: [] },
  'AEL Novibet': { id: 'GRC-12', badge: 'https://img.sofascore.com/api/v1/team/3265/image', country: 'GRC', type: TeamType.CLUB, tags: [] },
  'Panserraikos': { id: 'GRC-13', badge: 'https://img.sofascore.com/api/v1/team/6347/image', country: 'GRC', type: TeamType.CLUB, tags: [] },
  'Asteras': { id: 'GRC-14', badge: 'https://img.sofascore.com/api/v1/team/6342/image', country: 'GRC', type: TeamType.CLUB, tags: [] },
}));
