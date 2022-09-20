import type { League, LeagueListItem, LeagueWithStandings } from '@/types/League';
import type { AxiosResponse } from 'axios';
import { defineStore } from 'pinia';
import axios from '@/helpers/axios';

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
    async getLeague(hashId: string) {
      const { data: league }: AxiosResponse<LeagueWithStandings> = await axios.get(`/leagues/${hashId}`);

      return league;
    },
    async createLeague({ name }: { name: string }) {
      const { data: { hashid } }: AxiosResponse<League> = await axios.post('/leagues', { name });

      return hashid;
    },
    updateLeague({ hashId , name }: { hashId: string, name: string }) {
      return axios.patch<League>(`/leagues/${hashId}`, { name });
    },
  },
});
