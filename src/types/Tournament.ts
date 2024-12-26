import { TournamentFormat, TournamentStageConfrontation } from '@/constants/tournament';
import type { ValueOf } from './Auth';
import type { FinishedMatch, Match, MatchTeam } from './Match';

export enum TournamentStageType {
  GROUPS = 'groups',
  PLAYOFFS = 'playoffs',
}

export type TypeTournamentFormat = ValueOf<typeof TournamentFormat>;
export type TypeStageConfrontationType = ValueOf<typeof TournamentStageConfrontation>;

export interface GroupsStageRules {
  numberOfTeams: number;
  numberOfGroups: number;
  numberOfTeamsPerGroup: number;
  numberOfLegs: number;
  confrontationType: TypeStageConfrontationType,
  qualification: {
    fromPreviousStages: {
      numberOfTeams: number;
    } | null;
    directlyInThisStage: {
      numberOfTeams: number;
      fixedTeams: string[];
    } | null;
  } | null;
}

export interface PlayoffsStageRules {
  numberOfTeams: number;
  isDoubleLegged: boolean;
  finalRoundIsDoubleLegged: boolean;
  qualification: {
    fromPreviousStages: null;
    directlyInThisStage: {
      numberOfTeams: number;
      fixedTeams: [];
    } | null;
  } | null;
}

export interface TournamentStageGameweek {
  gameweek: number;
  matches: Match[];
}

export interface TournamentStageStandings {
  id: string;
  position: number;
  points: number;
  gamesPlayed: number;
  wins: number;
  ties: number;
  loses: number;
  goalsFor: number;
  goalsAgainst: number;
  team: MatchTeam;
  recentGames: FinishedMatch[];
}

export interface TournamentStageRoundMatchup {
  id: string;
  nextRoundMatchupId: string | null;
  firstTeam: MatchTeam | null;
  secondTeam: MatchTeam | null;
  games: [Match] | [Match, Match];
}

export interface TournamentStageRound {
  id: string;
  name: string;
  sequence: number;
  matchups: TournamentStageRoundMatchup[];
}

interface BaseTournamentStage {
  id: string;
  name: string | null;
  sequence: number;
  type: TournamentStageType;
  rules: GroupsStageRules | PlayoffsStageRules;
}

export interface TournamentGroupsStage extends BaseTournamentStage {
  type: TournamentStageType.GROUPS;
  rules: GroupsStageRules;
  gameweeks: TournamentStageGameweek[];
  groups: {
    number: number;
    standings: TournamentStageStandings[];
  }[];
}

export type TournamentGroupsStagePreview = Pick<TournamentGroupsStage, 'id' | 'groups'>;

export interface TournamentPlayoffsStage extends BaseTournamentStage {
  type: TournamentStageType.PLAYOFFS;
  rules: PlayoffsStageRules;
  rounds: TournamentStageRound[];
}

export type TournamentStage = TournamentGroupsStage | TournamentPlayoffsStage;

export interface Tournament {
  id: string;
  name: string;
  type: TypeTournamentFormat;
  icon: number;
  startedAt: string | null;
  endedAt: string | null;
  createdAt: string;
  updatedAt: string;
  numberOfTeams: number;
  progress: number;
  stages: TournamentStage[];
}

// API types
export type ApiGetAllTournamentsResponse = {
  id: string;
  name: string;
  type: TypeTournamentFormat;
  icon: number;
  startedAt: string | null;
  createdAt: string;
  updatedAt: string;
  numberOfTeams: number;
  progress: number;
}[];

export interface ApiCreateAllPlayAllTournamentPayload {
  name: string;
  icon: number;
  numberOfTeams: number;
  hasTwoLegs: boolean;
}

export interface ApiCreatePlayoffsTournamentPayload {
  name: string;
  icon: number;
  numberOfTeams: number;
  isDoubleLegged: boolean;
  finalRoundIsDoubleLegged: boolean;
}
