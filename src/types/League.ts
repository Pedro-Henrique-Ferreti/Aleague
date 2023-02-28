import type { Game, GameTeam } from './Game';

export type LeagueStandingMovement = number | null;

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
  gamesTied: number;
  gamesLost: number;
  gamesPlayed: number;
  gamesWon: number;
  goalDifference: number;
  goalsAgainst: number;
  goalsFor: number;
  points: number;
  recentGames: LeagueGame[];
  teamId: string;
  teamName: string;
  movement: LeagueStandingMovement;
}

export interface LeagueParticipant {
  id: string;
  name: string;
  created: boolean;
}

export interface League {
  id: string;
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

export interface LeagueTeamStatistics {
  home: {
		gamesPlayed: number;
		wins: number;
		ties: number;
		losses: number;
	};
  away: {
		gamesPlayed: number;
		wins: number;
		ties: number;
		losses: number;
	};
	streak: {
		win: number;
		tie: number;
		loss: number;
		maxWin: number;
		maxTie: number;
		maxLoss: number;
	};
	completedGames: LeagueGame[];
}
