import { defineStore } from 'pinia';
import { createStage } from '~/helpers/tournament';

export const useTournamentStore = defineStore('tournament', {
  state: (): StoreState => ({
    tournaments: [],
    activeTournamentId: null,
  }),
  actions: {
    getTournament(id: Tournament['id']): Tournament {
      const tournament = this.tournaments.find((tournament) => tournament.id === id);

      if (!tournament) throw new Error('Tournament not found');

      return tournament;
    },
    createTournament(payload: TournamentForm) {
      const tournament: Tournament = {
        ...payload,
        id: new Date().getTime(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        stages: [],
      };

      this.tournaments.push(tournament);

      return tournament;
    },
    updateTournament(id: Tournament['id'], payload: TournamentForm) {
      const index = this.tournaments.findIndex((i) => i.id === id);

      if (index === -1) throw new Error('Tournament not found');

      this.tournaments[index] = {
        ...this.tournaments[index] as Tournament,
        ...payload,
      };
    },
    exportTournament(id: Tournament['id']) {
      const tournament = this.getTournament(id);

      tournament.updatedAt = new Date().toISOString();

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
    addStage(id: Tournament['id'], stageForm: TournamentStageForm) {
      const tournament = this.getTournament(id);

      tournament.stages.push(createStage(tournament, stageForm));
    },
    removeStage(id: Tournament['id'], stageId: TournamentStage['id']) {
      const tournament = this.getTournament(id);

      tournament.stages = tournament.stages.filter((stage) => stage.id !== stageId);
    },
  },
});
