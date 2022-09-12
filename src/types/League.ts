export interface LeagueListItem {
  id: number;
  hashid: string;
  name: string;
  hasGames: boolean;
  numberOfCompletedGames: number;
  numberOfGameweeks: number | null;
  numberOfTeams: number | null;
  createdAt: string;
  updatedAt: string;
}
