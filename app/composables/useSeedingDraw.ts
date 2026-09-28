import { newDrawPot } from '~/helpers/draw';

export function useSeedingDraw(drawParticipants: Ref<DrawParticipant[]>) {
  const pots = ref([newDrawPot()]);
  const step = ref<DrawStep>(DrawStep.POTS);

  const isPotsStepCompleted = computed(() => {
    const { length: participantsCount } = drawParticipants.value;
    return participantsCount > 0 && pots.value.reduce((acc, pot) => acc + pot.participants.length, 0) === participantsCount;
  });

  function reset() {
    pots.value = [newDrawPot()];
    step.value = DrawStep.POTS;
  }

  return {
    pots,
    step,
    participants: drawParticipants,
    isPotsStepCompleted,
    reset,
  };
}
