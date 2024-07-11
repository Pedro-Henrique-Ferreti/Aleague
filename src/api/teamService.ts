import type { ApiGetAllTeamsResponse, TeamList } from '@/types/Team';
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
}
