import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const KOREA_TEAM_LIST = mapToTeamList(defineTeams({ country: 'KOR', type: TeamType.CLUB }, {
  'Daejeon Hana': { id: 'KOR-1', badge: 'https://img.sofascore.com/api/v1/team/7645/image', tags: [] },
  'FC Seoul': { id: 'KOR-2', badge: 'https://img.sofascore.com/api/v1/team/7646/image', tags: [] },
  'Ulsan HD': { id: 'KOR-3', badge: 'https://img.sofascore.com/api/v1/team/7653/image', tags: [] },
  'Jeonbuk': { id: 'KOR-4', badge: 'https://img.sofascore.com/api/v1/team/6908/image', tags: [] },
  'Jeju SK': { id: 'KOR-5', badge: 'https://img.sofascore.com/api/v1/team/7649/image', tags: [] },
  'Gangwon': { id: 'KOR-6', badge: 'https://img.sofascore.com/api/v1/team/34220/image', tags: [] },
  'Pohang Steelers': { id: 'KOR-7', badge: 'https://img.sofascore.com/api/v1/team/7650/image', tags: [] },
  'FC Anyang': { id: 'KOR-8', badge: 'https://img.sofascore.com/api/v1/team/32675/image', tags: [] },
  'Incheon Utd': { id: 'KOR-9', badge: 'https://img.sofascore.com/api/v1/team/7648/image', tags: [] },
  'Gimcheon': { id: 'KOR-10', badge: 'https://img.sofascore.com/api/v1/team/7647/image', tags: [] },
  'Bucheon': { id: 'KOR-11', badge: 'https://img.sofascore.com/api/v1/team/92539/image', tags: [] },
  'Gwangju': { id: 'KOR-12', badge: 'https://img.sofascore.com/api/v1/team/48912/image', tags: [] },
}));
