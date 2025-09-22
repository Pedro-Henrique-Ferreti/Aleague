import { defineStore } from 'pinia';
import type { StoreState, TournamentForm } from '~/types/TournamentStore';

export const useTournamentStore = defineStore('tournament', {
  state: (): StoreState => ({
    tournaments: [],
    activeTournamentId: null,
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
    exportTournament(id: Tournament['id']) {
      const tournament = this.tournaments.find((tournament) => tournament.id === id);

      if (!tournament) throw new Error('Tournament not found');

      downloadFile(
        new Blob([JSON.stringify(tournament)], { type: 'application/json' }),
        `${tournament.name.replace(/[^a-zA-Z0-9]/g, '_')}.json`,
      );
    },
  },
});
