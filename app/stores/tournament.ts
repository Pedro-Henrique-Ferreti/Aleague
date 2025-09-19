import { defineStore } from 'pinia';
import type { StoreState, TournamentForm } from '~/types/TournamentStore';

export const useTournamentStore = defineStore('tournament', {
  state: (): StoreState => ({
    tournaments: [],
  }),
  actions: {
    createTournament(payload: TournamentForm) {
      const tournament: Tournament = {
        ...payload,
        id: new Date().getTime(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      this.tournaments.push(tournament);

      return tournament;
    },
  },
});
