import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const CHILE_TEAM_LIST = mapToTeamList(defineTeams({ country: 'CHL', type: TeamType.CLUB }, {
  'Universidad Católica': { id: 'CHL-1', badge: 'https://img.sofascore.com/api/v1/team/3151/image', tags: [] },
  'Unión Española': { id: 'CHL-2', badge: 'https://img.sofascore.com/api/v1/team/3153/image', tags: [] },
  'Colo-Colo': { id: 'CHL-3', badge: 'https://img.sofascore.com/api/v1/team/3155/image', tags: [] },
  'Palestino': { id: 'CHL-4', badge: 'https://img.sofascore.com/api/v1/team/3157/image', tags: [] },
  'Audax Italiano': { id: 'CHL-5', badge: 'https://img.sofascore.com/api/v1/team/3162/image', tags: [] },
  'O\'Higgins': { id: 'CHL-6', badge: 'https://img.sofascore.com/api/v1/team/3163/image', tags: [] },
  'Huachipato': { id: 'CHL-7', badge: 'https://img.sofascore.com/api/v1/team/3164/image', tags: [] },
  'Coquimbo Unido': { id: 'CHL-8', badge: 'https://img.sofascore.com/api/v1/team/3165/image', tags: [] },
  'Cobresal': { id: 'CHL-9', badge: 'https://img.sofascore.com/api/v1/team/3167/image', tags: [] },
  'Antofagasta': { id: 'CHL-10', badge: 'https://img.sofascore.com/api/v1/team/5601/image', tags: [] },
  'Ñublense': { id: 'CHL-11', badge: 'https://img.sofascore.com/api/v1/team/7029/image', tags: [] },
  'Deportes Iquique': { id: 'CHL-12', badge: 'https://img.sofascore.com/api/v1/team/33596/image', tags: [] },
  'Unión La Calera': { id: 'CHL-13', badge: 'https://img.sofascore.com/api/v1/team/48242/image', tags: [] },
  'Deportes Limache': { id: 'CHL-14', badge: 'https://img.sofascore.com/api/v1/team/331131/image', tags: [] },
  'Universidad de Chile': { id: 'CHL-15', badge: 'https://img.sofascore.com/api/v1/team/3161/image', tags: [] },
  'Everton': { id: 'CHL-16', badge: 'https://img.sofascore.com/api/v1/team/5032/image', tags: [] },
  'La Serena': { id: 'CHL-17', badge: 'https://img.sofascore.com/api/v1/team/5031/image', tags: [] },
  'Universidad  de Concepción': { id: 'CHL-18', badge: 'https://img.sofascore.com/api/v1/team/5034/image', tags: [] },
  'Deportes Concepción': { id: 'CHL-19', badge: 'https://img.sofascore.com/api/v1/team/3160/image', tags: [] },
}));
