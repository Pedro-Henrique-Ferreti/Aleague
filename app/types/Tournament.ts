export enum TournamentStageType {
  GROUPS,
  PLAYOFFS,
}

export enum TournamentGroupFormat {
  ROUND_ROBIN,
  OTHER_GROUPS_ROUND_ROBIN,
  ALL_PLAY_ALL,
}

export interface BaseTournamentStage {
  id: number;
  name: string | null;
  sequence: number;
  type: TournamentStageType;
}

export interface TournamentGroupsStage extends BaseTournamentStage {
  type: TournamentStageType.GROUPS;
  roundRobins: number;
  format: TournamentGroupFormat;
  groups: {
    order: number;
    standings: StandingsEntry[];
  }[];
  matchweeks: Matchweek[];
}

export interface TournamentPlayoffsStage extends BaseTournamentStage {
  type: TournamentStageType.PLAYOFFS;
  rounds: [];
}

export type TournamentStage = TournamentGroupsStage | TournamentPlayoffsStage;

export interface Tournament {
  id: number;
  name: string;
  iconId: number;
  createdAt: string;
  updatedAt: string;
  stages: TournamentStage[];
}