import type { CompetitionListItem } from '@/types/Competition';
import { defineStore } from 'pinia';
import axios from '@/helpers/axios';

interface State {
  searchBarValue: string;
}

export const useCompetitionStore = defineStore('competition', {
  state: (): State => {
    return {
      searchBarValue: '',
    };
  },
  actions: {
    async getCompetitions() {
      const { data: competitionList } = await axios.get<CompetitionListItem[]>('/competitions');

      return competitionList;
    },
  },
});
