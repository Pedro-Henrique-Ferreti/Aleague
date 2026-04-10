export enum StageType {
  GROUP,
  PLAYOFF,
}

export enum GroupStageFormat {
  SAME_GROUP_ROUND_ROBIN,
  OTHER_GROUPS_ROUND_ROBIN,
  ALL_PLAY_ALL,
}

export interface BaseStage {
  id: number;
  name: string;
  sequence: number;
  type: StageType;
}

export interface GroupStage extends BaseStage {
  type: StageType.GROUP;
  groups: {
    order: number;
    standings: StandingsEntry[];
    qualifier: Qualifier[];
  }[];
  overallQualifier: Qualifier[];
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
  updatedAt: string;
  stages: TournamentStage[];
  tags: string[];
  showCountry: boolean;
};
