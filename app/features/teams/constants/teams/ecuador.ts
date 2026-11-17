import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const ECUADOR_TEAM_LIST = mapToTeamList(defineTeams({ country: 'ECU', type: TeamType.CLUB }, {
  'Aucas': { id: 'ECU-1', badge: 'https://img.sofascore.com/api/v1/team/5249/image', tags: [] },
  'Barcelona SC': { id: 'ECU-2', badge: 'https://img.sofascore.com/api/v1/team/5250/image', tags: [] },
  'Emelec': { id: 'ECU-3', badge: 'https://img.sofascore.com/api/v1/team/5255/image', tags: [] },
  'LDU': { id: 'ECU-4', badge: 'https://img.sofascore.com/api/v1/team/5257/image', tags: [] },
  'Macará': { id: 'ECU-5', badge: 'https://img.sofascore.com/api/v1/team/6001/image', tags: [] },
  'Mushuc Runa': { id: 'ECU-6', badge: 'https://img.sofascore.com/api/v1/team/134976/image', tags: [] },
  'Delfín': { id: 'ECU-7', badge: 'https://img.sofascore.com/api/v1/team/213638/image', tags: [] },
  'Independiente del Valle': { id: 'ECU-8', badge: 'https://img.sofascore.com/api/v1/team/39723/image', tags: [] },
  'Universidad Católica': { id: 'ECU-9', badge: 'https://img.sofascore.com/api/v1/team/21942/image', tags: [] },
  'Guayaquil City': { id: 'ECU-10', badge: 'https://img.sofascore.com/api/v1/team/188850/image', tags: [] },
  'Deportivo Cuenca': { id: 'ECU-11', badge: 'https://img.sofascore.com/api/v1/team/5251/image', tags: [] },
  'Orense': { id: 'ECU-12', badge: 'https://img.sofascore.com/api/v1/team/277525/image', tags: [] },
  'Leones del Norte': { id: 'ECU-13', badge: 'https://img.sofascore.com/api/v1/team/388234/image', tags: [] },
  'Libertad': { id: 'ECU-14', badge: 'https://img.sofascore.com/api/v1/team/394127/image', tags: [] },
  'Técnico Universitario': { id: 'ECU-15', badge: 'https://img.sofascore.com/api/v1/team/21941/image', tags: [] },
  'Manta': { id: 'ECU-16', badge: 'https://img.sofascore.com/api/v1/team/33561/image', tags: [] },
}));
