import type { ApiCreateAllPlayAllTournamentPayload, ApiGetAllTournamentsResponse, Tournament } from '@/types/Tournament';
import { axiosInstance } from '@/helpers/axios';

export default class TournamentService {
  static getAllTournaments() {
    return axiosInstance.get<ApiGetAllTournamentsResponse>('/competitions');
  }

  // All-play-all
  static createAllPlayAllTournament(payload: ApiCreateAllPlayAllTournamentPayload) {
    return axiosInstance.post('/competitions/all-play-all', {
      name: payload.name,
      icon: payload.icon,
      numberOfTeams: payload.numberOfTeams,
      hasTwoLegs: payload.hasTwoLegs,
    });
  }

  static getTournamentById(id: string) {
    return axiosInstance.get<Tournament>(`/competitions/${id}`);
  }

  static addTournamentParticipants(payload: { id: string; teams: string[] }) {
    return axiosInstance.post(`/competitions/${payload.id}/add-participants`, {
      teams: payload.teams,
    });
  }
}
