import type { GetTeamsResponse, State } from '@/types/TeamsStore';
import type { AxiosResponse } from 'axios';
import axios from '@/helpers/axios';
import { defineStore } from 'pinia';

export const useTeamsStore = defineStore('teams', {
  state: () : State => {
    return {
      teams: [],
    };
  },
  actions: {
    async getTeams() {
      const { data }: AxiosResponse<GetTeamsResponse> = await axios.get('/teams');

      this.teams = data.data;
    },
  },
});