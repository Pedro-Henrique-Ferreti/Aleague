import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const NORWAY_TEAM_LIST = mapToTeamList(defineTeams({ country: Country.NORWAY, type: TeamType.CLUB }, {
  'Tromsø': { id: 'NOR-1', badge: 'https://img.sofascore.com/api/v1/team/660/image', tags: [] },
  'Viking': { id: 'NOR-2', badge: 'https://img.sofascore.com/api/v1/team/1164/image', tags: [] },
  'Lillestrøm': { id: 'NOR-3', badge: 'https://img.sofascore.com/api/v1/team/664/image', tags: [] },
  'Bodø/Glimt': { id: 'NOR-4', badge: 'https://img.sofascore.com/api/v1/team/656/image', tags: [] },
  'Molde': { id: 'NOR-5', badge: 'https://img.sofascore.com/api/v1/team/661/image', tags: [] },
  'HamKam': { id: 'NOR-6', badge: 'https://img.sofascore.com/api/v1/team/666/image', tags: [] },
  'Brann': { id: 'NOR-7', badge: 'https://img.sofascore.com/api/v1/team/1159/image', tags: [] },
  'Sandefjord': { id: 'NOR-8', badge: 'https://img.sofascore.com/api/v1/team/676/image', tags: [] },
  'Kristiansund': { id: 'NOR-9', badge: 'https://img.sofascore.com/api/v1/team/957/image', tags: [] },
  'KFUM Oslo': { id: 'NOR-10', badge: 'https://img.sofascore.com/api/v1/team/786/image', tags: [] },
  'Vålerenga': { id: 'NOR-11', badge: 'https://img.sofascore.com/api/v1/team/1165/image', tags: [] },
  'Fredrikstad': { id: 'NOR-12', badge: 'https://img.sofascore.com/api/v1/team/687/image', tags: [] },
  'Sarpsborg 08': { id: 'NOR-13', badge: 'https://img.sofascore.com/api/v1/team/822/image', tags: [] },
  'Rosenborg': { id: 'NOR-14', badge: 'https://img.sofascore.com/api/v1/team/1161/image', tags: [] },
  'IK Start': { id: 'NOR-15', badge: 'https://img.sofascore.com/api/v1/team/667/image', tags: [] },
  'Aalesund': { id: 'NOR-16', badge: 'https://img.sofascore.com/api/v1/team/677/image', tags: [] },
}));
