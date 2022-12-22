import type { CompetitionFormat } from '@/types/Competition';
import type { LeagueWithStandings } from '@/types/League';
import type { InjectionKey, Ref, ComputedRef } from 'vue';

interface CompetitionDetails {
  name: string;
  format: CompetitionFormat;
  numberOfTeams: number;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export const KEY_COMPETITION_DETAILS = Symbol() as InjectionKey<ComputedRef<CompetitionDetails>>;

export const injectionKeys = {
  LEAGUE: Symbol() as InjectionKey<Ref<LeagueWithStandings>>,
  RELOAD_LEAGUE: Symbol() as InjectionKey<({ showLoader }: { showLoader?: boolean }) => Promise<void>>,
};
