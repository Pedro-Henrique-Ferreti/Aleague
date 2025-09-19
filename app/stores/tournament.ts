import { defineStore } from 'pinia';
import type { StoreState, TournamentForm } from '~/types/TournamentStore';

export const useTournamentStore = defineStore('tournament', {
  state: (): StoreState => ({
    tournaments: [],
  }),
  actions: {
    createTournament(payload: TournamentForm) {
      const tournament = {
        ...payload,
        id: new Date().getTime(),
      };

      this.tournaments.push(tournament);

      return tournament;
    },
  },
});
