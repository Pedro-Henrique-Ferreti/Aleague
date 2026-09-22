import type { Timestamp } from './fileTypes';

export enum StageType {
  GROUP,
  PLAYOFF,
}

export enum GroupStageFormat {
  SAME_GROUP_ROUND_ROBIN,
  OTHER_GROUPS_ROUND_ROBIN,
  ALL_PLAY_ALL,
}

export enum GroupStageNameFormat {
  NUMBER,
  LETTER,
}

export type TournamentWinner = TeamDetails | null;

export interface BaseStage {
  id: number;
  name: string;
  sequence: number;
  type: StageType;
}

export interface GroupStageGroup {
  order: number;
  standings: StandingsEntry[];
  legend: LegendColor[];
}

export interface GroupStage extends BaseStage {
  type: StageType.GROUP;
  nameFormat: GroupStageNameFormat;
  groups: GroupStageGroup[];
  overallLegend: LegendColor[];
  legendDescription: Record<Exclude<LegendColor, LegendColor.NONE>, string>;
  matchweeks: Matchweek[];
}

export interface PlayoffStage extends BaseStage {
  type: StageType.PLAYOFF;
  rounds: [PlayoffRound] | PlayoffRound[];
}

export type TournamentStage = GroupStage | PlayoffStage;

export type Tournament = Pick<TournamentFile, 'id' | 'createdAt'> & {
  collectionId: Collection['id'] | null;
  name: string;
  icon: string;
  updatedAt: Timestamp;
  stages: TournamentStage[];
  tags: string[];
  showCountry: boolean;
};
