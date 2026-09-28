import { newDrawPot } from '~/helpers/draw';

export function useSeedingDraw(drawParticipants: Ref<DrawParticipant[]>) {
  const pots = ref([newDrawPot()]);
  const step = ref<DrawStep>(DrawStep.POTS);

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

  function previousStep() {
    step.value = DrawStep.POTS;
  }

  function nextStep() {
    if (step.value === DrawStep.POTS && !isPotsStepCompleted.value) return;

    step.value = DrawStep.PROCEDURE;
  }

  return {
    pots,
    participants: drawParticipants,
    isStepActive,
    isPotsStepCompleted,
    reset,
    previousStep,
    nextStep,
  };
}
