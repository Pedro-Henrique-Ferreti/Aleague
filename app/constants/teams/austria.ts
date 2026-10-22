import { defineTeams, mapToTeamList } from '~/helpers/team-definition';

export const AUSTRIA_TEAM_LIST = mapToTeamList(defineTeams({
  'RB Salzburg': { id: 'AUT-1', badge: 'https://img.sofascore.com/api/v1/team/2046/image', country: 'AUT', type: TeamType.CLUB, tags: [] },
  'Sturm Graz': { id: 'AUT-2', badge: 'https://img.sofascore.com/api/v1/team/2051/image', country: 'AUT', type: TeamType.CLUB, tags: [] },
  'LASK': { id: 'AUT-3', badge: 'https://img.sofascore.com/api/v1/team/2058/image', country: 'AUT', type: TeamType.CLUB, tags: [] },
  'BW Linz': { id: 'AUT-4', badge: 'https://img.sofascore.com/api/v1/team/2113/image', country: 'AUT', type: TeamType.CLUB, tags: [] },
  'Austria Wien': { id: 'AUT-5', badge: 'https://img.sofascore.com/api/v1/team/2203/image', country: 'AUT', type: TeamType.CLUB, tags: [] },
  'Rapid': { id: 'AUT-6', badge: 'https://img.sofascore.com/api/v1/team/2055/image', country: 'AUT', type: TeamType.CLUB, tags: [] },
  'Hartberg': { id: 'AUT-7', badge: 'https://img.sofascore.com/api/v1/team/2075/image', country: 'AUT', type: TeamType.CLUB, tags: [] },
  'Tirol': { id: 'AUT-8', badge: 'https://img.sofascore.com/api/v1/team/5405/image', country: 'AUT', type: TeamType.CLUB, tags: [] },
  'Altach': { id: 'AUT-9', badge: 'https://img.sofascore.com/api/v1/team/4856/image', country: 'AUT', type: TeamType.CLUB, tags: [] },
  'Ried': { id: 'AUT-10', badge: 'https://img.sofascore.com/api/v1/team/2049/image', country: 'AUT', type: TeamType.CLUB, tags: [] },
  'Wolfsberger AC': { id: 'AUT-11', badge: 'https://img.sofascore.com/api/v1/team/2076/image', country: 'AUT', type: TeamType.CLUB, tags: [] },
  'Grazer AK': { id: 'AUT-12', badge: 'https://img.sofascore.com/api/v1/team/2052/image', country: 'AUT', type: TeamType.CLUB, tags: [] },
}));
