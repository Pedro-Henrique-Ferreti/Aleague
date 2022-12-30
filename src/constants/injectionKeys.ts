import type {
  CompetitionFormat,
  ReloadCompetitionParams,
  UpdateCompetitionParams,
} from '@/types/Competition';
import type { LeagueWithGameweeks } from '@/types/League';
import type { PlayoffWithStandings } from '@/types/Playoff';
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

export const KEY_RELOAD_COMPETITION = Symbol() as InjectionKey<(params?: ReloadCompetitionParams) => void>;

export const KEY_LEAGUE = Symbol() as InjectionKey<Ref<LeagueWithGameweeks>>;

export const KEY_PLAYOFF = Symbol() as InjectionKey<Ref<PlayoffWithStandings>>;
