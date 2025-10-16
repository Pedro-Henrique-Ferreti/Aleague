import { defineStore } from 'pinia';
import { allTeamsAssigned } from '~/helpers/stage';
import { createMatchweeks, createStage } from '~/helpers/tournament';

export const useTournamentStore = defineStore('tournament', {
  state: (): StoreState => ({
    tournaments: [],
    activeTournamentId: null,
  }),
  actions: {
    getTournament(id: Tournament['id'] | null): Tournament {
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
        analytics: null,
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
        const stageGroup = stage.groups.find((g) => g.order === group.order);

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
      if (!allTeamsAssigned(stage)) throw new Error('All teams must be assigned');

      stage.matchweeks = createMatchweeks(stage);
    },
    replaceTeamsInMatchweeks(payload: ReplaceTeamsInMatchweeksParams) {
      const stage = this.getTournament(payload.id).stages.find((stage) => stage.id === payload.stageId);

      if (!stage || stage.type !== StageType.GROUPS) throw new Error('Stage not found');

      if (stage.matchweeks.length === 0) return;

      stage.matchweeks.forEach((matchweek) => {
        matchweek.matches.forEach((match) => {
          const { homeTeam, awayTeam } = match;

          let homeIsUpdated = false;
          let awayIsUpdated = false;

          payload.queries.filter((i) => i.search === homeTeam.id || i.search === awayTeam.id).forEach((query) => {
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
        stage.groups[index]!.standings = group.standings.map((s) => ({
          id: s.id,
          team: s.team,
          home: { points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0 },
          away: { points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0 },
        }));
      });
    },
    finalizeActiveTournament() {
      const tournament = this.getTournament(this.activeTournamentId);

      tournament.analytics = {
        firstPlace: 1,
      };
    },
  },
});
