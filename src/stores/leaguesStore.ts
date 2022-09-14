import type { LeagueListItem } from '@/types/League';
import { defineStore } from 'pinia';
import axios from '@/helpers/axios';
import type { AxiosResponse } from 'axios';

interface State {
  leagues: LeagueListItem[];
  searchBarValue: string;
}

export const useLeaguesStore = defineStore('leagues', {
  state: (): State => {
    return {
      leagues: [],
      searchBarValue: '',
    };
  },
  actions: {
    async getLeagues() {
      const { data: leagues }: AxiosResponse<LeagueListItem[]> = await axios.get('/leagues');

      this.leagues = leagues;
    },
  },
});
