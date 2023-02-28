export interface TeamPack {
  id: string;
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
  id: string;
  name: string;
  icon: string;
  teamsCount: number;
  applied: boolean;
}
