import { defineStore } from 'pinia';

interface StoreState {
  focusedTeamId: TeamDetails['id'][];
}

export const useTeamStore = defineStore('team', {
  state: (): StoreState => ({
    focusedTeamId: [],
  }),
  actions: {
    getTeamById(id?: TeamDetails['id'] | null): TeamDetails | undefined {
      return DETAILED_TEAM_LIST.find((team) => team.id === id);
    },
    focusMatchTeams({ homeTeam, awayTeam }: Match) {
      for (const team of [homeTeam.id, awayTeam.id]) {
        if (team !== null && !this.focusedTeamId.includes(team)) {
          this.focusedTeamId.push(team);
        }
      }
    },
    blurMatchTeams({ homeTeam, awayTeam }: Match) {
      this.focusedTeamId = this.focusedTeamId.filter((i) => i !== homeTeam.id && i !== awayTeam.id);
    },
  },
});
