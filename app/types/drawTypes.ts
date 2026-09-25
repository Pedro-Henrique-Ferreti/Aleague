export type DrawParticipant = TeamDetails['id'];

export interface DrawPot {
  id: number;
  participants: DrawParticipant[];
}
