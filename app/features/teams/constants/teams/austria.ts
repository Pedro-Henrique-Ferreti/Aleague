import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const AUSTRIA_TEAM_LIST = mapToTeamList(defineTeams({ country: Country.AUSTRIA, type: TeamType.CLUB }, {
  'RB Salzburg': { id: 'AUT-1', badge: 'https://img.sofascore.com/api/v1/team/2046/image', tags: [] },
  'Sturm Graz': { id: 'AUT-2', badge: 'https://img.sofascore.com/api/v1/team/2051/image', tags: [] },
  'LASK': { id: 'AUT-3', badge: 'https://img.sofascore.com/api/v1/team/2058/image', tags: [] },
  'BW Linz': { id: 'AUT-4', badge: 'https://img.sofascore.com/api/v1/team/2113/image', tags: [] },
  'Austria Wien': { id: 'AUT-5', badge: 'https://img.sofascore.com/api/v1/team/2203/image', tags: [] },
  'Rapid': { id: 'AUT-6', badge: 'https://img.sofascore.com/api/v1/team/2055/image', tags: [] },
  'Hartberg': { id: 'AUT-7', badge: 'https://img.sofascore.com/api/v1/team/2075/image', tags: [] },
  'Tirol': { id: 'AUT-8', badge: 'https://img.sofascore.com/api/v1/team/5405/image', tags: [] },
  'Altach': { id: 'AUT-9', badge: 'https://img.sofascore.com/api/v1/team/4856/image', tags: [] },
  'Ried': { id: 'AUT-10', badge: 'https://img.sofascore.com/api/v1/team/2049/image', tags: [] },
  'Wolfsberger AC': { id: 'AUT-11', badge: 'https://img.sofascore.com/api/v1/team/2076/image', tags: [] },
  'Grazer AK': { id: 'AUT-12', badge: 'https://img.sofascore.com/api/v1/team/2052/image', tags: [] },
}));
