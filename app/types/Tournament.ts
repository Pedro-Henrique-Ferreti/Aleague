export enum StageType {
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
  name: string;
  sequence: number;
  type: StageType;
}

export interface TournamentGroupsStage extends BaseTournamentStage {
  type: StageType.GROUPS;
  roundRobins: number;
  groups: {
    order: number;
    standings: StandingsEntry[];
    qualifier: Qualifier[];
  }[];
  overallQualifier: Qualifier[];
  matchweeks: Matchweek[];
}

export interface TournamentPlayoffsStage extends BaseTournamentStage {
  type: StageType.PLAYOFFS;
  rounds: [PlayoffRound] | PlayoffRound[];
}

export type TournamentStage = TournamentGroupsStage | TournamentPlayoffsStage;

export type Tournament = Pick<TournamentFile, 'id' | 'createdAt'> & {
  collectionId: Collection['id'] | null;
  name: string;
  icon: string;
  updatedAt: string;
  stages: TournamentStage[];
  tags: string[];
  showCountry: boolean;
};
