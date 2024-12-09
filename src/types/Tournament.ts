import { TournamentFormat, TournamentStageConfrontation } from '@/constants/tournament';
import type { ValueOf } from './Auth';

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
  };
}

export interface PlayoffsStageRules {
  numberOfTeams: number;
}

interface BaseTournamentStage {
  id: string;
  name: string | null;
  sequence: number;
  type: TournamentStageType;
  rules: GroupsStageRules | PlayoffsStageRules;
  standings: TournamentStageStanding[];
  gameweeks: TournamentStageGameweek[];
}

export interface TournamentGroupsStage extends BaseTournamentStage {
  type: TournamentStageType.GROUPS;
  rules: GroupsStageRules;
}

export interface TournamentPlayoffsStage extends BaseTournamentStage {
  type: TournamentStageType.PLAYOFFS;
  rules: PlayoffsStageRules;
}

export type TournamentStage = TournamentGroupsStage | TournamentPlayoffsStage;

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
