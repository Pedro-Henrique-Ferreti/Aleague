import { defineStore } from 'pinia';
import { updateGroupStageTeams, updatePlayoffStageTeams } from '~/helpers/stage-teams';
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

  const activeGroupStage = computed({
    get: () => activeStage.value?.type === StageType.GROUP ? activeStage.value : undefined,
    set: (value: GroupStage) => activeStage.value = value,
  });

  function updateActiveStage(form: StageForm) {
    if (!activeStage.value) return;

    activeStage.value.name = form.name;
  }

  function deleteActiveStage() {
    if (!activeTournament.value || !activeStage.value) return;

    activeTournament.value.stages = activeTournament.value.stages.filter(stage => stage.id !== activeStage.value?.id);
  }

  function addGroupMatchweeks(matchweeks: Matchweek[]) {
    if (!activeGroupStage.value) return;

    activeGroupStage.value.matchweeks = matchweeks;
  }

  function deleteGroupMatchweeks() {
    if (!activeGroupStage.value) return;

    activeGroupStage.value.matchweeks = [];

    for (const group of activeGroupStage.value.groups) {
      group.standings = group.standings.map(s => newStandingsEntry(s.id, s.team));
    }
  }

  function updateActiveStageTeams(form: StageTeamsForm) {
    if (!activeStage.value) return;

    if (activeStage.value.type === StageType.PLAYOFF) {
      activeStage.value = updatePlayoffStageTeams(activeStage.value, form);
    } else {
      activeStage.value = updateGroupStageTeams(activeStage.value, form);
    }
  }

  return {
    activeStage,
    activeStageIndex,
    activeGroupStage,
    updateActiveStage,
    deleteActiveStage,
    deleteGroupMatchweeks,
    addGroupMatchweeks,
    updateActiveStageTeams,
  };
});
