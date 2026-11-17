import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const JAPAN_TEAM_LIST = mapToTeamList(defineTeams({ country: Country.JAPAN, type: TeamType.CLUB }, {
  'Kashima Antlers': { id: 'JPN-1', badge: 'https://img.sofascore.com/api/v1/team/3134/image', tags: [] },
  'Urawa Reds': { id: 'JPN-2', badge: 'https://img.sofascore.com/api/v1/team/3145/image', tags: [] },
  'Tokyo': { id: 'JPN-3', badge: 'https://img.sofascore.com/api/v1/team/3147/image', tags: [] },
  'Machida Zelvia': { id: 'JPN-4', badge: 'https://img.sofascore.com/api/v1/team/44409/image', tags: [] },
  'Tokyo Verdy': { id: 'JPN-5', badge: 'https://img.sofascore.com/api/v1/team/3139/image', tags: [] },
  'Kawasaki': { id: 'JPN-6', badge: 'https://img.sofascore.com/api/v1/team/5127/image', tags: [] },
  'Mito Hollyhock': { id: 'JPN-7', badge: 'https://img.sofascore.com/api/v1/team/21901/image', tags: [] },
  'Yokohama FM': { id: 'JPN-8', badge: 'https://img.sofascore.com/api/v1/team/3137/image', tags: [] },
  'Chiba': { id: 'JPN-9', badge: 'https://img.sofascore.com/api/v1/team/3144/image', tags: [] },
  'Kashiwa': { id: 'JPN-10', badge: 'https://img.sofascore.com/api/v1/team/3140/image', tags: [] },
  'Nagoya': { id: 'JPN-11', badge: 'https://img.sofascore.com/api/v1/team/3136/image', tags: [] },
  'Vissel Kobe': { id: 'JPN-12', badge: 'https://img.sofascore.com/api/v1/team/3146/image', tags: [] },
  'Gamba Osaka': { id: 'JPN-13', badge: 'https://img.sofascore.com/api/v1/team/3138/image', tags: [] },
  'Shimizu': { id: 'JPN-14', badge: 'https://img.sofascore.com/api/v1/team/3133/image', tags: [] },
  'Cerezo Osaka': { id: 'JPN-15', badge: 'https://img.sofascore.com/api/v1/team/3141/image', tags: [] },
  'Sanfrecce': { id: 'JPN-16', badge: 'https://img.sofascore.com/api/v1/team/3135/image', tags: [] },
  'Fukuoka': { id: 'JPN-17', badge: 'https://img.sofascore.com/api/v1/team/3143/image', tags: [] },
  'Kyoto Sanga': { id: 'JPN-18', badge: 'https://img.sofascore.com/api/v1/team/3149/image', tags: [] },
  'Okayama': { id: 'JPN-19', badge: 'https://img.sofascore.com/api/v1/team/34034/image', tags: [] },
  'Nagasaki': { id: 'JPN-20', badge: 'https://img.sofascore.com/api/v1/team/38154/image', tags: [] },
}));
