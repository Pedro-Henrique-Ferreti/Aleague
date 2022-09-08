export interface TeamPack {
  id: string;
  hashid: string;
  name: string;
  description: string;
  icon: string;
  teams: TeamPackTeam[];
}

export interface TeamPackTeam {
  name: string;
  created: boolean;
}

export interface TeamPackListItem {
  id: number;
  name: string;
  icon: string;
  hashid: string;
  teamsCount: number;
  applied: boolean;
}
