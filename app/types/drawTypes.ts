export enum DrawStep {
  POTS,
  PROCEDURE,
}

export enum DrawPotStatus {
  IDLE,
  ACTIVE,
  COMPLETED,
}

export type DrawParticipant = TeamDetails['id'];

export interface DrawPot {
  id: number;
  participants: DrawParticipant[];
}

export interface DrawProcedureForm {
  groups: Record<TeamSeedingGroup['order'], TeamSeedingGroup>;
}
