import type { TeamListItem } from '@/types/Team';
import { axiosInstance } from '@/helpers/axios';

export default class TeamService {
  static getTeamList() {
    return axiosInstance.get<TeamListItem[]>('/teams');
  }
}
