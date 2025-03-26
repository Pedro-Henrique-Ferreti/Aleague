import type { Tournament } from '@/types/Tournament';
import type { InjectionKey } from 'vue';

export const KEY_TOURNAMENT = Symbol('tournament') as InjectionKey<Tournament>;
