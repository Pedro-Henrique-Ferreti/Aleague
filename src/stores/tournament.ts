import type { TournamentPreview } from '@/types/Tournament';
import { defineStore } from 'pinia';
import api from '@/api';

interface StoreState {
  tournaments: TournamentPreview[];
}

export const useTournamentStore = defineStore('tournament', {
  state: (): StoreState => ({
    tournaments: [],
  }),
  actions: {
    async getTournaments() {
      const { data } = await api.tournamentService.getAllTournaments();
      this.tournaments = data;
    },
  },
});
