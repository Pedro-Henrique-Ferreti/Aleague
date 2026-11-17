import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const PARAGUAY_TEAM_LIST = mapToTeamList(defineTeams({ country: 'PRY', type: TeamType.CLUB }, {
  'Cerro Porteño': { id: 'PRY-1', badge: 'https://img.sofascore.com/api/v1/team/5991/image', tags: [] },
  'Guaraní': { id: 'PRY-2', badge: 'https://img.sofascore.com/api/v1/team/5994/image', tags: [] },
  'Libertad': { id: 'PRY-3', badge: 'https://img.sofascore.com/api/v1/team/5996/image', tags: [] },
  'Olimpia': { id: 'PRY-4', badge: 'https://img.sofascore.com/api/v1/team/5997/image', tags: [] },
  'Sportivo Luqueño': { id: 'PRY-5', badge: 'https://img.sofascore.com/api/v1/team/5998/image', tags: [] },
  'Nacional Asunción': { id: 'PRY-6', badge: 'https://img.sofascore.com/api/v1/team/33001/image', tags: [] },
  '2 de Mayo': { id: 'PRY-7', badge: 'https://img.sofascore.com/api/v1/team/5992/image', tags: [] },
  'Rubio Ñu': { id: 'PRY-8', badge: 'https://img.sofascore.com/api/v1/team/36438/image', tags: [] },
  'Sportivo Trinidense': { id: 'PRY-9', badge: 'https://img.sofascore.com/api/v1/team/39722/image', tags: [] },
  'Recoleta': { id: 'PRY-10', badge: 'https://img.sofascore.com/api/v1/team/292595/image', tags: [] },
  'San Lorenzo': { id: 'PRY-11', badge: 'https://img.sofascore.com/api/v1/team/90972/image', tags: [] },
  'Sportivo Ameliano': { id: 'PRY-12', badge: 'https://img.sofascore.com/api/v1/team/323510/image', tags: [] },
}));
