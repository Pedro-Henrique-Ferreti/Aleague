import type { State } from '@/types/TeamsStore';
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
      const { data } = await axios.get('/teams');

      this.teams = data.data;
    },
  },
});