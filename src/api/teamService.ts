import type { ApiGetAllTeamsResponse } from '@/types/Team';
import { axiosInstance } from '@/helpers/axios';

export default class TeamService {
  static getAllTeams() {
    return axiosInstance.get<ApiGetAllTeamsResponse>('/teams');
  }
}
