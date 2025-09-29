import { defineStore } from 'pinia';

interface StoreState {
  teamList: TeamDetails[];
}

export const useTeamStore = defineStore('team', {
  state: (): StoreState => ({
    teamList: DETAILED_TEAM_LIST,
  }),
});
