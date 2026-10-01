import { newDrawPot } from '~/helpers/draw';
import { getTeamSeedingGroups } from '~/helpers/stage-seeding';

function countTeams(array: TeamSeedingGroup['teams']): number {
  return array.filter(Boolean).length;
}

export function useSeedingDraw(
  drawParticipants: Ref<DrawParticipant[]>,
  seedingGroupsSource: Parameters<typeof getTeamSeedingGroups>[0],
) {
  const pots = ref([newDrawPot()]);
  const step = ref<DrawStep>(DrawStep.POTS);
  const procedureForm = ref<DrawProcedureForm>({
    groups: {},
  });

  const drewTeams = computed(() => Object.values(procedureForm.value.groups).flatMap(group => group.teams));

  const activePot = computed(() => pots.value.find(pot => pot.participants.some(team => !drewTeams.value.includes(team))));

  const remainingActivePotTeams = computed(() => (activePot.value?.participants ?? []).filter(t => !drewTeams.value.includes(t)));

  const potStatus = computed<Record<DrawPot['id'], DrawPotStatus>>(() => {
    return Object.fromEntries(pots.value.map((pot) => {
      if (pot.id === activePot.value?.id) {
        return [pot.id, DrawPotStatus.ACTIVE];
      }

      if (pot.participants.every(team => drewTeams.value.includes(team))) {
        return [pot.id, DrawPotStatus.COMPLETED];
      }

      return [pot.id, DrawPotStatus.IDLE];
    }));
  });

  const isStepActive = computed<Record<keyof typeof DrawStep, boolean>>(() => ({
    POTS: step.value === DrawStep.POTS,
    PROCEDURE: step.value === DrawStep.PROCEDURE,
  }));

  const isPotsStepCompleted = computed(() => {
    const { length: participantsCount } = drawParticipants.value;
    return participantsCount > 0 && pots.value.reduce((acc, pot) => acc + pot.participants.length, 0) === participantsCount;
  });

  const isProcedureStepCompleted = computed(() => {
    return Object.values(potStatus.value).every(status => status === DrawPotStatus.COMPLETED);
  });

  const activeTeamSeedingGroup = computed(() => {
    if (isProcedureStepCompleted.value) return undefined;

    return Object.values(procedureForm.value.groups).reduce((shortest, current) => {
      return countTeams(current.teams) < countTeams(shortest.teams) ? current : shortest;
    });
  });

  function reset() {
    pots.value = [newDrawPot()];
    step.value = DrawStep.POTS;
  }

  function resetProcedureStep() {
    procedureForm.value = {
      groups: Object.fromEntries(
        getTeamSeedingGroups(seedingGroupsSource, true).map(g => [g.order, g]),
      ),
    };
  }

  function previousStep() {
    step.value = DrawStep.POTS;
  }

  function nextStep() {
    if (step.value === DrawStep.POTS && !isPotsStepCompleted.value) return;

    step.value = DrawStep.PROCEDURE;
    resetProcedureStep();
  }

  function drawTeam() {
    if (!isStepActive.value.PROCEDURE || !activePot.value || !activeTeamSeedingGroup.value) return;

    const team = getRandomItem(remainingActivePotTeams.value);

    if (!team) return;

    const { order, teams } = activeTeamSeedingGroup.value;

    const firstEmptyIndex = teams.findIndex(t => !t);

    if (firstEmptyIndex === -1 || !procedureForm.value.groups[order]) return;

    procedureForm.value.groups[order]!.teams[firstEmptyIndex] = team;
  }

  return {
    pots,
    participants: drawParticipants,
    procedureForm,
    isStepActive,
    isPotsStepCompleted,
    isProcedureStepCompleted,
    drewTeams,
    activePot,
    potStatus,
    activeTeamSeedingGroup,
    reset,
    previousStep,
    nextStep,
    drawTeam,
  };
}
