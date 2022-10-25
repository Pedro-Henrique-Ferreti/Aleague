import type { LeagueWithStandings } from '@/types/League';
import type { InjectionKey, Ref } from 'vue';

export const injectionKeys = {
  LEAGUE: Symbol() as InjectionKey<Ref<LeagueWithStandings>>,
  RELOAD_LEAGUE: Symbol() as InjectionKey<({ showLoader }: { showLoader?: boolean }) => Promise<void>>,
};
