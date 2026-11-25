import { replaceGroupStageTeams } from '~/features/tournament/helpers/group-stage-teams';
import { resetMatchScore } from '~/features/tournament/helpers/match-score';
import { replacePlayoffRoundTeams } from '~/features/tournament/helpers/playoff-round';
import { newStandingsEntry } from '~/features/tournament/helpers/standings';
import { useStageSelection } from '../composables/useStageSelection';
import { getTournamentStageList } from '../helpers/tournament';

export const useStageStore = defineStore('stage', () => {
  const tournamentStore = useTournamentStore();
  const { activeTournament } = storeToRefs(tournamentStore);
  const { selectedStageId, selectedPlayoffRoundId } = useStageSelection();

  const legendsModalIsOpen = ref(false);

  const activeStage = computed({
    get: () => selectedStageId.value ? activeTournament.value?.stages[selectedStageId.value] : undefined,
    set(value: TournamentStage) {
      if (selectedStageId.value && activeTournament.value) {
        activeTournament.value.stages[selectedStageId.value] = value;
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
    if (activeTournament.value && activeStage.value) {
      delete activeTournament.value.stages[activeStage.value.id];
      selectedStageId.value = getTournamentStageList(activeTournament.value.stages).at(-1)?.id;
    }
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
