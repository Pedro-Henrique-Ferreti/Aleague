import type { AxiosResponse } from 'axios';
import type {
  League,
  LeagueListItem,
  LeagueParticipant,
  LeagueWithStandings,
} from '@/types/League';
import type { Playoff } from '@/types/Playoff';
import type {
  SaveLeagueGamesParams,
  UpdateLeagueRulesParams,
  UpdatePlayoffRulesParams,
} from '@/types/LeaguesStore';
import type { Gameweek } from '@/types/Game';
import { defineStore } from 'pinia';
import axios from '@/helpers/axios';
import { PARTICIPANTS_BY_ROUND } from '@/constants/playoffs';
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
    // League
    async getLeagueById(hashId: string) {
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
    deleteLeague(hashId: string) {
      return axios.delete(`/leagues/${hashId}`);
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
    async getLeagueGameweeks(leagueId: string) {
      const {
        data: gameweekList,
      }: AxiosResponse<Gameweek[]> = await axios.get(`/leagues/${leagueId}/gameweeks`);

      return gameweekList;
    },
    saveLeagueGames({ leagueId, games }: SaveLeagueGamesParams) {
      return axios.patch(`/leagues/${leagueId}/games/updateMany`, { games });
    },
    // Playoff
    async getPlayoffById(hashId: string) {
      const { data: playoff }: AxiosResponse<Playoff> = await axios.get(`/playoffs/${hashId}`);

      return playoff;
    },
    async createPlayoff({ name }: { name: string }) {
      const { data: { hashid } }: AxiosResponse<Playoff> = await axios.post('/playoffs', { name });

      return hashid;
    },
    updatePlayoff({ hashId , name }: { hashId: string, name: string }) {
      return axios.patch<Playoff>(`/playoffs/${hashId}`, { name });
    },
    updatePlayoffRules({ hashId, numberOfRounds, numberOfLegs }: UpdatePlayoffRulesParams) {
      return axios.patch<Playoff>(`/playoffs/${hashId}/rules`, {
        numberOfLegs,
        numberOfTeams: PARTICIPANTS_BY_ROUND.find(
          ({ numberOfRounds: n }) => n === numberOfRounds,
        )?.numberOfParticipants,
      });
    },
  },
});
