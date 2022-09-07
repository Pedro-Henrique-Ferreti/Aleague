import type { AxiosResponse } from 'axios';
import type { GetTeamsResponse, State } from '@/types/TeamsStore';
import type { TeamPack, TeamPackListItem } from '@/types/TeamPack';
import axios from '@/helpers/axios';
import { defineStore } from 'pinia';

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
      const { data }: AxiosResponse<GetTeamsResponse> = await axios.get('/teams');

      this.teams = data.data;
    },
    async getTeamPacks() {
      const { data: teamPacks }: AxiosResponse<TeamPackListItem[]> = await axios.get('/team-packs');

      this.teamPacks = teamPacks;
    },
    async getTeamPackById(hashId: string): Promise<TeamPack> {
      const { data: teamPack }: AxiosResponse<TeamPack> = await axios.get(`/team-packs/${hashId}`);

      return teamPack;
    },
  },
});