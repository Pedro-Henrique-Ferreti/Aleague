import { defineStore } from 'pinia';
import { getBaseFileId, getTimestamp } from '~/helpers/file';
import { newTournamentStage } from '~/helpers/tournament';

export const useTournamentStore = defineStore('tournament', {
  state: (): StoreState => ({
    tournaments: [],
    activeTournamentId: null,
  }),
  getters: {
    activeTournament: state => state.tournaments.find(t => t.id === state.activeTournamentId),
    nonCollectionTournaments: state => state.tournaments.filter(t => !t.collectionId),
  },
  actions: {
    createTournament(payload: TournamentForm) {
      const timestamp = getTimestamp();
      const tournament: Tournament = {
        ...payload,
        id: getBaseFileId(),
        collectionId: null,
        createdAt: timestamp,
        updatedAt: timestamp,
        stages: [],
      };

      this.tournaments.push(tournament);

      return tournament;
    },
    getTournament(id: Tournament['id'] | null): Tournament {
      const tournament = this.tournaments.find(i => i.id === id);

      if (!tournament) throw new Error('Tournament not found');

      return tournament;
    },
    getStage(id: Tournament['id'], stageId: TournamentStage['id']): TournamentStage {
      const stage = this.getTournament(id).stages.find(i => i.id === stageId);

      if (!stage) throw new Error('Stage not found');

      return stage;
    },
    updateTournament(id: Tournament['id'] | null, payload: TournamentForm) {
      const index = this.tournaments.findIndex(i => i.id === id);

      if (index === -1) throw new Error('Tournament not found');

      this.tournaments[index] = {
        ...this.tournaments[index] as Tournament,
        ...payload,
      };
    },
    duplicateTournament(id: Tournament['id']) {
      const parse = (str: string) => str.replace(/\(\d+\)/, '').trim();
      const tournament = clone(this.getTournament(id));
      const newId = getBaseFileId();
      const name = parse(tournament.name);
      const number = this.tournaments.filter(t => parse(t.name).startsWith(name)).length + 1;
      const timestamp = getTimestamp();

      this.tournaments.push({
        ...tournament,
        id: newId,
        name: `${name} (${number})`,
        createdAt: timestamp,
        updatedAt: timestamp,
      });

      this.activeTournamentId = newId;
    },
    deleteTournament(id: Tournament['id']) {
      const index = this.tournaments.findIndex(i => i.id === id);

      this.tournaments.splice(index, 1);

      this.activeTournamentId = this.tournaments[index]?.id || (this.tournaments[this.tournaments.length - 1]?.id || null);
    },
    addStage(id: Tournament['id'], stageForm: StageForm) {
      const tournament = this.getTournament(id);

      tournament.stages.push(newTournamentStage(stageForm, tournament.stages));
    },
    editStage(payload: EditStageStorePayload) {
      const stage = this.getStage(payload.id, payload.stageId);

      stage.name = payload.stageForm.name;
    },
    removeStage(id: Tournament['id'], stageId: TournamentStage['id']) {
      const tournament = this.getTournament(id);

      tournament.stages = tournament.stages.filter(stage => stage.id !== stageId);
    },
    
  },
});
