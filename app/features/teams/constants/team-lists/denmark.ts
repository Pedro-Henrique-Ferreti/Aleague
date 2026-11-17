import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const DENMARK_TEAM_LIST = mapToTeamList(defineTeams({ country: Country.DENMARK, type: TeamType.CLUB }, {
  'Midtjylland': { id: 'DNK-1', badge: 'https://img.sofascore.com/api/v1/team/1289/image', tags: [] },
  'AGF': { id: 'DNK-2', badge: 'https://img.sofascore.com/api/v1/team/1291/image', tags: [] },
  'Sønderjyske': { id: 'DNK-3', badge: 'https://img.sofascore.com/api/v1/team/1295/image', tags: [] },
  'Brøndby': { id: 'DNK-4', badge: 'https://img.sofascore.com/api/v1/team/1281/image', tags: [] },
  'Viborg': { id: 'DNK-5', badge: 'https://img.sofascore.com/api/v1/team/1288/image', tags: [] },
  'Nordsjælland': { id: 'DNK-6', badge: 'https://img.sofascore.com/api/v1/team/1292/image', tags: [] },
  'København': { id: 'DNK-7', badge: 'https://img.sofascore.com/api/v1/team/1284/image', tags: [] },
  'Odense Boldklub': { id: 'DNK-8', badge: 'https://img.sofascore.com/api/v1/team/1286/image', tags: [] },
  'Randers': { id: 'DNK-9', badge: 'https://img.sofascore.com/api/v1/team/1301/image', tags: [] },
  'FC Fredericia': { id: 'DNK-10', badge: 'https://img.sofascore.com/api/v1/team/1302/image', tags: [] },
  'Silkeborg': { id: 'DNK-11', badge: 'https://img.sofascore.com/api/v1/team/1285/image', tags: [] },
  'Vejle': { id: 'DNK-12', badge: 'https://img.sofascore.com/api/v1/team/4872/image', tags: [] },
}));
