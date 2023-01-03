import type { AxiosResponse } from 'axios';
import type { SavePlayoffGamesParams, UpdatePlayoffRulesParams } from '@/types/PlayoffStore';
import type { Playoff, PlayoffWithRounds } from '@/types/Playoff';
import { defineStore } from 'pinia';
import axios from '@/helpers/axios';

export const usePlayoffStore = defineStore('playoff', {
  actions: {
    async getPlayoffById(hashId: string) {
      const { data: playoff }: AxiosResponse<PlayoffWithRounds> = await axios.get(`/playoffs/${hashId}`);

      return playoff;
    },
    async createPlayoff({ name }: { name: string }) {
      const { data: { hashid } }: AxiosResponse<Playoff> = await axios.post('/playoffs', { name });

      return hashid;
    },
    updatePlayoff({ hashId , name }: { hashId: string, name: string }) {
      return axios.patch<Playoff>(`/playoffs/${hashId}`, { name });
    },
    updatePlayoffRules({ hashId, numberOfTeams, numberOfLegs }: UpdatePlayoffRulesParams) {
      return axios.patch<Playoff>(`/playoffs/${hashId}/rules`, {
        numberOfLegs,
        numberOfTeams,
      });
    },
    addPlayoffTeams(id: string, teams: number[]) {
      return axios.post(`/playoffs/${id}/teams`, { teams });
    },
    deletePlayoff(hashId: string) {
      return axios.delete(`/playoffs/${hashId}`);
    },
    savePlayoffGames({ hashId, games }: SavePlayoffGamesParams) {
      return axios.patch(`/playoffs/${hashId}/games/updateMany`, {
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
