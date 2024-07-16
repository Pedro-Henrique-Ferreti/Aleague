import type {
  ApiGetAllTeamsResponse, ApiTeamToBeCreated, TeamDetails, TeamEmblem, TeamList,
} from '@/types/Team';
import { axiosInstance } from '@/helpers/axios';

export default class TeamService {
  static getAllTeams() {
    return axiosInstance.get<ApiGetAllTeamsResponse>('/teams');
  }

  static getTeamLists() {
    return axiosInstance.get<TeamList[]>('/teams/team-packs');
  }

  static applyTeamList(listId: string) {
    return axiosInstance.post(`/teams/team-packs/${listId}/apply`);
  }

  static getTeamEmblems() {
    return axiosInstance.get<TeamEmblem[]>('/teams/emblems');
  }

  static createTeams(teams: ApiTeamToBeCreated[]) {
    return axiosInstance.post('/teams', {
      teams: teams.map((team) => ({
        name: team.name,
        country: team.country,
        emblemId: team.emblem.id,
      })),
    });
  }

  static getTeamById(id: string) {
    return axiosInstance.get<TeamDetails>(`/teams/${id}`);
  }
}
