import { defineTeams, mapToTeamList } from '~/helpers/team';

export const NETHERLANDS_TEAM_LIST = mapToTeamList(defineTeams({
  'PSV': { id: 'NLD-1', badge: 'https://img.sofascore.com/api/v1/team/2952/image', country: 'NLD', type: TeamType.CLUB, tags: [] },
  'Ajax': { id: 'NLD-2', badge: 'https://img.sofascore.com/api/v1/team/2953/image', country: 'NLD', type: TeamType.CLUB, tags: [] },
  'Feyenoord': { id: 'NLD-3', badge: 'https://img.sofascore.com/api/v1/team/2959/image', country: 'NLD', type: TeamType.CLUB, tags: [] },
  'Heerenveen': { id: 'NLD-4', badge: 'https://img.sofascore.com/api/v1/team/2964/image', country: 'NLD', type: TeamType.CLUB, tags: [] },
  'NEC Nijmegen': { id: 'NLD-5', badge: 'https://img.sofascore.com/api/v1/team/2962/image', country: 'NLD', type: TeamType.CLUB, tags: [] },
  'Twente': { id: 'NLD-6', badge: 'https://img.sofascore.com/api/v1/team/2955/image', country: 'NLD', type: TeamType.CLUB, tags: [] },
  'AZ': { id: 'NLD-7', badge: 'https://img.sofascore.com/api/v1/team/2950/image', country: 'NLD', type: TeamType.CLUB, tags: [] },
  'Utrecht': { id: 'NLD-8', badge: 'https://img.sofascore.com/api/v1/team/2948/image', country: 'NLD', type: TeamType.CLUB, tags: [] },
  'Sparta Rotterdam': { id: 'NLD-9', badge: 'https://img.sofascore.com/api/v1/team/2960/image', country: 'NLD', type: TeamType.CLUB, tags: [] },
  'Groningen': { id: 'NLD-10', badge: 'https://img.sofascore.com/api/v1/team/2951/image', country: 'NLD', type: TeamType.CLUB, tags: [] },
  'GA Eagles': { id: 'NLD-11', badge: 'https://img.sofascore.com/api/v1/team/2979/image', country: 'NLD', type: TeamType.CLUB, tags: [] },
  'Zwolle': { id: 'NLD-12', badge: 'https://img.sofascore.com/api/v1/team/2971/image', country: 'NLD', type: TeamType.CLUB, tags: [] },
  'Fortuna Sittard': { id: 'NLD-13', badge: 'https://img.sofascore.com/api/v1/team/2957/image', country: 'NLD', type: TeamType.CLUB, tags: [] },
  'Excelsior Rotterdam': { id: 'NLD-14', badge: 'https://img.sofascore.com/api/v1/team/2967/image', country: 'NLD', type: TeamType.CLUB, tags: [] },
  'Telstar': { id: 'NLD-15', badge: 'https://img.sofascore.com/api/v1/team/2972/image', country: 'NLD', type: TeamType.CLUB, tags: [] },
  'Volendam': { id: 'NLD-16', badge: 'https://img.sofascore.com/api/v1/team/2968/image', country: 'NLD', type: TeamType.CLUB, tags: [] },
  'NAC Breda': { id: 'NLD-17', badge: 'https://img.sofascore.com/api/v1/team/2947/image', country: 'NLD', type: TeamType.CLUB, tags: [] },
  'Heracles': { id: 'NLD-18', badge: 'https://img.sofascore.com/api/v1/team/2977/image', country: 'NLD', type: TeamType.CLUB, tags: [] },
}));
