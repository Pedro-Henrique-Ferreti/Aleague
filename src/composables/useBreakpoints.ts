import { useBreakpoints as useVueuseBreakpoints } from '@vueuse/core';
import { Breakpoints } from '@/constants/breakpoints';

export function useBreakpoints(customBreakpoints: { [key: string]: number } = {}) {
  const breakpoints = useVueuseBreakpoints({
    ...Breakpoints,
    ...customBreakpoints,
  });

  return breakpoints;
}
