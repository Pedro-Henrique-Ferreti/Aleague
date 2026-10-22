import { defineTeams, mapToTeamList } from '~/helpers/team-definition';

export const NORWAY_TEAM_LIST = mapToTeamList(defineTeams({
  'Tromsø': { id: 'NOR-1', badge: 'https://img.sofascore.com/api/v1/team/660/image', country: 'NOR', type: TeamType.CLUB, tags: [] },
  'Viking': { id: 'NOR-2', badge: 'https://img.sofascore.com/api/v1/team/1164/image', country: 'NOR', type: TeamType.CLUB, tags: [] },
  'Lillestrøm': { id: 'NOR-3', badge: 'https://img.sofascore.com/api/v1/team/664/image', country: 'NOR', type: TeamType.CLUB, tags: [] },
  'Bodø/Glimt': { id: 'NOR-4', badge: 'https://img.sofascore.com/api/v1/team/656/image', country: 'NOR', type: TeamType.CLUB, tags: [] },
  'Molde': { id: 'NOR-5', badge: 'https://img.sofascore.com/api/v1/team/661/image', country: 'NOR', type: TeamType.CLUB, tags: [] },
  'HamKam': { id: 'NOR-6', badge: 'https://img.sofascore.com/api/v1/team/666/image', country: 'NOR', type: TeamType.CLUB, tags: [] },
  'Brann': { id: 'NOR-7', badge: 'https://img.sofascore.com/api/v1/team/1159/image', country: 'NOR', type: TeamType.CLUB, tags: [] },
  'Sandefjord': { id: 'NOR-8', badge: 'https://img.sofascore.com/api/v1/team/676/image', country: 'NOR', type: TeamType.CLUB, tags: [] },
  'Kristiansund': { id: 'NOR-9', badge: 'https://img.sofascore.com/api/v1/team/957/image', country: 'NOR', type: TeamType.CLUB, tags: [] },
  'KFUM Oslo': { id: 'NOR-10', badge: 'https://img.sofascore.com/api/v1/team/786/image', country: 'NOR', type: TeamType.CLUB, tags: [] },
  'Vålerenga': { id: 'NOR-11', badge: 'https://img.sofascore.com/api/v1/team/1165/image', country: 'NOR', type: TeamType.CLUB, tags: [] },
  'Fredrikstad': { id: 'NOR-12', badge: 'https://img.sofascore.com/api/v1/team/687/image', country: 'NOR', type: TeamType.CLUB, tags: [] },
  'Sarpsborg 08': { id: 'NOR-13', badge: 'https://img.sofascore.com/api/v1/team/822/image', country: 'NOR', type: TeamType.CLUB, tags: [] },
  'Rosenborg': { id: 'NOR-14', badge: 'https://img.sofascore.com/api/v1/team/1161/image', country: 'NOR', type: TeamType.CLUB, tags: [] },
  'IK Start': { id: 'NOR-15', badge: 'https://img.sofascore.com/api/v1/team/667/image', country: 'NOR', type: TeamType.CLUB, tags: [] },
  'Aalesund': { id: 'NOR-16', badge: 'https://img.sofascore.com/api/v1/team/677/image', country: 'NOR', type: TeamType.CLUB, tags: [] },
}));
