import { newDrawPot } from '~/helpers/draw';
import { getTeamSeedingGroups } from '~/helpers/stage-seeding';

export function useSeedingDraw(
  drawParticipants: Ref<DrawParticipant[]>,
  seedingGroupsSource: Parameters<typeof getTeamSeedingGroups>[0],
) {
  const pots = ref([newDrawPot()]);
  const step = ref<DrawStep>(DrawStep.POTS);
  const activePotIndex = ref(0);
  const procedureForm = ref<DrawProcedureForm>({
    groups: [],
  });

  const isStepActive = computed<Record<keyof typeof DrawStep, boolean>>(() => ({
    POTS: step.value === DrawStep.POTS,
    PROCEDURE: step.value === DrawStep.PROCEDURE,
  }));

  const isPotsStepCompleted = computed(() => {
    const { length: participantsCount } = drawParticipants.value;
    return participantsCount > 0 && pots.value.reduce((acc, pot) => acc + pot.participants.length, 0) === participantsCount;
  });

  function reset() {
    pots.value = [newDrawPot()];
    step.value = DrawStep.POTS;
  }

  function resetProcedureStep() {
    activePotIndex.value = 0;
    procedureForm.value = {
      groups: getTeamSeedingGroups(seedingGroupsSource, true),
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

  return {
    pots,
    participants: drawParticipants,
    procedureForm,
    activePotIndex,
    isStepActive,
    isPotsStepCompleted,
    reset,
    previousStep,
    nextStep,
  };
}
