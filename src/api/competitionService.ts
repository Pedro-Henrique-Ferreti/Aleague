import type { CompetitionListItem } from '@/types/Competition';
import { axiosInstance } from '@/helpers/axios';

export default class CompetitionService {
  static getCompetitions() {
    return axiosInstance.get<CompetitionListItem[]>('/competitions');
  }
}
