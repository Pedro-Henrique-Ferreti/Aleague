import type {
  CompetitionFormat,
  ReloadCompetitionParams,
  UpdateCompetitionParams,
} from '@/types/Competition';
import type { League } from '@/types/League';
import type { PlayoffWithRounds } from '@/types/Playoff';
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

export const KEY_UPDATE_COMPETITION = Symbol() as InjectionKey<(params: UpdateCompetitionParams) => Promise<any>>;

export const KEY_DELETE_COMPETITION = Symbol() as InjectionKey<() => Promise<any>>;

export const KEY_RESTART_COMPETITION = Symbol() as InjectionKey<() => Promise<any>>;

export const KEY_RESET_COMPETITION_GAMES = Symbol() as InjectionKey<() => Promise<any>>;

export const KEY_RELOAD_COMPETITION = Symbol() as InjectionKey<(params?: ReloadCompetitionParams) => void>;

export const KEY_LEAGUE = Symbol() as InjectionKey<Ref<League>>;

export const KEY_PLAYOFF = Symbol() as InjectionKey<Ref<PlayoffWithRounds>>;
