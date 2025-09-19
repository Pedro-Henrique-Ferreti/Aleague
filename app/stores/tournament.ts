import { defineStore } from 'pinia';
import type { Tournament } from '~/types/Tournament';

interface StoreState {
  tournaments: Tournament[];
}

export const useTournamentStore = defineStore('tournament', {
  state: (): StoreState => ({
    tournaments: [
      { id: 1, name: 'Campeonato 1' },
      { id: 2, name: 'Campeonato 2' },
      { id: 3, name: 'Campeonato 3' },
    ],
  }),
});
