import type {
  ApiCreateAllPlayAllTournamentPayload,
  ApiCreatePlayoffsTournamentPayload,
  ApiGetAllTournamentsResponse,
  Tournament,
} from '@/types/Tournament';
import { axiosInstance } from '@/helpers/axios';

export default class TournamentService {
  static getAllTournaments() {
    return axiosInstance.get<ApiGetAllTournamentsResponse>('/competitions');
  }

  static getTournamentById(id: string) {
    return axiosInstance.get<Tournament>(`/competitions/${id}`);
  }

  static createAllPlayAllTournament(payload: ApiCreateAllPlayAllTournamentPayload) {
    return axiosInstance.post<{ id: string }>('/competitions/all-play-all', {
      name: payload.name,
      icon: payload.icon,
      numberOfTeams: payload.numberOfTeams,
      hasTwoLegs: payload.hasTwoLegs,
    });
  }

  static createPlayoffsTournament(payload: ApiCreatePlayoffsTournamentPayload) {
    return axiosInstance.post<{ id: string }>('/competitions/playoffs', {
      name: payload.name,
      icon: payload.icon,
      numberOfTeams: payload.numberOfTeams,
      isDoubleLegged: payload.isDoubleLegged,
      finalRoundIsDoubleLegged: payload.finalRoundIsDoubleLegged,
    });
  }

  static addTournamentParticipants(
    payload: { id: string; stages: { id: string; teams: string[] }[] },
  ) {
    return axiosInstance.post(`/competitions/${payload.id}/add-participants`, {
      stages: payload.stages,
    });
  }
}
