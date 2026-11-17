import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const BOLIVIA_TEAM_LIST = mapToTeamList(defineTeams({ country: 'BOL', type: TeamType.CLUB }, {
  'Blooming': { id: 'BOL-1', badge: 'https://img.sofascore.com/api/v1/team/6968/image', tags: [] },
  'Bolívar': { id: 'BOL-2', badge: 'https://img.sofascore.com/api/v1/team/7059/image', tags: [] },
  'Jorge Wilstermann': { id: 'BOL-3', badge: 'https://img.sofascore.com/api/v1/team/7878/image', tags: [] },
  'The Strongest': { id: 'BOL-4', badge: 'https://img.sofascore.com/api/v1/team/32529/image', tags: [] },
  'Oriente Petrolero': { id: 'BOL-5', badge: 'https://img.sofascore.com/api/v1/team/33820/image', tags: [] },
  'Nacional Potosí': { id: 'BOL-6', badge: 'https://img.sofascore.com/api/v1/team/47700/image', tags: [] },
  'Universitario de Vinto': { id: 'BOL-7', badge: 'https://img.sofascore.com/api/v1/team/268082/image', tags: [] },
  'Always Ready': { id: 'BOL-8', badge: 'https://img.sofascore.com/api/v1/team/268083/image', tags: [] },
  'Real Santa Cruz': { id: 'BOL-9', badge: 'https://img.sofascore.com/api/v1/team/327860/image', tags: [] },
  'Real Tomayapo': { id: 'BOL-10', badge: 'https://img.sofascore.com/api/v1/team/335685/image', tags: [] },
  'Independiente Petrolero': { id: 'BOL-11', badge: 'https://img.sofascore.com/api/v1/team/372975/image', tags: [] },
  'San Antonio Bulo-Bulo': { id: 'BOL-12', badge: 'https://img.sofascore.com/api/v1/team/396625/image', tags: [] },
  'Club Aurora': { id: 'BOL-13', badge: 'https://img.sofascore.com/api/v1/team/33714/image', tags: [] },
  'Academia de Balompié Boliviano': { id: 'BOL-14', badge: 'https://img.sofascore.com/api/v1/team/423188/image', tags: [] },
  'CDT Real Oruro': { id: 'BOL-15', badge: 'https://img.sofascore.com/api/v1/team/423186/image', tags: [] },
  'GV San José': { id: 'BOL-16', badge: 'https://img.sofascore.com/api/v1/team/505268/image', tags: [] },
  'Guabirá': { id: 'BOL-17', badge: 'https://img.sofascore.com/api/v1/team/47701/image', tags: [] },
}));
