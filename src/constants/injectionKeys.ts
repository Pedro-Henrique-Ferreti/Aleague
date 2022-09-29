import type { LeagueWithStandings } from '@/types/League';
import type { InjectionKey, Ref } from 'vue';

export const INJECTION_KEYS = {
  league: Symbol() as InjectionKey<Ref<LeagueWithStandings>>,
  reloadLeague: Symbol() as InjectionKey<() => Promise<void>>,
};
