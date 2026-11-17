import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const CHINA_TEAM_LIST = mapToTeamList(defineTeams({ country: Country.CHINA, type: TeamType.CLUB }, {
  'Beijing Guoan': { id: 'CHN-1', badge: 'https://img.sofascore.com/api/v1/team/3376/image', tags: [] },
  'Chengdu Rongcheng': { id: 'CHN-2', badge: 'https://img.sofascore.com/api/v1/team/221241/image', tags: [] },
  'Tongliang Long': { id: 'CHN-3', badge: 'https://img.sofascore.com/api/v1/team/474989/image', tags: [] },
  'Dalian Yingbo': { id: 'CHN-4', badge: 'https://img.sofascore.com/api/v1/team/474992/image', tags: [] },
  'Yukun': { id: 'CHN-5', badge: 'https://img.sofascore.com/api/v1/team/474991/image', tags: [] },
  'Shandong Taishan': { id: 'CHN-6', badge: 'https://img.sofascore.com/api/v1/team/3371/image', tags: [] },
  'Shenhua': { id: 'CHN-7', badge: 'https://img.sofascore.com/api/v1/team/3373/image', tags: [] },
  'Shenzhen': { id: 'CHN-8', badge: 'https://img.sofascore.com/api/v1/team/281331/image', tags: [] },
  'Zhejiang': { id: 'CHN-9', badge: 'https://img.sofascore.com/api/v1/team/34697/image', tags: [] },
  'Qingdao West Coast': { id: 'CHN-10', badge: 'https://img.sofascore.com/api/v1/team/369532/image', tags: [] },
  'Hainiu': { id: 'CHN-11', badge: 'https://img.sofascore.com/api/v1/team/34695/image', tags: [] },
  'Tieren': { id: 'CHN-12', badge: 'https://img.sofascore.com/api/v1/team/221240/image', tags: [] },
  'Shanghai Port': { id: 'CHN-13', badge: 'https://img.sofascore.com/api/v1/team/41537/image', tags: [] },
  'Henan': { id: 'CHN-14', badge: 'https://img.sofascore.com/api/v1/team/34692/image', tags: [] },
  'Three Towns': { id: 'CHN-15', badge: 'https://img.sofascore.com/api/v1/team/295152/image', tags: [] },
  'Jinmen Tiger': { id: 'CHN-16', badge: 'https://img.sofascore.com/api/v1/team/3367/image', tags: [] },
}));
