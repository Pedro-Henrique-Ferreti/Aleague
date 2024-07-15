import api from '@/api';
import type { TeamEmblem } from '@/types/Team';
import { defineStore } from 'pinia';

interface StoreState {
  teamEmblems: TeamEmblem[];
  isLoadingEmblems: boolean;
  showTeamEmblemsErrorMessage: boolean;
}

export const useTeamEmblemStore = defineStore('team-emblem', {
  state: (): StoreState => ({
    teamEmblems: [],
    isLoadingEmblems: false,
    showTeamEmblemsErrorMessage: false,
  }),
  actions: {
    async loadTeamEmblems() {
      this.isLoadingEmblems = true;
      this.showTeamEmblemsErrorMessage = false;

      try {
        const { data } = await api.teamService.getTeamEmblems();
        this.teamEmblems = data;
      } catch (error) {
        this.showTeamEmblemsErrorMessage = true;
      } finally {
        this.isLoadingEmblems = false;
      }
    },
  },
});
