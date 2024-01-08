import type { CompetitionListItem } from '@/types/Competition';
import { defineStore } from 'pinia';
import { axiosInstance } from '@/helpers/axios';

export const useCompetitionStore = defineStore('competition', {
  actions: {
    async getCompetitions() {
      const { data: competitionList } = await axiosInstance.get<CompetitionListItem[]>('/competitions');

      return competitionList;
    },
  },
});
