import type { AxiosResponse } from 'axios';
import type { Team, TeamListItem } from '@/types/Team';
import type { TeamPack, TeamPackListItem } from '@/types/TeamPack';
import axios from '@/helpers/axios';
import { defineStore } from 'pinia';

interface State {
  teams: TeamListItem[];
  teamPacks: TeamPackListItem[];
  searchBarValue: string;
}

export const useTeamsStore = defineStore('teams', {
  state: () : State => {
    return {
      teams: [],
      teamPacks: [],
      searchBarValue: '',
    };
  },
  actions: {
    async getTeams() {
      const { data: teams }: AxiosResponse<TeamListItem[]> = await axios.get('/teams');

      this.teams = teams;
    },
    async getTeamById(hashId: string) {
      const { data: team }: AxiosResponse<Team> = await axios.get(`/teams/${hashId}`);

      return team;
    },
    async getTeamPacks() {
      const { data: teamPacks }: AxiosResponse<TeamPackListItem[]> = await axios.get('/team-packs');

      this.teamPacks = teamPacks;
    },
    async getTeamPackById(hashId: string) {
      const { data: teamPack }: AxiosResponse<TeamPack> = await axios.get(`/team-packs/${hashId}`);

      return teamPack;
    },
    applyTeamPack(hashId: string) {
      return axios.post(`/team-packs/${hashId}/apply`);
    },
  },
});