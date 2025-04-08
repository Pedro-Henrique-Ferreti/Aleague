import type {
  TeamPreview, RivalTeam, TeamDetails,
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
}
