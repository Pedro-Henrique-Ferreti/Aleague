import { replaceGroupStageTeams } from '~/features/tournament/helpers/group-stage-teams';
import { resetMatchScore } from '~/features/tournament/helpers/match-score';
import { replacePlayoffRoundTeams } from '~/features/tournament/helpers/playoff-round';
import { newStandingsEntry } from '~/features/tournament/helpers/standings';
import { useStageSelection } from '../composables/useStageSelection';

export const useStageStore = defineStore('stage', () => {
  const tournamentStore = useTournamentStore();
  const { activeTournament } = storeToRefs(tournamentStore);
  const { selectedStageId, selectedPlayoffRoundId, stageOptions } = useStageSelection();

  const legendsModalIsOpen = ref(false);

  const activeStageIndex = computed(() => {
    return activeTournament.value?.stages.findIndex(stage => stage.id === selectedStageId.value) ?? -1;
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

  const activePlayoffStage = computed({
    get: () => activeStage.value?.type === StageType.PLAYOFF ? activeStage.value : undefined,
    set: (value: PlayoffStage) => activeStage.value = value,
  });

  function updateActiveStage(form: StageForm) {
    if (!activeStage.value) return;

    activeStage.value.name = form.name;

    if (activeStage.value.type === StageType.GROUP) {
      activeStage.value.nameFormat = form.groupNameFormat;
    }
  }

  function deleteActiveStage() {
    if (!activeTournament.value || !activeStage.value) return;

    activeTournament.value.stages = activeTournament.value.stages.filter(stage => stage.id !== activeStage.value?.id);
  }

  function updateActiveStageTeams(form: StageSeedingForm) {
    if (!activeStage.value) return;

    if (activeStage.value.type === StageType.PLAYOFF) {
      replacePlayoffRoundTeams(activeStage.value.rounds[0], form);
    } else {
      replaceGroupStageTeams(activeStage.value, form);
    }
  }

  // Group stage
  function resetGroupStageStandings() {
    for (const group of activeGroupStage.value?.groups ?? []) {
      group.standings = group.standings.map(s => newStandingsEntry(s.team, s.id));
    }
  }

  function addGroupStageMatchweeks(matchweeks: Matchweek[]) {
    if (!activeGroupStage.value) return;

    activeGroupStage.value.matchweeks = matchweeks;
  }

  function resetGroupStageMatchesScore() {
    if (!activeGroupStage.value) return;

    for (const matchweek of activeGroupStage.value.matchweeks) {
      matchweek.matches.forEach(resetMatchScore);
    }

    resetGroupStageStandings();
  }

  function deleteGroupStageMatchweeks() {
    if (!activeGroupStage.value) return;

    activeGroupStage.value.matchweeks = [];

    resetGroupStageStandings();
  }

  return {
    selectedStageId,
    selectedPlayoffRoundId,
    stageOptions,
    activeStage,
    activeGroupStage,
    activePlayoffStage,
    legendsModalIsOpen,
    updateActiveStage,
    deleteActiveStage,
    deleteGroupStageMatchweeks,
    addGroupStageMatchweeks,
    updateActiveStageTeams,
    resetGroupStageMatchesScore,
  };
});
