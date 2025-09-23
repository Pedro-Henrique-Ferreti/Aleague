import { defineStore } from 'pinia';

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
    closeActiveTournament() {
      const index = this.tournaments.findIndex((i) => i.id === this.activeTournamentId);

      this.tournaments.splice(index, 1);

      this.activeTournamentId = this.tournaments[index]?.id || this.tournaments[this.tournaments.length - 1]?.id || null;
    },
  },
});
