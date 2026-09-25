import { newDrawPot } from '~/helpers/draw';

export function useSeedingDraw() {
  const pots = ref([newDrawPot()]);
  const step = ref<DrawStep>(DrawStep.POTS);

  return {
    pots,
    step,
  };
}
