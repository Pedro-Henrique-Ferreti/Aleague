import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const COLOMBIA_TEAM_LIST = mapToTeamList(defineTeams({ country: 'COL', type: TeamType.CLUB }, {
  'América de Cali': { id: 'COL-1', badge: 'https://img.sofascore.com/api/v1/team/6102/image', tags: [] },
  'Junior Barranquilla': { id: 'COL-2', badge: 'https://img.sofascore.com/api/v1/team/6105/image', tags: [] },
  'Atlético Nacional': { id: 'COL-3', badge: 'https://img.sofascore.com/api/v1/team/6106/image', tags: [] },
  'Deportivo Pereira': { id: 'COL-4', badge: 'https://img.sofascore.com/api/v1/team/6109/image', tags: [] },
  'Tolima': { id: 'COL-5', badge: 'https://img.sofascore.com/api/v1/team/6111/image', tags: [] },
  'Deportivo Cali': { id: 'COL-6', badge: 'https://img.sofascore.com/api/v1/team/6112/image', tags: [] },
  'Independiente Medellín': { id: 'COL-7', badge: 'https://img.sofascore.com/api/v1/team/6115/image', tags: [] },
  'Santa Fe': { id: 'COL-8', badge: 'https://img.sofascore.com/api/v1/team/6116/image', tags: [] },
  'Millonarios': { id: 'COL-9', badge: 'https://img.sofascore.com/api/v1/team/6117/image', tags: [] },
  'Once Caldas': { id: 'COL-10', badge: 'https://img.sofascore.com/api/v1/team/6118/image', tags: [] },
  'Deportivo Pasto': { id: 'COL-11', badge: 'https://img.sofascore.com/api/v1/team/6113/image', tags: [] },
  'Inter de Bogotá': { id: 'COL-12', badge: 'https://img.sofascore.com/api/v1/team/1164534/image', tags: [] },
  'Águilas Doradas': { id: 'COL-13', badge: 'https://img.sofascore.com/api/v1/team/48244/image', tags: [] },
  'Bucaramanga': { id: 'COL-14', badge: 'https://img.sofascore.com/api/v1/team/6103/image', tags: [] },
  'Llaneros': { id: 'COL-15', badge: 'https://img.sofascore.com/api/v1/team/89374/image', tags: [] },
  'Fortaleza': { id: 'COL-16', badge: 'https://img.sofascore.com/api/v1/team/89368/image', tags: [] },
  'Jaguares': { id: 'COL-17', badge: 'https://img.sofascore.com/api/v1/team/89370/image', tags: [] },
  'Alianza Valledupar': { id: 'COL-18', badge: 'https://img.sofascore.com/api/v1/team/504899/image', tags: [] },
  'Boyacá Chicó': { id: 'COL-19', badge: 'https://img.sofascore.com/api/v1/team/6107/image', tags: [] },
  'Cúcuta': { id: 'COL-20', badge: 'https://img.sofascore.com/api/v1/team/6108/image', tags: [] },
}));
