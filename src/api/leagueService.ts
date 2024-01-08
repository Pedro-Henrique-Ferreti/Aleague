import { axiosInstance } from '@/helpers/axios';
import type {
  League,
  LeagueTeamStatistics,
  UpdateLeagueRulesPayload,
  SaveLeagueGamesPayload,
  LeagueGameweek,
} from '@/types/League';

export default class LeagueService {
  static getLeagueById(id: string) {
    return axiosInstance.get<League>(`/leagues/${id}`);
  }

  static createLeague(payload: { name: string }) {
    return axiosInstance.post<League>('/leagues', {
      name: payload.name,
    });
  }

  static updateLeague(payload: { id: string, name: string }) {
    return axiosInstance.patch<League>(`/leagues/${payload.id}`, {
      name: payload.name,
    });
  }

  static updateLeagueRules(payload: UpdateLeagueRulesPayload) {
    return axiosInstance.patch<League>(`/leagues/${payload.id}/rules`, {
      numberOfTeams: payload.numberOfTeams,
      awayGames: payload.awayGames,
    });
  }

  static resetLeagueStandings(id: string) {
    return axiosInstance.post(`/leagues/${id}/reset-standings`);
  }

  static restartLeague(id: string) {
    return axiosInstance.post(`/leagues/${id}/resort-games`);
  }

  static deleteLeague(id: string) {
    return axiosInstance.delete(`/leagues/${id}`);
  }

  static addLeagueTeams(id: string, teams: string[]) {
    return axiosInstance.post(`/leagues/${id}/teams`, { teams });
  }

  static getLeagueGameweeks(leagueId: string) {
    return axiosInstance.get<LeagueGameweek[]>(`/leagues/${leagueId}/gameweeks`);
  }

  static saveLeagueGames(payload: SaveLeagueGamesPayload) {
    return axiosInstance.patch(`/leagues/${payload.leagueId}/games/update-many`, {
      games: payload.games,
    });
  }

  static getTeamStatistics({ leagueId, teamId }: { leagueId: string; teamId: string }) {
    return axiosInstance.get<LeagueTeamStatistics>(`/leagues/${leagueId}/statistics/teams/${teamId}`);
  }
}
