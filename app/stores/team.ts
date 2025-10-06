import { defineStore } from 'pinia';

interface StoreState {
  teamList: TeamDetails[];
}

export const useTeamStore = defineStore('team', {
  state: (): StoreState => ({
    teamList: DETAILED_TEAM_LIST,
  }),
  actions: {
    getTeamById(id?: TeamDetails['id'] | null): TeamDetails | undefined {
      return this.teamList.find((team) => team.id === id);
    },
  },
});
