import { defineTeams, mapToTeamList } from '~/helpers/team-definition';

export const KOREA_TEAM_LIST = mapToTeamList(defineTeams({
  'Daejeon Hana': { id: 'KOR-1', badge: 'https://img.sofascore.com/api/v1/team/7645/image', country: 'KOR', type: TeamType.CLUB, tags: [] },
  'FC Seoul': { id: 'KOR-2', badge: 'https://img.sofascore.com/api/v1/team/7646/image', country: 'KOR', type: TeamType.CLUB, tags: [] },
  'Ulsan HD': { id: 'KOR-3', badge: 'https://img.sofascore.com/api/v1/team/7653/image', country: 'KOR', type: TeamType.CLUB, tags: [] },
  'Jeonbuk': { id: 'KOR-4', badge: 'https://img.sofascore.com/api/v1/team/6908/image', country: 'KOR', type: TeamType.CLUB, tags: [] },
  'Jeju SK': { id: 'KOR-5', badge: 'https://img.sofascore.com/api/v1/team/7649/image', country: 'KOR', type: TeamType.CLUB, tags: [] },
  'Gangwon': { id: 'KOR-6', badge: 'https://img.sofascore.com/api/v1/team/34220/image', country: 'KOR', type: TeamType.CLUB, tags: [] },
  'Pohang Steelers': { id: 'KOR-7', badge: 'https://img.sofascore.com/api/v1/team/7650/image', country: 'KOR', type: TeamType.CLUB, tags: [] },
  'FC Anyang': { id: 'KOR-8', badge: 'https://img.sofascore.com/api/v1/team/32675/image', country: 'KOR', type: TeamType.CLUB, tags: [] },
  'Incheon Utd': { id: 'KOR-9', badge: 'https://img.sofascore.com/api/v1/team/7648/image', country: 'KOR', type: TeamType.CLUB, tags: [] },
  'Gimcheon': { id: 'KOR-10', badge: 'https://img.sofascore.com/api/v1/team/7647/image', country: 'KOR', type: TeamType.CLUB, tags: [] },
  'Bucheon': { id: 'KOR-11', badge: 'https://img.sofascore.com/api/v1/team/92539/image', country: 'KOR', type: TeamType.CLUB, tags: [] },
  'Gwangju': { id: 'KOR-12', badge: 'https://img.sofascore.com/api/v1/team/48912/image', country: 'KOR', type: TeamType.CLUB, tags: [] },
}));
