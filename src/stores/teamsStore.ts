import type { AxiosResponse } from 'axios';
import type { Team, TeamListItem, TeamToBeCreated } from '@/types/Team';
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
    async getTeamById(id: string) {
      const { data: team }: AxiosResponse<Team> = await axios.get(`/teams/${id}`);

      return team;
    },
    async getTeamPacks() {
      const { data: teamPacks }: AxiosResponse<TeamPackListItem[]> = await axios.get('/team-packs');

      this.teamPacks = teamPacks;
    },
    async getTeamPackById(id: string) {
      const { data: teamPack }: AxiosResponse<TeamPack> = await axios.get(`/team-packs/${id}`);

      return teamPack;
    },
    applyTeamPack(id: string) {
      return axios.post(`/team-packs/${id}/apply`);
    },
    createManyTeams(teams: TeamToBeCreated[]) {
      return axios.post('/teams/createMany', { teams });
    },
  },
});