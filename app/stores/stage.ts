import { defineStore } from 'pinia';
import { newStandingsEntry } from '~/helpers/standings';

export const useStageStore = defineStore('stage', () => {
  const tournamentStore = useTournamentStore();
  const stageSelectorStore = useStageSelectorStore();
  const { activeTournament } = storeToRefs(tournamentStore);
  const { selectedStageOrPlayoffRoundId } = storeToRefs(stageSelectorStore);

  const activeStageIndex = computed(() => {
    return activeTournament.value?.stages.findIndex((stage) => {
      if (stage.type === StageType.GROUP) {
        return stage.id === selectedStageOrPlayoffRoundId.value;
      }

      return stage.rounds.some(round => round.id === selectedStageOrPlayoffRoundId.value);
    }) ?? -1;
  });

  const activeStage = computed({
    get: () => activeTournament.value?.stages[activeStageIndex.value],
    set(value: TournamentStage) {
      if (activeTournament.value?.stages[activeStageIndex.value]) {
        activeTournament.value.stages[activeStageIndex.value] = value;
      }
    },
  });

  function addMatchweeks(id: Tournament['id'], stageId: GroupStage['id'], matchweeks: Matchweek[]) {
    const stage = tournamentStore.getStage(id, stageId);

    if (stage.type !== StageType.GROUP) throw new Error('Stage type not supported');

    stage.matchweeks = matchweeks;
  }

  function deleteMatchweeks(id: Tournament['id'], stageId: GroupStage['id']) {
    const stage = tournamentStore.getStage(id, stageId);

    if (stage.type !== StageType.GROUP) throw new Error('Stage type not supported');

    stage.matchweeks = [];

    stage.groups.forEach((group, index) => {
      stage.groups[index]!.standings = group.standings.map(s => newStandingsEntry(s.id, s.team));
    });
  }

  function updateStageTeams(payload: UpdateStageTeamsStorePayload) {
    const stage = tournamentStore.getStage(payload.id, payload.stageId);

    if (stage.type === StageType.PLAYOFF) {
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
      replaceTeamsInMatchweeks({ id: payload.id, stageId: payload.stageId, queries });
    }
  }

  function replaceTeamsInMatchweeks(payload: ReplaceTeamsInMatchweeksParams) {
    const stage = tournamentStore.getTournament(payload.id).stages.find(stage => stage.id === payload.stageId);

    if (!stage || stage.type !== StageType.GROUP) throw new Error('Stage not found');

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
  }

  return {
    activeStage,
    activeStageIndex,
    deleteMatchweeks,
    addMatchweeks,
    updateStageTeams,
  };
});
