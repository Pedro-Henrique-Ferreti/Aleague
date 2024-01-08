import type {
  Playoff,
  PlayoffWithRounds,
  SavePlayoffGamesPayload,
  UpdatePlayoffRulesPayload,
} from '@/types/Playoff';
import { axiosInstance } from '@/helpers/axios';

export default class PlayoffService {
  static getPlayoffById(id: string) {
    return axiosInstance.get<PlayoffWithRounds>(`/playoffs/${id}`);
  }

  static createPlayoff({ name }: { name: string }) {
    return axiosInstance.post<Playoff>('/playoffs', { name });
  }

  static restartPlayoff(id: string) {
    return axiosInstance.post(`/playoffs/${id}/resort-games`);
  }

  static updatePlayoff({ id , name }: { id: string, name: string }) {
    return axiosInstance.patch<Playoff>(`/playoffs/${id}`, { name });
  }

  static updatePlayoffRules(payload: UpdatePlayoffRulesPayload) {
    return axiosInstance.patch<Playoff>(`/playoffs/${payload.id}/rules`, {
      numberOfLegs: payload.numberOfLegs,
      numberOfTeams: payload.numberOfTeams,
    });
  }

  static resetPlayoffGames(id: string) {
    return axiosInstance.post(`/playoffs/${id}/reset-rounds`);
  }

  static addPlayoffTeams(id: string, teams: string[]) {
    return axiosInstance.post(`/playoffs/${id}/teams`, { teams });
  }

  static deletePlayoff(id: string) {
    return axiosInstance.delete(`/playoffs/${id}`);
  }

  static savePlayoffGames({ id, games }: SavePlayoffGamesPayload) {
    return axiosInstance.patch(`/playoffs/${id}/games/update-many`, {
      games: games.map((game) => ({
        id: game.id,
        homeTeamId: game.homeTeam?.id || null,
        awayTeamId: game.awayTeam?.id || null,
        homeTeamScore: game.homeTeamScore,
        awayTeamScore: game.awayTeamScore,
        homeTeamPenaltyShootoutScore: game.homeTeamPenaltyShootoutScore,
        awayTeamPenaltyShootoutScore: game.awayTeamPenaltyShootoutScore,
      })),
    });
  }
}
