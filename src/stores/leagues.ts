import type { AxiosResponse } from 'axios';
import type { League, LeagueTeamStatistics } from '@/types/League';
import type { SaveLeagueGamesParams, UpdateLeagueRulesParams } from '@/types/leagues';
import type { LeagueGameweek } from '@/types/League';
import { defineStore } from 'pinia';
import { axiosInstance } from '@/helpers/axios';

export const useLeaguesStore = defineStore('leagues', {
  actions: {
    async getLeagueById(id: string) {
      const { data: league }: AxiosResponse<League> = await axiosInstance.get(`/leagues/${id}`);

      return league;
    },
    async createLeague({ name }: { name: string }) {
      const { data: { id } }: AxiosResponse<League> = await axiosInstance.post('/leagues', { name });

      return id;
    },
    updateLeague({ id , name }: { id: string, name: string }) {
      return axiosInstance.patch<League>(`/leagues/${id}`, { name });
    },
    updateLeagueRules({ id, numberOfTeams, awayGames }: UpdateLeagueRulesParams) {
      return axiosInstance.patch<League>(`/leagues/${id}/rules`, {
        numberOfTeams,
        awayGames,
      });
    },
    resetLeagueStandings(id: string) {
      return axiosInstance.post(`/leagues/${id}/reset-standings`);
    },
    restartLeague(id: string) {
      return axiosInstance.post(`/leagues/${id}/resort-games`);
    },
    deleteLeague(id: string) {
      return axiosInstance.delete(`/leagues/${id}`);
    },
    addLeagueTeams(id: string, teams: string[]) {
      return axiosInstance.post(`/leagues/${id}/teams`, { teams });
    },
    async getLeagueGameweeks(leagueId: string) {
      const {
        data: gameweekList,
      }: AxiosResponse<LeagueGameweek[]> = await axiosInstance.get(`/leagues/${leagueId}/gameweeks`);

      return gameweekList;
    },
    saveLeagueGames({ leagueId, games }: SaveLeagueGamesParams) {
      return axiosInstance.patch(`/leagues/${leagueId}/games/update-many`, { games });
    },
    async getTeamStatistics({ leagueId, teamId }: { leagueId: string; teamId: string }) {
      const { data } = await axiosInstance.get<LeagueTeamStatistics>(`/leagues/${leagueId}/statistics/teams/${teamId}`);

      return data;
    },
  },
});
