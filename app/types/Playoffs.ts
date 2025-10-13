export interface PlayoffRoundSlot {
  id: string;
  order: number;
  legs: [Match] | [Match, Match];
}

export interface PlayoffRound {
  id: string;
  order: number;
  name: string;
  slots: PlayoffRoundSlot[];
}
