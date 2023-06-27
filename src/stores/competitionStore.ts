import type { CompetitionListItem } from '@/types/Competition';
import { defineStore } from 'pinia';
import axios from '@/helpers/axios';

export const useCompetitionStore = defineStore('competition', {
  actions: {
    async getCompetitions() {
      const { data: competitionList } = await axios.get<CompetitionListItem[]>('/competitions');

      return competitionList;
    },
  },
});
