import { TournamentFormat, TournamentStage, TournamentStageConfrontation } from '@/constants/tournament';
import type { ValueOf } from './Auth';

export type TypeTournamentFormat = ValueOf<typeof TournamentFormat>;
export type TypeTournamentStage = ValueOf<typeof TournamentStage>;
export type TypeTournamentStageConfrontation = ValueOf<typeof TournamentStageConfrontation>;

export interface TournamentStageRules {
  numberOfTeams: number;
  numberOfGroups: number;
  numberOfTeamsPerGroup: number;
  numberOfLegs: number;
  confrontationType: TypeTournamentStageConfrontation,
  qualification: {
    fromPreviousStages: {
      numberOfTeams: number;
    } | null;
    directlyInThisStage: {
      numberOfTeams: number;
      fixedTeams: string[];
    } | null;
  };
}

export interface TournamentStage {
  id: string;
  name: string | null;
  type: TypeTournamentStage;
  sequence: number;
  rules: TournamentStageRules;
  standings: TournamentStageStanding[];
  gameweeks: TournamentStageGameweek[];
}

export interface TournamentStageStanding {}

export interface TournamentStageGameweek {}

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
