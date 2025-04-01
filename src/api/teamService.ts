import type {
  TeamPreview, ApiTeamToBeCreated, RivalTeam, TeamDetails, TeamEmblem,
} from '@/types/Team';
import { axiosInstance } from '@/helpers/axios';

export default class TeamService {
  static getAllTeams() {
    return axiosInstance.get<TeamPreview[]>('/teams');
  }

  static getTeams(payload?: { page?: number; type?: string; name?: string; }) {
    return axiosInstance.get<{ data: TeamPreview[] }>('/teams', {
      params: payload,
    });
  }

  static async getTeamEmblems() {
    const response = await axiosInstance.get<TeamEmblem[]>('/teams/emblems');

    response.data = response.data.sort((a, b) => {
      if (a.isDefaultEmblem && !b.isDefaultEmblem) return -1;
      if (!a.isDefaultEmblem && b.isDefaultEmblem) return 1;
      return 0;
    });

    return response;
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

  static addRivalToTeam(payload: { teamId: string; rivalTeamId: string }) {
    return axiosInstance.post<RivalTeam[]>(`/teams/${payload.teamId}/rivals`, {
      rivalId: payload.rivalTeamId,
    });
  }

  static removeRivalFromTeam(payload: { teamId: string; rivalTeamId: string }) {
    return axiosInstance.delete<RivalTeam[]>(`/teams/${payload.teamId}/rivals/${payload.rivalTeamId}`);
  }

  static toggleTeamFavoriteStatus(teamId: string) {
    return axiosInstance.post(`/teams/${teamId}/favorite`);
  }

  static updateTeam(payload: { teamId: string; name: string; emblemId: string }) {
    return axiosInstance.patch(`/teams/${payload.teamId}`, {
      name: payload.name,
      emblemId: payload.emblemId,
    });
  }

  static deleteTeam(teamId: string) {
    return axiosInstance.delete(`/teams/${teamId}`);
  }
}
