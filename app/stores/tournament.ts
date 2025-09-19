import { defineStore } from 'pinia';
import type { Tournament } from '~/types/Tournament';

interface StoreState {
  tournaments: Tournament[];
}

export const useTournamentStore = defineStore('tournament', {
  state: (): StoreState => ({
    tournaments: [],
  }),
});
