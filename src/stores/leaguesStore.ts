import type { AxiosResponse } from 'axios';
import type { League, LeagueTeamStatistics } from '@/types/League';
import type { SaveLeagueGamesParams, UpdateLeagueRulesParams } from '@/types/LeaguesStore';
import type { LeagueGameweek } from '@/types/League';
import { defineStore } from 'pinia';
import axios from '@/helpers/axios';

export const useLeaguesStore = defineStore('leagues', {
  actions: {
    async getLeagueById(id: string) {
      const { data: league }: AxiosResponse<League> = await axios.get(`/leagues/${id}`);

      return league;
    },
    async createLeague({ name }: { name: string }) {
      const { data: { id } }: AxiosResponse<League> = await axios.post('/leagues', { name });

      return id;
    },
    updateLeague({ id , name }: { id: string, name: string }) {
      return axios.patch<League>(`/leagues/${id}`, { name });
    },
    updateLeagueRules({ id, numberOfTeams, awayGames }: UpdateLeagueRulesParams) {
      return axios.patch<League>(`/leagues/${id}/rules`, {
        numberOfTeams,
        awayGames,
      });
    },
    resetLeagueStandings(id: string) {
      return axios.post(`/leagues/${id}/reset-standings`);
    },
    restartLeague(id: string) {
      return axios.post(`/leagues/${id}/resort-games`);
    },
    deleteLeague(id: string) {
      return axios.delete(`/leagues/${id}`);
    },
    addLeagueTeams(id: string, teams: string[]) {
      return axios.post(`/leagues/${id}/teams`, { teams });
    },
    async getLeagueGameweeks(leagueId: string) {
      const {
        data: gameweekList,
      }: AxiosResponse<LeagueGameweek[]> = await axios.get(`/leagues/${leagueId}/gameweeks`);

      return gameweekList;
    },
    saveLeagueGames({ leagueId, games }: SaveLeagueGamesParams) {
      return axios.patch(`/leagues/${leagueId}/games/update-many`, { games });
    },
    async getTeamStatistics({ leagueId, teamId }: { leagueId: string; teamId: string }) {
      const { data } = await axios.get<LeagueTeamStatistics>(`/leagues/${leagueId}/statistics/teams/${teamId}`);

      return data;
    },
  },
});
