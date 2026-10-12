export type PlayoffRoundSlotWinner = Match['homeTeam']['id'] | null;

export interface PlayoffRoundSlot {
  id: UUID;
  order: number;
  legs: [Match] | [Match, Match];
}

export interface PlayoffRound {
  id: UUID;
  order: number;
  name: string;
  slots: PlayoffRoundSlot[];
}
