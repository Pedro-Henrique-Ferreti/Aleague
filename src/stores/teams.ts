import type { AxiosResponse } from 'axios';
import type { Team, TeamListItem, TeamToBeCreated } from '@/types/Team';
import type { TeamPack, TeamPackListItem } from '@/types/TeamPack';
import { defineStore } from 'pinia';
import { axiosInstance } from '@/helpers/axios';

interface State {
  teams: TeamListItem[];
  teamPacks: TeamPackListItem[];
}

export const useTeamsStore = defineStore('teams', {
  state: () : State => {
    return {
      teams: [],
      teamPacks: [],
    };
  },
  actions: {
    async getTeams() {
      const { data: teams }: AxiosResponse<TeamListItem[]> = await axiosInstance.get('/teams');

      this.teams = teams;
    },
    async getTeamById(id: string) {
      const { data: team }: AxiosResponse<Team> = await axiosInstance.get(`/teams/${id}`);

      return team;
    },
    async getTeamPacks() {
      const { data: teamPacks }: AxiosResponse<TeamPackListItem[]> = await axiosInstance.get('/team-packs');

      this.teamPacks = teamPacks;
    },
    async getTeamPackById(id: string) {
      const { data: teamPack }: AxiosResponse<TeamPack> = await axiosInstance.get(`/team-packs/${id}`);

      return teamPack;
    },
    applyTeamPack(id: string) {
      return axiosInstance.post(`/team-packs/${id}/apply`);
    },
    createManyTeams(teams: TeamToBeCreated[]) {
      return axiosInstance.post('/teams/create-many', { teams });
    },
  },
});