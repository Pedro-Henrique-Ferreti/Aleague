export interface StandingsEntry {
  id: number;
  position: number;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  team: Team | null;
  // positionColor: PositionColor;
  // recentGames: FinishedMatch[];
}
