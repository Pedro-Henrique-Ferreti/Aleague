import type { AxiosResponse } from 'axios';
import type { SavePlayoffGamesParams, UpdatePlayoffRulesParams } from '@/types/PlayoffStore';
import type { Playoff, PlayoffWithRounds } from '@/types/Playoff';
import { defineStore } from 'pinia';
import axios from '@/helpers/axios';

export const usePlayoffStore = defineStore('playoff', {
  actions: {
    async getPlayoffById(id: string) {
      const { data: playoff }: AxiosResponse<PlayoffWithRounds> = await axios.get(`/playoffs/${id}`);

      return playoff;
    },
    async createPlayoff({ name }: { name: string }) {
      const { data: { id } }: AxiosResponse<Playoff> = await axios.post('/playoffs', { name });

      return id;
    },
    restartPlayoff(id: string) {
      return axios.post(`/playoffs/${id}/resort-games`);
    },
    updatePlayoff({ id , name }: { id: string, name: string }) {
      return axios.patch<Playoff>(`/playoffs/${id}`, { name });
    },
    updatePlayoffRules({ id, numberOfTeams, numberOfLegs }: UpdatePlayoffRulesParams) {
      return axios.patch<Playoff>(`/playoffs/${id}/rules`, {
        numberOfLegs,
        numberOfTeams,
      });
    },
    resetPlayoffGames(id: string) {
      return axios.post(`/playoffs/${id}/reset-rounds`);
    },
    addPlayoffTeams(id: string, teams: string[]) {
      return axios.post(`/playoffs/${id}/teams`, { teams });
    },
    deletePlayoff(id: string) {
      return axios.delete(`/playoffs/${id}`);
    },
    savePlayoffGames({ id, games }: SavePlayoffGamesParams) {
      return axios.patch(`/playoffs/${id}/games/update-many`, {
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
    },
  },
});
