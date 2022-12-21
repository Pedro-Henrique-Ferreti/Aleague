import type { AxiosResponse } from 'axios';
import type { League, LeagueWithStandings } from '@/types/League';
import type { SaveLeagueGamesParams, UpdateLeagueRulesParams } from '@/types/LeaguesStore';
import type { Gameweek } from '@/types/Game';
import { defineStore } from 'pinia';
import axios from '@/helpers/axios';

export const useLeaguesStore = defineStore('leagues', {
  actions: {
    async getLeagueById(hashId: string) {
      const { data: league }: AxiosResponse<LeagueWithStandings> = await axios.get(`/leagues/${hashId}`);

      return league;
    },
    async createLeague({ name }: { name: string }) {
      const { data: { hashid } }: AxiosResponse<League> = await axios.post('/leagues', { name });

      return hashid;
    },
    updateLeague({ hashId , name }: { hashId: string, name: string }) {
      return axios.patch<League>(`/leagues/${hashId}`, { name });
    },
    updateLeagueRules({ hashId, numberOfTeams, awayGames }: UpdateLeagueRulesParams) {
      return axios.patch<League>(`/leagues/${hashId}/rules`, {
        numberOfTeams,
        awayGames,
      });
    },
    deleteLeague(hashId: string) {
      return axios.delete(`/leagues/${hashId}`);
    },
    addLeagueTeams(id: string, teams: number[]) {
      return axios.post(`/leagues/${id}/teams`, { teams });
    },
    async getLeagueGameweeks(leagueId: string) {
      const {
        data: gameweekList,
      }: AxiosResponse<Gameweek[]> = await axios.get(`/leagues/${leagueId}/gameweeks`);

      return gameweekList;
    },
    saveLeagueGames({ leagueId, games }: SaveLeagueGamesParams) {
      return axios.patch(`/leagues/${leagueId}/games/updateMany`, { games });
    },
  },
});
