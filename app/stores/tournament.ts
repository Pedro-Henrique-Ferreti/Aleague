import { defineStore } from 'pinia';
import { allTeamsAssigned } from '~/helpers/stage';
import { createMatchweeks, createStage } from '~/helpers/tournament';

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
    getStage(id: Tournament['id'], stageId: TournamentStage['id']): TournamentStage {
      const stage = this.getTournament(id).stages.find((stage) => stage.id === stageId);

      if (!stage) throw new Error('Stage not found');

      return stage;
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
    editStage(payload: EditStageStorePayload) {
      const stage = this.getStage(payload.id, payload.stageId);

      stage.name = payload.stageForm.name;
    },
    removeStage(id: Tournament['id'], stageId: TournamentStage['id']) {
      const tournament = this.getTournament(id);

      tournament.stages = tournament.stages.filter((stage) => stage.id !== stageId);
    },
    updateStageTeams(payload: UpdateStageTeamsStorePayload) {
      const stage = this.getStage(payload.id, payload.stageId);

      if (stage.type !== TournamentStageType.GROUPS) throw new Error('Stage type not supported');
      
      payload.form.forEach((group) => {
        const stageGroup = stage.groups.find((g) => g.order === group.order);

        if (!stageGroup) throw new Error('Group not found');

        group.teams.forEach((team, index) => {
          stageGroup.standings[index]!.team = team;
        });
      });
    },
    createStageMatchweeks(id: Tournament['id'], stageId: TournamentGroupsStage['id']) {
      const stage = this.getStage(id, stageId);

      if (stage.type !== TournamentStageType.GROUPS) throw new Error('Stage type not supported');
      if (!allTeamsAssigned(stage)) throw new Error('All teams must be assigned');

        stage.matchweeks = createMatchweeks(stage);
      };
    },
  },
});
