import type { Game, GameTeam } from './Game';

export interface LeagueGame extends Game {
  awayTeam: GameTeam;
  homeTeam: GameTeam;
  awayTeamScore: number;
  homeTeamScore: number;
  gameweek: number;
}

export interface LeagueGameweek {
  gameweek: number;
  games: LeagueGame[];
}

export interface LeagueStanding {
  gamesDrawn: number;
  gamesLost: number;
  gamesPlayed: number;
  gamesWon: number;
  goalDifference: number;
  goalsAgainst: number;
  goalsFor: number;
  points: number;
  recentGames: LeagueGame[];
  teamHashid: string;
  teamId: number;
  teamName: string;
}

export interface LeagueParticipant {
  id: number,
  name: string;
  created: boolean;
}

export interface League {
  id: number;
  hashid: string;
  name: string;
  numberOfTeams: number | null;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface LeagueWithStandings extends League {
  numberOfGameweeks: number;
  standings: LeagueStanding[] | null,
}
