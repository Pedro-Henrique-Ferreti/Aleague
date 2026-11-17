import { defineTeams, mapToTeamList } from '~/features/teams/helpers/team-definition';

export const SAUDI_ARABIA_TEAM_LIST = mapToTeamList(defineTeams({ country: 'SAU', type: TeamType.CLUB }, {
  'Al-Hilal': { id: 'SAU-1', badge: 'https://img.sofascore.com/api/v1/team/21895/image', tags: [] },
  'Al-Nassr': { id: 'SAU-2', badge: 'https://img.sofascore.com/api/v1/team/23400/image', tags: [] },
  'Al-Ittihad': { id: 'SAU-3', badge: 'https://img.sofascore.com/api/v1/team/34315/image', tags: [] },
  'Al-Ahli': { id: 'SAU-4', badge: 'https://img.sofascore.com/api/v1/team/34469/image', tags: [] },
  'Al-Qadsiah': { id: 'SAU-5', badge: 'https://img.sofascore.com/api/v1/team/56027/image', tags: [] },
  'Al-Taawoun': { id: 'SAU-6', badge: 'https://img.sofascore.com/api/v1/team/56021/image', tags: [] },
  'Al-Ettifaq': { id: 'SAU-7', badge: 'https://img.sofascore.com/api/v1/team/34318/image', tags: [] },
  'Neom SC': { id: 'SAU-8', badge: 'https://img.sofascore.com/api/v1/team/530631/image', tags: [] },
  'Al-Fayha': { id: 'SAU-9', badge: 'https://img.sofascore.com/api/v1/team/168094/image', tags: [] },
  'Al-Hazem': { id: 'SAU-10', badge: 'https://img.sofascore.com/api/v1/team/168086/image', tags: [] },
  'Al-Khaleej': { id: 'SAU-11', badge: 'https://img.sofascore.com/api/v1/team/167228/image', tags: [] },
  'Al-Fateh': { id: 'SAU-12', badge: 'https://img.sofascore.com/api/v1/team/56023/image', tags: [] },
  'Al-Shabab': { id: 'SAU-13', badge: 'https://img.sofascore.com/api/v1/team/34313/image', tags: [] },
  'Al-Kholood': { id: 'SAU-14', badge: 'https://img.sofascore.com/api/v1/team/269199/image', tags: [] },
  'Damac': { id: 'SAU-15', badge: 'https://img.sofascore.com/api/v1/team/204126/image', tags: [] },
  'Al-Riyadh': { id: 'SAU-16', badge: 'https://img.sofascore.com/api/v1/team/168088/image', tags: [] },
  'Al-Okhdood': { id: 'SAU-17', badge: 'https://img.sofascore.com/api/v1/team/336456/image', tags: [] },
  'Al-Najma': { id: 'SAU-18', badge: 'https://img.sofascore.com/api/v1/team/395831/image', tags: [] },
}));
