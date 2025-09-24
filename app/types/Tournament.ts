export enum TournamentStageType {
  GROUPS,
  PLAYOFFS,
}

interface BaseTournamentStage {
  id: number;
  name: string | null;
  sequence: number;
  type: TournamentStageType;
}

export interface TournamentGroupsStage extends BaseTournamentStage {
  type: TournamentStageType.GROUPS;
}

export type TournamentStage = TournamentGroupsStage;

export interface Tournament {
  id: number;
  name: string;
  iconId: number;
  createdAt: string;
  updatedAt: string;
  stages: TournamentStage[];
}