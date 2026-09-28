import { newDrawPot } from '~/helpers/draw';

export function useSeedingDraw() {
  const pots = ref([newDrawPot()]);
  const step = ref<DrawStep>(DrawStep.POTS);

  function reset() {
    pots.value = [newDrawPot()];
    step.value = DrawStep.POTS;
  }

  return {
    pots,
    step,
    reset,
  };
}
