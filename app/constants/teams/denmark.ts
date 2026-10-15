import { defineTeams, mapToTeamList } from '~/helpers/team';

export const DENMARK_TEAM_LIST = mapToTeamList(defineTeams({
  'Midtjylland': { id: 'DNK-1', badge: 'https://img.sofascore.com/api/v1/team/1289/image', country: 'DNK', type: TeamType.CLUB, tags: [] },
  'AGF': { id: 'DNK-2', badge: 'https://img.sofascore.com/api/v1/team/1291/image', country: 'DNK', type: TeamType.CLUB, tags: [] },
  'Sønderjyske': { id: 'DNK-3', badge: 'https://img.sofascore.com/api/v1/team/1295/image', country: 'DNK', type: TeamType.CLUB, tags: [] },
  'Brøndby': { id: 'DNK-4', badge: 'https://img.sofascore.com/api/v1/team/1281/image', country: 'DNK', type: TeamType.CLUB, tags: [] },
  'Viborg': { id: 'DNK-5', badge: 'https://img.sofascore.com/api/v1/team/1288/image', country: 'DNK', type: TeamType.CLUB, tags: [] },
  'Nordsjælland': { id: 'DNK-6', badge: 'https://img.sofascore.com/api/v1/team/1292/image', country: 'DNK', type: TeamType.CLUB, tags: [] },
  'København': { id: 'DNK-7', badge: 'https://img.sofascore.com/api/v1/team/1284/image', country: 'DNK', type: TeamType.CLUB, tags: [] },
  'Odense Boldklub': { id: 'DNK-8', badge: 'https://img.sofascore.com/api/v1/team/1286/image', country: 'DNK', type: TeamType.CLUB, tags: [] },
  'Randers': { id: 'DNK-9', badge: 'https://img.sofascore.com/api/v1/team/1301/image', country: 'DNK', type: TeamType.CLUB, tags: [] },
  'FC Fredericia': { id: 'DNK-10', badge: 'https://img.sofascore.com/api/v1/team/1302/image', country: 'DNK', type: TeamType.CLUB, tags: [] },
  'Silkeborg': { id: 'DNK-11', badge: 'https://img.sofascore.com/api/v1/team/1285/image', country: 'DNK', type: TeamType.CLUB, tags: [] },
  'Vejle': { id: 'DNK-12', badge: 'https://img.sofascore.com/api/v1/team/4872/image', country: 'DNK', type: TeamType.CLUB, tags: [] },
}));
