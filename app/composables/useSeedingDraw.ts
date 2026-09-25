import { newDrawPot } from '~/helpers/draw';

export function useSeedingDraw() {
  const pots = ref([newDrawPot()]);

  return {
    pots,
  };
}
