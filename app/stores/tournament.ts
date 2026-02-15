import { defineStore } from 'pinia';
import { getBaseFileId, getTimestamp } from '~/helpers/file';
import { stageHasAllTeamsAssigned } from '~/helpers/stage';
import { newStandingsEntry } from '~/helpers/standings';
import { createMatchweeks, createStage } from '~/helpers/tournament';

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

      tournament.stages = tournament.stages.filter(stage => stage.id !== stageId);
    },
    updateStageTeams(payload: UpdateStageTeamsStorePayload) {
      const stage = this.getStage(payload.id, payload.stageId);

      if (stage.type === StageType.PLAYOFFS) {
        payload.form.forEach((group, index) => {
          const [home, away] = group.teams as [Team['id'], Team['id']];
          const { legs } = stage.rounds[0].slots[index]!;

          legs.forEach((_, index) => {
            legs[index]!.homeTeam.id = (index % 2 === 0) ? home : away;
            legs[index]!.awayTeam.id = (index % 2 === 0) ? away : home;
          });
        });
        return;
      }

      const queries: ReplaceTeamsInMatchweeksParams['queries'] = [];

      payload.form.forEach((group) => {
        const stageGroup = stage.groups.find(g => g.order === group.order);

        if (!stageGroup) throw new Error('Group not found');

        group.teams.forEach((team, index) => {
          const replacedTeam = stageGroup.standings[index]!.team;

          stageGroup.standings[index]!.team = team;

          if (team && replacedTeam) {
            queries.push({ search: replacedTeam, replace: team });
          }
        });
      });

      if (queries.length) {
        this.replaceTeamsInMatchweeks({ id: payload.id, stageId: payload.stageId, queries });
      }
    },
    createStageMatchweeks(id: Tournament['id'], stageId: TournamentGroupsStage['id']) {
      const stage = this.getStage(id, stageId);

      if (stage.type !== StageType.GROUPS) throw new Error('Stage type not supported');
      if (!stageHasAllTeamsAssigned(stage)) throw new Error('All teams must be assigned');

      // TODO: allow choosing format when creating matchweeks
      // TODO: alllow choosing number of round robins when creating matchweeks
      stage.matchweeks = createMatchweeks(stage.groups, GroupsStageFormat.ROUND_ROBIN, 1);
    },
    replaceTeamsInMatchweeks(payload: ReplaceTeamsInMatchweeksParams) {
      const stage = this.getTournament(payload.id).stages.find(stage => stage.id === payload.stageId);

      if (!stage || stage.type !== StageType.GROUPS) throw new Error('Stage not found');

      if (stage.matchweeks.length === 0) return;

      stage.matchweeks.forEach((matchweek) => {
        matchweek.matches.forEach((match) => {
          const { homeTeam, awayTeam } = match;

          let homeIsUpdated = false;
          let awayIsUpdated = false;

          payload.queries.filter(i => i.search === homeTeam.id || i.search === awayTeam.id).forEach((query) => {
            if (query.search === homeTeam.id && !homeIsUpdated) {
              homeTeam.id = query.replace;
              homeIsUpdated = true;
            }

            if (query.search === awayTeam.id && !awayIsUpdated) {
              awayTeam.id = query.replace;
              awayIsUpdated = true;
            }
          });
        });
      });
    },
    deleteMatchweeks(id: Tournament['id'], stageId: TournamentGroupsStage['id']) {
      const stage = this.getStage(id, stageId);

      if (stage.type !== StageType.GROUPS) throw new Error('Stage type not supported');

      stage.matchweeks = [];

      stage.groups.forEach((group, index) => {
        stage.groups[index]!.standings = group.standings.map(s => newStandingsEntry(s.id, s.team));
      });
    },
  },
});
