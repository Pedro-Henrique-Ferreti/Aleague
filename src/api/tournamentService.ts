import {
  TournamentStageType,
  type ApiCreateAllPlayAllTournamentPayload,
  type ApiCreatePlayoffsTournamentPayload,
  type ApiGetAllTournamentsResponse,
  type Tournament,
  type TournamentGroupsStagePreview,
  type TournamentStage,
} from '@/types/Tournament';
import { axiosInstance } from '@/helpers/axios';

export default class TournamentService {
  static getAllTournaments() {
    return axiosInstance.get<ApiGetAllTournamentsResponse>('/competitions');
  }

  static getTournamentById(id: string) {
    return axiosInstance.get<Tournament>(`/competitions/${id}`);
  }

  static getTournamentStandings(id: string) {
    return axiosInstance.get<TournamentGroupsStagePreview[]>(`/competitions/${id}/stages/standings`);
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

  static updateTournamentStages(payload: { id: string; stages: TournamentStage[] }) {
    return axiosInstance.patch(`/competitions/${payload.id}/stages/results`, {
      stages: payload.stages.map((stage) => ({
        id: stage.id,
        name: stage.name,
        rounds: ((stage.type === TournamentStageType.PLAYOFFS)
          ? stage.rounds.map((round) => ({
            id: round.id,
            name: round.name,
            matchups: round.matchups.map((matchup) => ({
              id: matchup.id,
              firstTeamId: matchup.firstTeam?.id || null,
              secondTeamId: matchup.secondTeam?.id || null,
              games: matchup.games.map((game) => ({
                id: game.id,
                homeTeamId: game.homeTeam?.id || null,
                awayTeamId: game.awayTeam?.id || null,
                homeTeamScore: game.homeTeamScore,
                awayTeamScore: game.awayTeamScore,
              })),
            })),
          }))
          : undefined
        ),
        games: ((stage.type === TournamentStageType.GROUPS)
          ? stage.gameweeks.flatMap((gameweek) => gameweek.matches.flatMap((game) => ({
            id: game.id,
            homeTeamScore: game.homeTeamScore,
            awayTeamScore: game.awayTeamScore,
          })))
          : undefined
        ),
      })),
    });
  }
}
