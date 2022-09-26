import type { AxiosResponse } from 'axios';
import type { League, LeagueListItem, LeagueParticipant, LeagueWithStandings } from '@/types/League';
import type { UpdateLeagueRulesParams } from '@/types/LeaguesStore';
import { defineStore } from 'pinia';
import axios from '@/helpers/axios';
import { useTeamsStore } from './teamsStore';

interface State {
  leagues: LeagueListItem[];
  searchBarValue: string;
}

export const useLeaguesStore = defineStore('leagues', {
  state: (): State => {
    return {
      leagues: [],
      searchBarValue: '',
    };
  },
  actions: {
    async getLeagues() {
      const { data: leagues }: AxiosResponse<LeagueListItem[]> = await axios.get('/leagues');

      this.leagues = leagues;
    },
    async getLeague(hashId: string) {
      const { data: league }: AxiosResponse<LeagueWithStandings> = await axios.get(`/leagues/${hashId}`);

      return league;
    },
    async createLeague({ name }: { name: string }) {
      const { data: { hashid } }: AxiosResponse<League> = await axios.post('/leagues', { name });

      return hashid;
    },
    updateLeague({ hashId , name }: { hashId: string, name: string }) {
      return axios.patch<League>(`/leagues/${hashId}`, { name });
    },
    updateLeagueRules({ hashId, numberOfTeams, awayGames }: UpdateLeagueRulesParams) {
      return axios.patch<League>(`/leagues/${hashId}/rules`, {
        numberOfTeams,
        awayGames,
      });
    },
    addLeagueTeams(id: string, teams: number[]) {
      return axios.post(`/leagues/${id}/teams`, { teams });
    },
    async saveLeagueParticipants(leagueId: string, participants: LeagueParticipant[]) {
      const teamsStore = useTeamsStore();

      const teamsNotCreated = participants.filter(({ created }) => !created);

      if (teamsNotCreated.length > 0) {
        await teamsStore.createManyTeams(teamsNotCreated.map(({ name }) => ({ name })));
        await teamsStore.getTeams();
      }

      const teamIds: number[] = [];

      participants.forEach((participant) => {
        const id = (participant.created)
          ? participant.id
          : teamsStore.teams.find(({ name }) => name === participant.name)?.id;

        if (id) {
          teamIds.push(id);
        }
      });

      return this.addLeagueTeams(leagueId, teamIds);
    },
  },
});
