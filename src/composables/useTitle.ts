import type { MaybeRef } from 'vue';
import { useTitle as vueUseTitle } from '@vueuse/core';

export function useTitle(title: MaybeRef<string | null | undefined>) {
  return vueUseTitle(title, {
    titleTemplate: '%s | Aleague',
  });
}
