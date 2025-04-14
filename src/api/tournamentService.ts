import {
  TournamentStageType,
  type TournamentPreview,
  type Tournament,
  type TournamentGroupsStagePreview,
  type TournamentStage,
} from '@/types/Tournament';
import type { ApiCreateTournamentPayload } from '@/types/NewTournamentForm';
import { axiosInstance } from '@/helpers/axios';

export default class TournamentService {
  static getAllTournaments() {
    return axiosInstance.get<TournamentPreview[]>('/competitions');
  }

  static getTournamentById(id: string) {
    return axiosInstance.get<Tournament>(`/competitions/${id}`);
  }

  static getTournamentStandings(id: string) {
    return axiosInstance.get<TournamentGroupsStagePreview[]>(`/competitions/${id}/stages/standings`);
  }

  static createTournament(payload: ApiCreateTournamentPayload) {
    return axiosInstance.post<{ id: string }>('/competitions', payload);
  }

  static addStageParticipants(
    payload: { stageId: string; teams: { tbdId: string; teamId: string }[] },
  ) {
    return axiosInstance.post(`/competitions/stages/${payload.stageId}/add-participants`, {
      teams: payload.teams,
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
        positionColors: ((stage.type === TournamentStageType.GROUPS)
          ? stage.groups.flatMap((group) => group.standings.map((standing) => ({
            groupNumber: group.number,
            position: standing.position,
            color: standing.positionColor,
          }))).filter((standing) => !!standing.color)
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

  static createTournamentGroup(payload: { name: string; competitions: string[] }) {
    return axiosInstance.post('/competitions/groups', payload);
  }

  static updateTournamentGroup(payload: { id: string; name: string; competitions: string[] }) {
    return axiosInstance.patch(`/competitions/groups/${payload.id}`, payload);
  }

  static copyTournamentGroup(payload: { id: string; name: string }) {
    return axiosInstance.post(`/competitions/groups/${payload.id}/copy`, payload);
  }
}
