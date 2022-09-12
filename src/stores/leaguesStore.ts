import type { LeagueListItem } from '@/types/League';
import { defineStore } from 'pinia';
import axios from '@/helpers/axios';

interface State {
  leagues: LeagueListItem[];
}

export const useLeaguesStore = defineStore('leagues', {
  state: (): State => {
    return {
      leagues: [],
    };
  },
  actions: {
    async getLeagues() {
      const { data } = await axios.get('/leagues');

      this.leagues = data.data as LeagueListItem[];
    },
  },
});
