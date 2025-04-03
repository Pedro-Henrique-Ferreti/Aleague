import type { Tournament, TournamentStage } from '@/types/Tournament';
import type { InjectionKey } from 'vue';

export const KEY_TOURNAMENT = Symbol('tournament') as InjectionKey<Tournament>;
export const KEY_TOURNAMENT_STAGE = Symbol('tournament-stage') as InjectionKey<TournamentStage>;
