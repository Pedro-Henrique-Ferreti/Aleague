import { defineRivals, defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

const argentinaTeams = defineTeams({ country: 'ARG', type: TeamType.CLUB }, {
  'San Lorenzo': { id: 'ARG-1', badge: 'https://img.sofascore.com/api/v1/team/3201/image', tags: [] },
  'Boca Juniors': { id: 'ARG-2', badge: 'https://img.sofascore.com/api/v1/team/3202/image', tags: [] },
  'Belgrano': { id: 'ARG-3', badge: 'https://img.sofascore.com/api/v1/team/3203/image', tags: [] },
  'Unión de Santa Fe': { id: 'ARG-4', badge: 'https://img.sofascore.com/api/v1/team/3204/image', tags: [] },
  'Gimnasia y Esgrima': { id: 'ARG-5', badge: 'https://img.sofascore.com/api/v1/team/3205/image', tags: [] },
  'Estudiantes': { id: 'ARG-6', badge: 'https://img.sofascore.com/api/v1/team/3206/image', tags: [] },
  'Colón': { id: 'ARG-7', badge: 'https://img.sofascore.com/api/v1/team/3207/image', tags: [] },
  'Vélez Sarsfield': { id: 'ARG-8', badge: 'https://img.sofascore.com/api/v1/team/3208/image', tags: [] },
  'Independiente': { id: 'ARG-9', badge: 'https://img.sofascore.com/api/v1/team/3209/image', tags: [] },
  'Talleres': { id: 'ARG-10', badge: 'https://img.sofascore.com/api/v1/team/3210/image', tags: [] },
  'River Plate': { id: 'ARG-11', badge: 'https://img.sofascore.com/api/v1/team/3211/image', tags: [] },
  'Newell\'s': { id: 'ARG-12', badge: 'https://img.sofascore.com/api/v1/team/3212/image', tags: [] },
  'Racing': { id: 'ARG-13', badge: 'https://img.sofascore.com/api/v1/team/3215/image', tags: [] },
  'Argentinos Jrs.': { id: 'ARG-14', badge: 'https://img.sofascore.com/api/v1/team/3216/image', tags: [] },
  'Rosario Central': { id: 'ARG-15', badge: 'https://img.sofascore.com/api/v1/team/3217/image', tags: [] },
  'Lanús': { id: 'ARG-16', badge: 'https://img.sofascore.com/api/v1/team/3218/image', tags: [] },
  'Banfield': { id: 'ARG-17', badge: 'https://img.sofascore.com/api/v1/team/3219/image', tags: [] },
  'Arsenal de Sarandí': { id: 'ARG-18', badge: 'https://img.sofascore.com/api/v1/team/3221/image', tags: [] },
  'Godoy Cruz': { id: 'ARG-19', badge: 'https://img.sofascore.com/api/v1/team/6074/image', tags: [] },
  'Tigre': { id: 'ARG-20', badge: 'https://img.sofascore.com/api/v1/team/7628/image', tags: [] },
  'Huracán': { id: 'ARG-21', badge: 'https://img.sofascore.com/api/v1/team/7629/image', tags: [] },
  'San Martín': { id: 'ARG-22', badge: 'https://img.sofascore.com/api/v1/team/7772/image', tags: [] },
  'Platense': { id: 'ARG-23', badge: 'https://img.sofascore.com/api/v1/team/36837/image', tags: [] },
  'Defensa y Justicia': { id: 'ARG-24', badge: 'https://img.sofascore.com/api/v1/team/36839/image', tags: [] },
  'Sarmiento': { id: 'ARG-25', badge: 'https://img.sofascore.com/api/v1/team/42338/image', tags: [] },
  'Barracas': { id: 'ARG-26', badge: 'https://img.sofascore.com/api/v1/team/65668/image', tags: [] },
  'Central Córdoba': { id: 'ARG-27', badge: 'https://img.sofascore.com/api/v1/team/65676/image', tags: [] },
  'Everton (LP)': { id: 'ARG-28', badge: 'https://img.sofascore.com/api/v1/team/260041/image', tags: [] },
  'Instituto': { id: 'ARG-29', badge: 'https://img.sofascore.com/api/v1/team/4937/image', tags: [] },
  'Gimnasia Mendoza': { id: 'ARG-30', badge: 'https://img.sofascore.com/api/v1/team/188441/image', tags: [] },
  'Dep. Riestra': { id: 'ARG-31', badge: 'https://img.sofascore.com/api/v1/team/189723/image', tags: [] },
  'Ind. Rivadavia': { id: 'ARG-32', badge: 'https://img.sofascore.com/api/v1/team/36842/image', tags: [] },
  'Atlético Tucumán': { id: 'ARG-33', badge: 'https://img.sofascore.com/api/v1/team/36833/image', tags: [] },
  'Aldosivi': { id: 'ARG-34', badge: 'https://img.sofascore.com/api/v1/team/36836/image', tags: [] },
  'Estudiantes de Río Cuarto': { id: 'ARG-35', badge: 'https://img.sofascore.com/api/v1/team/266694/image', tags: [] },
});

defineRivals(argentinaTeams['Boca Juniors'], argentinaTeams['River Plate']);

export const ARGENTINA_TEAM_LIST = mapToTeamList(argentinaTeams);
