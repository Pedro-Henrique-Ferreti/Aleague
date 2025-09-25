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
      const tournament = this.tournaments.find((tournament) => tournament.id === id);

      if (!tournament) throw new Error('Tournament not found');

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
      const tournament = this.tournaments.find((tournament) => tournament.id === id);

      if (!tournament) throw new Error('Tournament not found');

      let stage: BaseTournamentStage = {
        id: new Date().getTime(),
        sequence: (tournament.stages[tournament.stages.length - 1]?.sequence || 0) + 1,
        name: stageForm.name,
        type: stageForm.type,
        teams: stageForm.teams,
      };

      if (stage.type === TournamentStageType.GROUPS) {
        const newStage: TournamentGroupsStage = {
          ...stage,
          type: stage.type,
          rules: {
            format: stageForm.format,
            groups: stageForm.groups,
            teamsPerGroup: stageForm.teamsPerGroup,
            rounds: stageForm.groupsRounds,
          },
        };

        tournament.stages.push(newStage);
        return;
      }

      const newStage: TournamentPlayoffsStage = {
        ...stage,
        type: stage.type,
        rounds: [],
      };

      tournament.stages.push(newStage);
    },
    removeStage(id: Tournament['id'], stageId: TournamentStage['id']) {
      const tournament = this.tournaments.find((tournament) => tournament.id === id);

      if (!tournament) throw new Error('Tournament not found');

      tournament.stages = tournament.stages.filter((stage) => stage.id !== stageId);
    },
  },
});
