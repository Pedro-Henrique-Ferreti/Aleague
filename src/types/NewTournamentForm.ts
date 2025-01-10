import type { TournamentStageType, TypeStageConfrontation, TypeTournamentFormat } from './Tournament';

interface BaseFormStage {
  id?: number;
  name: string | null;
  sequence?: number;
  numberOfTeams: number;
  type: TournamentStageType;
}

interface FormGroupsStage extends BaseFormStage {
  type: TournamentStageType.GROUPS;
  confrontationType: TypeStageConfrontation;
  numberOfGroups: number;
  numberOfLegs: number;
} 

interface FormPlayoffsStage extends BaseFormStage {
  type: TournamentStageType.PLAYOFFS;
  numberOfRounds: number;
  isDoubleLegged: boolean;
  finalRoundIsDoubleLegged: boolean;
}

export type TournamentFormStage = FormGroupsStage | FormPlayoffsStage;

// Api types
export interface ApiCreateTournamentPayload {
  name: string;
  icon: number;
  type: TypeTournamentFormat;
  stages: TournamentFormStage[];
}
