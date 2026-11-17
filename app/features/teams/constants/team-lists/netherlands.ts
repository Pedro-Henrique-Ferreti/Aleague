import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const NETHERLANDS_TEAM_LIST = mapToTeamList(defineTeams({ country: Country.NETHERLANDS, type: TeamType.CLUB }, {
  'PSV': { id: 'NLD-1', badge: 'https://img.sofascore.com/api/v1/team/2952/image', tags: [] },
  'Ajax': { id: 'NLD-2', badge: 'https://img.sofascore.com/api/v1/team/2953/image', tags: [] },
  'Feyenoord': { id: 'NLD-3', badge: 'https://img.sofascore.com/api/v1/team/2959/image', tags: [] },
  'Heerenveen': { id: 'NLD-4', badge: 'https://img.sofascore.com/api/v1/team/2964/image', tags: [] },
  'NEC Nijmegen': { id: 'NLD-5', badge: 'https://img.sofascore.com/api/v1/team/2962/image', tags: [] },
  'Twente': { id: 'NLD-6', badge: 'https://img.sofascore.com/api/v1/team/2955/image', tags: [] },
  'AZ': { id: 'NLD-7', badge: 'https://img.sofascore.com/api/v1/team/2950/image', tags: [] },
  'Utrecht': { id: 'NLD-8', badge: 'https://img.sofascore.com/api/v1/team/2948/image', tags: [] },
  'Sparta Rotterdam': { id: 'NLD-9', badge: 'https://img.sofascore.com/api/v1/team/2960/image', tags: [] },
  'Groningen': { id: 'NLD-10', badge: 'https://img.sofascore.com/api/v1/team/2951/image', tags: [] },
  'GA Eagles': { id: 'NLD-11', badge: 'https://img.sofascore.com/api/v1/team/2979/image', tags: [] },
  'Zwolle': { id: 'NLD-12', badge: 'https://img.sofascore.com/api/v1/team/2971/image', tags: [] },
  'Fortuna Sittard': { id: 'NLD-13', badge: 'https://img.sofascore.com/api/v1/team/2957/image', tags: [] },
  'Excelsior Rotterdam': { id: 'NLD-14', badge: 'https://img.sofascore.com/api/v1/team/2967/image', tags: [] },
  'Telstar': { id: 'NLD-15', badge: 'https://img.sofascore.com/api/v1/team/2972/image', tags: [] },
  'Volendam': { id: 'NLD-16', badge: 'https://img.sofascore.com/api/v1/team/2968/image', tags: [] },
  'NAC Breda': { id: 'NLD-17', badge: 'https://img.sofascore.com/api/v1/team/2947/image', tags: [] },
  'Heracles': { id: 'NLD-18', badge: 'https://img.sofascore.com/api/v1/team/2977/image', tags: [] },
}));
